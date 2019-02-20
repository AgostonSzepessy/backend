import { hasher } from '../utils/hasher';
import { logger } from '../utils/logger';
import { info } from 'winston';
import { MovnetError } from '../middleware/MovnetError';
import { User } from '../models/user';

export class UserService {
    /**
     * Registers a new user
     * @param username username for the user
     * @param fname First name of user
     * @param lname Last name of user
     * @param email Email of user
     * @param password Password of user (gets hashed when stored in db)
     */
    public static async register(username: string, fname: string, lname: string, email: string,
                                 password: string) {
        try {
            const hashedPassword = await hasher.hash(password);

            const user = await User.register(username, fname, lname, email, hashedPassword);
            return user.username;
        } catch(err) {
            throw new MovnetError(500, `Error registering ${username}`);
        }
    }

    /**
     * Finds a user by their username
     * @param username username for User to find
     */
    public static async findByUsername(username: string) {
        return User.findByUsername(username);
    }

    /**
     * Checks if the user submitted the right credentials
     * @param username username for User
     * @param password plaintext password for User
     */
    public static async authenticate(username: string, password: string) {
        try {
            const user = await User.findByUsername(username);

            if(!user) {
                throw new MovnetError(500, `${username} not found`);
            }

            return hasher.verify(user.password, password);
        } catch(err) {
            throw new MovnetError(500, 'Error with validation');
        }
    }
}
