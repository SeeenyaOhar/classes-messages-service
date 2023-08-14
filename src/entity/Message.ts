import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Class } from './Class';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @JoinColumn({ name: 'user' })
  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  user: User;

  @ManyToOne(() => Class, { eager: true })
  @JoinColumn({ name: 'class_' })
  class: Class;
}
