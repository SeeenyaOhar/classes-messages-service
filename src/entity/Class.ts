import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from './Teacher';
import { User } from './User';

@Entity()
export class Class{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column()
    description: string;

    @JoinColumn({name: 'teacher_id'})
    @ManyToOne(() => Teacher, {eager: true})
    teacher: Teacher;

    @ManyToMany(() => User, {eager: true})
    @JoinTable({ name: 'class_user', joinColumn: { name: 'class', referencedColumnName: 'id' }, inverseJoinColumn: { name: 'user', referencedColumnName: 'id' } })
    users: User[];
}