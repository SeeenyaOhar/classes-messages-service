import FrontMessage from './dtos/FrontMessage';

export enum MessageType {
  TEXT,
  IMAGE,
  VIDEO,
}

export interface ServerToClientEvents {
  message: (type: MessageType, data: FrontMessage) => void;
  deleteMessage: (message: FrontMessage) => void
}

export interface ClientToServerEvents {
  message: (type: MessageType, message: FrontMessage, callback) => void;
  deleteMessage: (message: FrontMessage, callback) => void
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
