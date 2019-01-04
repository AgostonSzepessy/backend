import express, { Response } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { RequestWithUser } from '../../interfaces/requests';

module.exports = (router: express.Router) => {
    /**
     * Returns everything about the user except the password
     */
    router.get('/user', (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            res.status(500).json(new ResponseValue(false, 'Error finding user data'));
            return;
        }

        const { password, ...user } = req.user;

        res.status(200).json(new ResponseValue(true, user));
    });
};
