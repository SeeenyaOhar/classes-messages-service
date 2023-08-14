import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './Message';

enum Role{
    teacher, student
}

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({unique: true})
    phone: string;

    @Column({type: 'enum', enum: Role, default: Role.student})
    role: Role;

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[];
} 