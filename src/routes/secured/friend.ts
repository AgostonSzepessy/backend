import express, { Response, Request } from 'express';
import { asyncHandler } from '../../middleware/async-handler';
import { RequestWithUser } from '../../interfaces/requests';
import { MovnetError } from '../../middleware/MovnetError';
import { FriendService } from '../../services/friend';
import ResponseValue from '../../utils/ResponseValue';

module.exports = (router: express.Router) => {
    /**
     * Retrieves all the friends a user has
     */
    router.get('/friend', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Unable to find user data');
        }

        const friends = await FriendService.getFriends(req.user.username);

        res.status(200).json(new ResponseValue(true, friends));
    }));

    /**
     * Creates a new friend request
     */
    router.post('/friend', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Unable to find user data');
        }

        const u1Username = req.user.username;
        const u2Username = req.body.username;

        if(!u2Username) {
            throw new MovnetError(422, 'username for friend must be specified');
        }

        const friend = await FriendService.addFriend(u1Username, u2Username);

        res.status(200).json(new ResponseValue(true, friend));
    }));

    /**
     * Confirms a friendship
     */
    router.post('/friend/confirm', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Unable to find user data');
        }

        const friendId = req.body.friendId;

        if(!friendId) {
            throw new MovnetError(422, 'friendId must be specified');
        }

        const friend = await FriendService.confirmFriend(friendId, req.user.username);

        res.status(200).json(new ResponseValue(true, friend));
    }));

    /**
     * Deletes a friendship
     */
    router.delete('/friend', asyncHandler(async (req: RequestWithUser, res: Response) => {
        if(req.user === undefined) {
            throw new MovnetError(500, 'Unable to find user data');
        }

        const friendId = req.body.friendId;

        if(!friendId) {
            throw new MovnetError(422, 'friendId must be specified');
        }

        await FriendService.deleteFriend(friendId, req.user.username);

        res.status(200).json(new ResponseValue(true, 'Friend deleted'));
    }));
};
