// This file is for all interface definitions that need to store extra data
// inside of Express Requests

import { Request } from 'express';
import { User } from '../models/user';

/**
 * Request that contains user data
 */
export interface RequestWithUser extends Request {
    user?: User;
}
