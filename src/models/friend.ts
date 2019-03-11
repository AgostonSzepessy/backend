import { knex } from '../utils/knex';
import { logger } from '../utils/logger';
import { FriendList } from '../interfaces/friend';

export class Friend {

    /**
     * Returns the list of friends that a user has
     * @param username username of user
     */
    public static async getFriends(username: string) {
        // Selects all friends that are confirmed friends of the user
        // Need union because otherwise the user shows up in the friend list as well
        const confirmedFriends = await knex.raw(
                    `SELECT Friend.friend_id, User.username, User.fname, User.lname FROM User
                        INNER JOIN Friend ON Friend.u2_id = User.username
                        WHERE Friend.u1_id=? AND Friend.u2_confirmed=1
                    UNION
                    SELECT Friend.friend_id, User.username, User.fname, User.lname FROM User
                        INNER JOIN Friend on Friend.u1_id = User.username
                        WHERE Friend.u2_id=? AND Friend.u2_confirmed=1
                    ORDER BY lname, fname, username ASC`,
                [username, username]
        );

        // Selects all unconfirmed friends
        const unconfirmedFriends = await knex.raw(
                    `SELECT Friend.friend_id, User.username, User.fname, User.lname FROM User
                        INNER JOIN Friend ON Friend.u2_id = User.username
                        WHERE Friend.u1_id=? AND Friend.u2_confirmed=0
                    UNION
                    SELECT Friend.friend_id, User.username, User.fname, User.lname FROM User
                        INNER JOIN Friend on Friend.u1_id = User.username
                        WHERE Friend.u2_id=? AND Friend.u2_confirmed=0
                    ORDER BY lname, fname, username ASC`,
                    [username, username]
        );

        // knex returns additional data in the second element of the array
        // and we don't need to return that
        const friendData: FriendList = {
            confirmed: confirmedFriends[0],
            unconfirmed: unconfirmedFriends[0],
        };

        return friendData;
    }

    /**
     * Creates a friend request
     * @param u1Username username of person sending friend request
     * @param u2Username username of person receiving the friend request
     */
    public static async addFriend(u1Username: string, u2Username: string) {
        const insertData = {
            u1_id: u1Username,
            u2_id: u2Username,
        };

        const friend_id =
            (await knex('Friend').insert(insertData).returning('friend_id'))[0];

        return new Friend(friend_id, u1Username, u2Username, false);
    }

    /**
     * Confirms a friend
     * @param friend_id friend to confirm
     * @param username username of friend that needs to confirm
     */
    public static async confirmFriend(friend_id: number, username: string) {
        const conditions = {
            friend_id,
            u2_id: username,
        };

        const friendData =
            await knex('Friend').update('u2_confirmed', true).where(conditions).returning('*');

        return new Friend(friendData.friend_id, friendData.u1_id, friendData.u2_id, friendData.u2_confirmed);
    }

    /**
     * Deletes a friend
     * @param friend_id friend to delete
     * @param username username of one of the friends
     */
    public static async deleteFriend(friend_id: number, username: string) {
        await knex('Friend').del()
            .whereRaw('friend_id = ? AND (u1_id = ? OR u2_id = ?)', [friend_id, username, username]);
    }

    /**
     * Checks if 2 users are friends
     * @param u1Username user 1
     * @param u2Username user 2
     */
    public static async isFriend(u1Username: string, u2Username: string) {
        const conditions = {
            u1_id: u1Username,
            u2_id: u2Username,
        };

        const results = await knex('Friend').select('friend_id').where(conditions);

        if(results.length > 0) {
            return true;
        }

        return false;
    }

    public friend_id!: number;
    public u1_id: string;
    public u2_id: string;
    public u2_confirmed: boolean;

    constructor(friend_id: number, u1_id: string, u2_id: string, u2_confirmed: boolean) {
        this.friend_id = friend_id;
        this.u1_id = u1_id;
        this.u2_id = u2_id;
        this.u2_confirmed = u2_confirmed;
    }
}
