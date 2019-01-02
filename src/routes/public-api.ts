import * as express from 'express';
import { logger } from '../config/logger';
import { userService } from '../services/user';

export default (router: express.Router) => {
    router.post('/register', async (req, res) => {
        const username = req.body.username;
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;
        const password = req.body.password;

        if(!username || !fname || !lname || !email || !password) {
            res.status(422).json({
                success: false,
                message: 'username, fname, lname, email, and password must have values'
            });
        } else {
            try {
                logger.debug(`password is ${password}`);
                await userService.register(username, fname, lname, email, password);
                res.status(200).json({
                    success: true,
                    message: `${username} added`
                });
            } catch(err) {
                res.status(500).json({
                    success: false,
                    message: err
                });
            }
        }
    });
};
