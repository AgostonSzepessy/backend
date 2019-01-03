import express from 'express';
import extend from 'extend';
import jwt from 'jsonwebtoken';

import JwtPayload from '../utils/JwtPayload';
import ResponseValue from '../utils/ResponseValue';
import { logger } from '../utils/logger';
import { userService } from '../services/user';
import { UserAuthRequest } from '../utils/requests';

const router = express.Router();

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
            await userService.register(username, fname, lname, email, password);
            res.status(200).json({
                success: true,
                message: `${username} added`
            });
        } catch(err) {
            res.status(500).json(new ResponseValue(false, err));
        }
    }
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        res.status(422).json(new ResponseValue(false, 'username and password must have values'));
    } else {
        try {
            const authenticated = await userService.authenticate(username, password);

            if(!authenticated) {
                res.status(401).json(new ResponseValue(false, 'Invalid username or password'));
            } else {
                const payload = new JwtPayload(username);
                const token = jwt.sign(payload, JwtPayload.TOKEN_SECRET, {
                    expiresIn: '7d'
                });

                const usr = await userService.findByUsername(username);
                const userData = extend(true, usr, {});

                // Don't send password back
                delete userData.password;

                res.status(200).json({
                    success: true,
                    message: 'Authenticcated',
                    token,
                    user: userData
                });
            }
        } catch(err) {
            res.status(500).json(new ResponseValue(false, err));
        }
    }
});

export default router;
