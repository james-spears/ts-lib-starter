import { WebSocket, RawData } from 'ws';
import { addUtteranceToTranscript, getTranscript, json, promptLLM } from './utils';
import { Message, MessageType, Participant } from './models';
import { randomUUID } from 'node:crypto';

export const handleConnection = (ws: WebSocket) => {
  return () => {
    ws.send(
      json({
        type: MessageType.CONNECT,
        content: {
          message: 'connected successfully',
        },
        sessionId: '',
      })
    );
  };
};

export const handleClose = (code: number, reason: Buffer) => {
  console.log(`client closed connection: code ${code}: reason ${reason.toString()}`);
};

export const handleEcho = (ws: WebSocket) => {
  return (message: Message) => {
    ws.send(
      json({
        ...message,
        type: MessageType.ECHO,
        content: `received: ${message.content}`,
      })
    );
  };
};

export const handleUnexpectedMessageType = (ws: WebSocket) => {
  return (message: Message) => {
    ws.send(
      json({
        ...message,
        type: MessageType.UNEXPECTED_MESSAGE_TYPE,
        content: `received unexpected message type: ${message.type}`,
      })
    );
  };
};

export const handleSession = (ws: WebSocket) => {
  return async (message: Message) => {
    const sessionId = message.sessionId ?? randomUUID();
    ws.send(
      json({
        type: MessageType.SESSION,
        content: null,
        sessionId,
      })
    );
  };
};

export const handleTranscript = (ws: WebSocket) => {
  return async (message: Message) => {
    const sessionId = message.sessionId;
    if (sessionId) {
      ws.send(
        json({
          type: MessageType.TRANSCRIPT,
          content: await getTranscript(sessionId),
          sessionId,
        })
      );
    }
  };
};

export const handleHeartbeat = (ws: WebSocket) => {
  return async (message: Message) => {
    if (!message.sessionId) {
      return;
    }
    const heartbeat = () => {
      ws.send(
        json({
          ...message,
          type: MessageType.HEARTBEAT,
          content: null,
        })
      );
    };
    heartbeat();
    setInterval(heartbeat, 6000);
  };
};

export const handleChat = (ws: WebSocket) => {
  return async (message: Message) => {
    console.log('sessionId: ', message.sessionId);
    const userUtterance = {
      text: (message.content as { text: string }).text,
      participant: Participant.USER,
      timestamp: Date.now(),
      uuid: randomUUID(),
    };
    await addUtteranceToTranscript(message.sessionId, userUtterance);
    ws.send(
      json({
        ...message,
        type: MessageType.BOT_THINKING,
        content: `bot_thinking`,
      })
    );
    const botUtterance = {
      text: await promptLLM((message.content as { text: string }).text),
      participant: Participant.BOT,
      timestamp: Date.now(),
      uuid: randomUUID(),
    };
    ws.send(
      json({
        ...message,
        type: MessageType.CHAT,
        content: botUtterance,
      })
    );
    await addUtteranceToTranscript(message.sessionId, botUtterance);
  };
};

export const handleError = (ws: WebSocket) => {
  return (data: RawData) => {
    ws.send(
      json({
        sessionId: '',
        type: MessageType.ERROR,
        content: `unexpected error: ${data}`,
      })
    );
  };
};
