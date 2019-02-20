import express, { Response } from 'express';
import { asyncHandler } from '../../middleware/async-handler';
import { RequestWithUser } from '../../interfaces/requests';
import { MovnetError } from '../../middleware/MovnetError';
import { Jwt } from '../../utils/Jwt';
import jwt from 'jsonwebtoken';
import ResponseValue from '../../utils/ResponseValue';


module.exports = (router: express.Router) => {
    /**
     * Refreshes the token
     */
    router.get('/token', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Could not find user data');
        }

        const payload: Jwt.Payload = {
            username: req.user.username,
        };

        const token = jwt.sign(payload, Jwt.SECRET, {
            expiresIn: Jwt.DURATION,
        });

        const { password, ...user } = req.user;

        res.status(200).json(new ResponseValue(true, {
            token,
            user,
        }));
    }));
};