import { Friend } from '../models/friend';
import { MovnetError } from '../middleware/MovnetError';
import { User } from '../models/user';

export class FriendService {
    /**
     * Retrieves a user's username
     * @param username username of user
     */
    public static async getFriends(username: string) {
        return Friend.getFriends(username);
    }

    /**
     * Creates a friendship between 2 users
     * @param u1Username username of user sending friend request
     * @param u2Username username of user receiving friend request
     */
    public static async addFriend(u1Username: string, u2Username: string) {
        // Make sure user exists
        if(!(await User.usernameTaken(u2Username))) {
            throw new MovnetError(404, 'User receiving friend request does not exist');
        }

        if(await Friend.isFriend(u1Username, u2Username)) {
            throw new MovnetError(400, 'Users are already friends');
        }

        return Friend.addFriend(u1Username, u2Username);
    }

    /**
     * Confirms a friend
     * @param friendId friendship to confirm
     * @param username username of user that needs to confirm friendship
     */
    public static async confirmFriend(friendId: number, username: string) {
        return Friend.confirmFriend(friendId, username);
    }

    /**
     * Deletes a friendship
     * @param friendId Friendship to delete
     * @param username username of a user who is a member of the friendship
     */
    public static async deleteFriend(friendId: number, username: string) {
        return Friend.deleteFriend(friendId, username);
    }
}
