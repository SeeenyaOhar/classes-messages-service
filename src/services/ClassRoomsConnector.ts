import { Socket } from 'socket.io';
import { Class } from '../entity/Class';
import { AppDataSource } from '../data-source';

export async function joinClassRooms(socket: Socket, userId: number) {
  const classRepository = AppDataSource.getRepository(Class);
  const classes = await classRepository
    .createQueryBuilder('class')
    .leftJoin('class.users', 'user')
    .where('user.id = :userId', { userId })
    .getMany();
  const teacherClasses = await classRepository
    .createQueryBuilder('class')
    .leftJoin('class.teacher', 'teacher')
    .leftJoinAndSelect('class.teacher', 'teacherEntity')
    .where('teacherEntity.user_id = :userId', { userId })
    .getMany();

  const allClasses = classes.concat(teacherClasses);
  for (const cls of allClasses) {
    socket.join(`class:${cls.id}`);
  }
}
