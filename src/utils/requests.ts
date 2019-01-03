import { Express } from 'express';
import { User } from '../models/user';

/**
 * Request that contains user data
 */
export interface UserAuthRequest extends Express.Request {
    user: User;
}
