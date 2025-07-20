import { UUID } from 'node:crypto';

export enum MessageType {
  CONNECT = 'connect',
  HEARTBEAT = 'heartbeat',
  DISCONNECT = 'disconnect',
  ECHO = 'echo',
  CHAT = 'chat',
  ERROR = 'error',
  AGENT_TYPING = 'agent_typing',
  SESSION = 'session',
  BOT_THINKING = 'bot_thinking',
  TRANSCRIPT = 'transcript',
  UNEXPECTED_MESSAGE_TYPE = 'unexpected_message_type',
}

export interface Message {
  type: MessageType;
  content: unknown;
  sessionId: string;
}

export enum Participant {
  BOT = 'bot',
  AGENT = 'agent',
  USER = 'user',
}

export interface Utterance {
  text: string;
  participant: Participant;
  timestamp: number;
  uuid?: UUID;
}

export type Transcript = Utterance[];
