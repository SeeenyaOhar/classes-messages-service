import { Server } from 'socket.io';
import { AppDataSource } from '../data-source';
import FrontMessage from '../dtos/FrontMessage';
import { Message } from '../entity/Message';
import { MessageType } from '../sockets';
import { adaptToFront, adaptToServer } from './FrontMessageDTOAdapter';

enum MessageReceivedStatus {
  OK,
  FAILED,
}

export async function onSentMessage(
  context: {
    type: MessageType;
    message: FrontMessage;
    userId: number;
  },
  io: Server,
  callback
) {
  const { type, message, userId } = context;
  let serverMessage = await adaptToServer(message);
  if (!validateMessage(serverMessage, userId)) {
    // throw up some error
    return;
  }

  serverMessage = await saveMessage(serverMessage);
  const fullFrontMessage = await adaptToFront(serverMessage);
  // we need to update id somehow because this is going to affect the keys on the front
  io.in(`class:${serverMessage.class.id}`).emit(
    `message`,
    type,
    fullFrontMessage
  );

  callback({
    status: MessageReceivedStatus.OK,
    id: fullFrontMessage.id,
  });
}

const saveMessage = async (message: Message) => {
  const messageRepository = AppDataSource.getRepository(Message);
  return await messageRepository.save(message);
};

const validateMessage = (message: Message, userId: number) => {
  return (
    message.class.users.some((user) => user.id == userId) ||
                                                      message.class.teacher.user.id === userId
  );
};
