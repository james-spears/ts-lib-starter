import { WebSocket } from 'ws';
import {
  handleChat,
  handleError,
  handleHeartbeat,
  handleSession,
  handleTranscript,
  handleUnexpectedMessageType,
} from './handlers';
import { RawData } from 'ws';
import { Message, MessageType } from './models';
// test
export default (ws: WebSocket) => {
  return async (data: RawData): Promise<void> => {
    try {
      const message: Message = JSON.parse(data.toString());
      switch (message.type) {
        case MessageType.CHAT:
          return handleChat(ws)(message);
        case MessageType.SESSION:
          return handleSession(ws)(message);
        case MessageType.TRANSCRIPT:
          return handleTranscript(ws)(message);
        case MessageType.HEARTBEAT:
          return handleHeartbeat(ws)(message);
        case MessageType.ECHO:
        default:
          return handleUnexpectedMessageType(ws)(message);
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        // handle error
        return handleError(ws)(data);
      }
    }
  };
};
