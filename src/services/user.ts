import { userRepository } from '../repositories/user';
import { hasher } from '../utils/hasher';
import { logger } from '../utils/logger';
import { info } from 'winston';

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
            const hashedPassword = await hasher.hash(password);

            const user = await userRepository.register(username, fname, lname, email, hashedPassword);
            return user.username;
        } catch(err) {
            logger.error('Error registering user: ', err);
            throw new Error(`Error registering ${username}`);
        }
    }

    public async findByUsername(username: string) {
        return userRepository.findByUsername(username);
    }

    public async authenticate(username: string, password: string) {
        try {
            const user = await this.findByUsername(username);

            if(!user) {
                throw new Error(`${username} not found`);
            }

            return hasher.verify(user.password, password);
        } catch(err) {
            logger.error('Error during authentication ', err);
            throw new Error(err);
        }
    }
}

export const userService = new UserService();
