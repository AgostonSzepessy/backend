import * as argon2 from 'argon2';

import { logger } from '../config/logger';
import { userRepository } from '../repositories/user';

class UserService {
    /**
     * Registers a new user
     * @param username username for the user
     * @param fname First name of user
     * @param lname Last name of user
     * @param email Email of user
     * @param password Password of user (gets hashed when stored in db)
     */
    public async register(username: string, fname: string, lname: string, email: string,
                          password: string) {
        try {
            const hashedPassword = await argon2.hash(password, {
                type: argon2.argon2id
            });

            const user = await userRepository.register(username, fname, lname, email, hashedPassword);
            return user.username;
        } catch(err) {
            logger.error('Error registering user: ', err);
            throw new Error(`Error registering ${username}`);
        }
    }
}

export const userService = new UserService();
