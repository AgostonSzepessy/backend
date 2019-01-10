import express, { Request } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import { userService } from '../services/user';
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

    jwt.verify(token, Jwt.SECRET, async (err, decoded: string | object | Jwt.Payload) => {
        if(err) {
            throw new MovnetError(401, 'Invalid token');
        } else {
            if(Jwt.isPayload(decoded) && decoded.username) {
                const user = await userService.findByUsername(decoded.username);

                if(!user) {
                    throw new MovnetError(401, 'Invalid token');
                }

                req.user = user;
                next();

            } else {
                throw new MovnetError(401, 'Invalid token');
            }
        }
    });
}));

// Setup all secured routes. In order for this to work, module.exports must be
// used instead of export default
fs.readdirSync(SECURED_ROUTES).forEach((file) => require(SECURED_ROUTES + file)(router));

export default router;
