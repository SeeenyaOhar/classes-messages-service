import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import { User } from './User';

@Entity()
export class Teacher {
  @PrimaryColumn({name: 'user_id'})
  id: number;

  @OneToOne(() => User, {eager: true})
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column('character varying', { array: true })
  diplomas: string[];

  @Column('character varying', { array: true })
  employment: string[];
}
