import 'reflect-metadata';
import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, MessageType } from './sockets';
import { ServerToClientEvents } from './sockets';
import { InterServerEvents } from './sockets';
import { SocketData } from './sockets';
import { AppDataSource } from './data-source';
import { connectAuthMiddleware } from './auth';
import FrontMessage from './dtos/FrontMessage';
import { onSentMessage } from './events/SentMessageEvent';
import { onDeleteMessage } from './events/DeleteMessageEvent';
import { joinClassRooms } from './services/ClassRoomsConnector';
import * as dotenv from 'dotenv';

dotenv.config()

const port = 3003;
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(port, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
AppDataSource.initialize().then(() => {
  console.log('Successfully initialized data source.');
  console.log(`Server is running on port ${port}`);
});
io.use(connectAuthMiddleware);

io.on('connection', (socket: Socket) => {
  const userId = socket.handshake.auth['id'];
  console.log(`s-${socket.id}-${userId} connected`);
  joinClassRooms(socket, userId);

  socket.on('message', (type: MessageType, message: FrontMessage, callback) =>
    onSentMessage({ type, message, userId }, io, callback)
  );

  socket.on('deleteMessage', (id: number, callback) =>
    onDeleteMessage(id, io, callback)
  );
});


