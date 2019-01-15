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
