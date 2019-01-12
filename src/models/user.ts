import { knex } from '../utils/knex';
import { logger } from '../utils/logger';

/**
 * Object to represent the User schema
 */
export class User {
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

    public static async findByUsername(username: string) {
        const data = {
            username,
        };

        const userData = (await knex('User').select('*').where('username', username))[0];

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
