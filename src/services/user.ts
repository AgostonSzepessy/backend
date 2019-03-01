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
            if(await User.usernameTaken(username)) {
                throw new MovnetError(422, `${username} is already taken`);
            }

            if(await User.emailTaken(email)) {
                throw new MovnetError(422, `${email} is already being used`);
            }

            const hashedPassword = await hasher.hash(password);

            const user = await User.register(username, fname, lname, email, hashedPassword);
            return user.username;
        } catch(err) {
            logger.info(err);

            if(err instanceof MovnetError) {
                throw new MovnetError(422, err.getMessage());
            }

            throw new MovnetError(500, `Error registering ${username}`);
        }
    }

    /**
     * Updates user's data
     * @param username username of user
     * @param email new email of user
     * @param fname new first name of user
     * @param lname new last name of user
     */
    public static async updateData(username: string, email: string, fname: string, lname: string) {
        try {
            const user = await User.updateUser(username, email, fname, lname);
            return user;
        } catch(err) {
            throw new MovnetError(500, `Error updating ${username}`);
        }
    }

    /**
     * Updates the password of a user
     * @param username username of user
     * @param password current password of user
     * @param newPassword new password for user
     */
    public static async updatePassword(username: string, password: string, newPassword: string) {
        if(!await this.authenticate(username, password)) {
            throw new MovnetError(401, 'Wrong password');
        }

        try {
            const hashedPassword = await hasher.hash(newPassword);
            return await User.updatePassword(username, hashedPassword);
        } catch(err) {
            logger.error(err);
            throw new MovnetError(500, 'Error updating password');
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

    /**
     * Deletes a user
     * @param username username of user to delete
     */
    public static async delete(username: string) {
        try {
            await User.delete(username);
        } catch(err) {
            logger.error(err);
            throw new MovnetError(500, 'Error during deletion');
        }
    }
}
