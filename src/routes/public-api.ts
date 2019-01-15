import express from 'express';
import extend from 'extend';
import jwt from 'jsonwebtoken';

import { Jwt } from '../utils/Jwt';
import ResponseValue from '../utils/ResponseValue';
import { logger } from '../utils/logger';
import { UserService } from '../services/user';
import { asyncHandler } from '../middleware/async-handler';
import { MovnetError } from '../middleware/MovnetError';

const router = express.Router();

/**
 * Registers a user
 * @param username username for user
 * @param fname first name for user
 * @param lname last name for user
 * @param email last name for user
 * @param password password for user
 */
router.post('/register', asyncHandler(async (req, res) => {
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    if(!username || !fname || !lname || !email || !password) {
        throw new MovnetError(422, 'All fields must be filled');
    } else {
        await UserService.register(username, fname, lname, email, password);
        res.status(200).json({
            success: true,
            message: `${username} added`
        });
    }
}));

/**
 * Logs the user in and returns a JWT
 * @param username username for user
 * @param password password for user
 */
router.post('/login', asyncHandler(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        throw new MovnetError(422, 'Username and password must have values');
    } else {
        const authenticated = await UserService.authenticate(username, password);

        if(!authenticated) {
            throw new MovnetError(401, 'Invalid username or password');
        } else {
            const payload: Jwt.Payload = {
                username,
            };
            const token = jwt.sign(payload, Jwt.SECRET, {
                expiresIn: '7d'
            });

            const usr = await UserService.findByUsername(username);
            const userData = extend(true, usr, {});

            // Don't send password back
            delete userData.password;

            res.status(200).json(new ResponseValue(true, {
                message: 'Authenticated',
                token,
                user: userData,
            }));
        }
    }
}));

export default router;
