import { Socket } from 'socket.io';
import { JWT_SECRET } from './secret';
import * as jose from 'jose';

export const connectAuthMiddleware = async (socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const { payload } = await jose.jwtVerify(token, JWT_SECRET);
      socket.handshake.auth['id'] = payload['id'];
    } catch (error) {
        console.log(error)
      next(new Error('User credentials have failed the verification process.'));
    }
    next();
};