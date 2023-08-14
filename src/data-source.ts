import "reflect-metadata"

import { DataSource } from 'typeorm';
import { Message } from './entity/Message';
import { User } from './entity/User';
import { Teacher } from './entity/Teacher';
import { Class } from './entity/Class';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "Online-Classes-Service",
    synchronize: false,
    logging: true,
    entities: [User, Message, Teacher, Class],
})