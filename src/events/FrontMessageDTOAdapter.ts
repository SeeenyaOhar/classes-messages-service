import { AppDataSource } from '../data-source';
import FrontMessage from '../dtos/FrontMessage';
import { Class } from '../entity/Class';
import { Message } from '../entity/Message';
import { User } from '../entity/User';

export async function adaptToFront(serverMessage: Message): Promise<FrontMessage> {
    const {
      id,
      content,
      user: { id: user },
      class: { id: cls },
      date,
    } = serverMessage;
    const { username, fullname } = await getUserInfo(user);
    return {
      id,
      content,
      username,
      fullname,
      user,
      cls,
      date: date.toString(),
    };
  };

export async function adaptToServer (frontMessage: FrontMessage): Promise<Message> {
    const { content, user, cls } = frontMessage;
    const serverMessage = new Message();
    serverMessage.content = content;
    serverMessage.user = await AppDataSource.getRepository(User).findOne({
      where: { id: user },
      
    });
    serverMessage.class = await AppDataSource.getRepository(Class).findOne({
      where: { id: cls },
    });
    serverMessage.date = new Date(Date.now());
  
    return serverMessage;
  };

  
const getUserInfo = async (userId: number) => {
    const { firstName, lastName, username } = await AppDataSource.getRepository(
      User
    ).findOne({ where: { id: userId } });
  
    return { fullname: `${firstName} ${lastName}`, username };
  };