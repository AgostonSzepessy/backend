import { knex } from '../utils/knex';
import { logger } from '../utils/logger';
import { MovnetError } from '../middleware/MovnetError';

/**
 * Object to represent the User schema
 */
export class User {
    /**
     * Adds a new user to the database
     * @param username username of user
     * @param fname first name of user
     * @param lname last name of user
     * @param email email of user
     * @param password password of user
     */
    public static async register(username: string, fname: string, lname: string, email: string,
                                 password: string) {
        const data = {
            username,
            fname,
            lname,
            email,
            password,
        };

        await knex('User').insert(data);

        return new User(username, fname, lname, email, password);
    }

    /**
     * Finds a user by their username
     * @param username username of user
     */
    public static async findByUsername(username: string) {
        const data = {
            username,
        };

        const result = await knex('User').select('*').where('username', username);

        if(result.length <= 0) {
            throw new MovnetError(401, 'User not found');
        }

        const userData = result[0];

        return new User(userData.username, userData.password, userData.email, userData.fname, userData.lname);
    }

    /**
     * Updates users' data, except for the password
     * @param username username of user
     * @param email email of user
     * @param fname first name of user
     * @param lname last name of user
     */
    public static async updateUser(username: string, email: string, fname: string, lname: string) {
        const data = {
            username,
            fname,
            email,
            lname,
        };

        const password = await knex('User').update(data).where('User.username', '=', username).returning('password');

        return new User(username, password, email, fname, lname);
    }

    /**
     * Updates the password of a user
     * @param username username of user
     * @param newPassword new password for user
     */
    public static async updatePassword(username: string, newPassword: string) {
        const data = {
            password: newPassword,
        };

        const userData = await knex('User').update(data).where('User.username', '=', username).returning('*');

        return new User(userData.username, userData.password, userData.email, userData.fname, userData.lname);
    }

    /**
     * Checks if a username is taken
     * @param username username of user
     */
    public static async usernameTaken(username: string) {
        const result = await knex('User').select('username').where('username', username);

        if(result.length <= 0) {
            return false;
        }

        return true;
    }

    public static async emailTaken(email: string) {
        const result = await knex('User').select('email').where('email', email);

        if(result.length <= 0) {
            return false;
        }

        return true;
    }

    /**
     * Deletes a user from the database
     * @param username username of user to delete
     */
    public static async delete(username: string) {
        await knex('User').where('username', '=', username).del();
    }

    public password: string;
    public username: string;
    public email: string;
    public fname: string;
    public lname: string;

    constructor(username: string, password: string, email: string, fname: string, lname: string) {
        this.password = password;
        this.username = username;
        this.email = email;
        this.fname = fname;
        this.lname = lname;
    }
}
