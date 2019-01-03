import express, { Response } from 'express';

import ResponseValue from '../../utils/ResponseValue';

module.exports = (router: express.Router) => {
    /**
     * Returns everything about the user except the password
     */
    router.get('/user', (req, res: Response) => {
        const { password, ...user } = req.user;

        res.status(200).json(new ResponseValue(true, user));
    });
};
