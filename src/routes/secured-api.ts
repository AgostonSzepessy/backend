import express, { Request } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import { UserService } from '../services/user';
import { Jwt } from '../utils/Jwt';
import { logger } from '../utils/logger';
import ResponseValue from '../utils/ResponseValue';
import { RequestWithUser } from '../interfaces/requests';
import { asyncHandler } from '../middleware/async-handler';
import { MovnetError } from '../middleware/MovnetError';

// All protected routes are in the secured directory
const SECURED_ROUTES = __dirname + '/secured/';

const router = express.Router();

// Checks if there's a JWT in the request, attempts to decode it and
// either authorizes the request to continue, or sends an error
router.use(asyncHandler(async (req: RequestWithUser, res, next) => {
    const token: string = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) {
        throw new MovnetError(422, 'No token provided');
    }

    // Can't throw MovnetError here because jwt.verify() won't be able to
    // handle it and it'll crash
    jwt.verify(token, Jwt.SECRET, async (err, decoded: string | object | Jwt.Payload) => {
        if(err) {
            res.status(401).json(new ResponseValue(false, 'Invalid token'));
        } else {
            if(Jwt.isPayload(decoded) && decoded.username) {
                const user = await UserService.findByUsername(decoded.username);

                if(!user) {
                    res.status(401).json(new ResponseValue(false, 'Invalid token'));
                    return;
                }

                req.user = user;
                next();

            } else {
                res.status(401).json(new ResponseValue(false, 'Invalid token'));
            }
        }
    });
}));

// Setup all secured routes. In order for this to work, module.exports must be
// used instead of export default
fs.readdirSync(SECURED_ROUTES).forEach((file) => require(SECURED_ROUTES + file)(router));

export default router;
