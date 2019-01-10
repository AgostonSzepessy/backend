import { User } from '../models/user';
import { logger } from '../utils/logger';
import { MovnetError } from '../middleware/MovnetError';

/**
 * Handles interactions with the database for User
 */
class UserRepository {
    /**
     * Inserts a new User into the database
     * @param username username of user
     * @param fname first name of user
     * @param lname last name of user
     * @param email email address of user
     * @param password hashed password of user
     */
    public async register(username: string, fname: string, lname: string, email: string,
                          password: string){
        try {
            return await User.query().insert({
                username, fname, lname, email, password
            });
        } catch(err) {
            throw new MovnetError(500, `Error saving ${username} to database`);
        }
    }

    public async findByUsername(username: string) {
        return User.query().findById(username);
    }
}

export const userRepository = new UserRepository();
