import express, { Request, Response } from 'express';
import EmailValidator from 'email-validator';

import ResponseValue from '../../utils/ResponseValue';
import { RequestWithUser } from '../../interfaces/requests';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';
import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { logger } from '../../utils/logger';

/**
 * Returns the user's data with the password removed
 * @param user user to get data from
 */
function userData(user: User) {
    const { password, ... usr } = user;

    return usr;
}

module.exports = (router: express.Router) => {
    /**
     * Returns everything about the user except the password
     */
    router.get('/user', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Could not find user data');
        }

        res.status(200).json(new ResponseValue(true, userData(req.user)));
    }));

    /**
    * Searches for user
    */
    router.get('/user/search', asyncHandler(async (req: Request, res: Response) => {
      let query = req.query.query;

      if(!query){
        throw new MovnetError(400, 'query required');
      }

      let users = await UserService.search(query);

      res.json(new ResponseValue(true, users));
    }));

    /**
     * Updates user data
     * @param fname first name of user
     * @param lname last name of user
     * @param email email of user
     */
    router.post('/user', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Could not find user data');
        }

        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;

        if(!fname || !lname || !email) {
            throw new MovnetError(400, 'First name, last name and email must be filled out');
        }

        if(!EmailValidator.validate(email)) {
            throw new MovnetError(422, 'Invalid email');
        }

        req.user = await UserService.updateData(req.user.username, email, fname, lname);

        res.status(200).json(new ResponseValue(true, userData(req.user)));
    }));

    /**
     * Updates a user's password
     * @param password current user password
     * @param newPassword new password for user
     */
    router.post('/user/password', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Could not find user data');
        }

        const password = req.body.password;
        const newPassword = req.body.newPassword;

        if(!password || !newPassword) {
            throw new MovnetError(400, 'Current password and new password must be given');
        }

        await UserService.updatePassword(req.user.username, password, newPassword);

        res.status(200).json(new ResponseValue(true, 'Password updated'));
    }));

    /**
     * Deletes a user based on their JWT.
     */
    router.delete('/user', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Could not find user data');
        }

        await UserService.delete(req.user.username);
        delete req.user;

        res.status(200).json(new ResponseValue(true, 'User deleted'));
    }));
};
