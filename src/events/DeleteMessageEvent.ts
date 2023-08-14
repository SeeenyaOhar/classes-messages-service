import { AppDataSource } from '../data-source';
import { Message } from '../entity/Message';
import { adaptToFront } from './FrontMessageDTOAdapter';

export async function onDeleteMessage(id: number, io, callback) {
  try {
    const message = await deleteMessage(id);
    console.log(`Deleting: ${JSON.stringify(message)}`);
    const frontMessage = await adaptToFront(message);
    io.in(`class:${message.class.id}`).emit(`deleteMessage`, frontMessage);
    callback({ status: DeleteMessageStatus.OK });
  } catch (error) {
    console.log(error);
    callback({ status: DeleteMessageStatus.FAILED });
  }
}

enum DeleteMessageStatus {
  OK,
  FAILED,
}

const deleteMessage = async (id: number) => {
  const messageRepository = AppDataSource.getRepository(Message);
  const targetMessage = await messageRepository.findOneBy({ id: id });
  const messageCopy = { ...targetMessage };
  await messageRepository.remove(targetMessage);

  return messageCopy;
};
