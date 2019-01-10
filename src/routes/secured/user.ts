import express, { Response } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { RequestWithUser } from '../../interfaces/requests';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';

module.exports = (router: express.Router) => {
    /**
     * Returns everything about the user except the password
     */
    router.get('/user', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Could not find user data');
        }

        const { password, ...user } = req.user;

        res.status(200).json(new ResponseValue(true, user));
    }));
};
