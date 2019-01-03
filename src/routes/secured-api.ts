import express, { Request } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import { userService } from '../services/user';
import JwtPayload from '../utils/JwtPayload';
import { logger } from '../utils/logger';
import ResponseValue from '../utils/ResponseValue';

// All protected routes are in the secured directory
const SECURED_ROUTES = __dirname + '/secured/';

const router = express.Router();

import { User } from "../models/user";

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}

interface RequestWithUser extends Request {
    user: User;
}

// Checks if there's a JWT in the request, attempts to decode it and
// either authorizes the request to continue, or sends an error
router.use(async (req, res, next) => {
    const token: string = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) {
        res.status(422).json(new ResponseValue(false, 'No token provided'));
        return;
    }

    jwt.verify(token, JwtPayload.TOKEN_SECRET, async (err, decoded) => {
        if(err) {
            res.status(401).json(new ResponseValue(false, 'Invalid token'));
        } else {
            try {
                const payload = decoded as JwtPayload;
                const user = await userService.findByUsername(payload.username);

                if(!user) {
                    res.status(401).json(new ResponseValue(false, 'User does not exist'));
                    return;
                }

                req.user = user;
                next();
            } catch(err) {
                logger.error('Could not find user', err);
                res.status(500).json(new ResponseValue(false, 'Could not find user'));
            }
        }
    });
});

// Setup all secured routes
fs.readdirSync(SECURED_ROUTES).forEach((file) => require(SECURED_ROUTES + file)(router));

export default router;
