import { knex } from '../utils/knex';
import { logger } from '../utils/logger';

export class Friend {

    /**
     * Returns the list of friends that a user has
     * @param username username of user
     */
    public static async getFriends(username: string) {
        const friends = [];

        const results = await knex('Friend').select('*').where('u1_id', '=', username);

        for(const r of results) {
            // for some reason MySQL returns a numeric value for true or false so we
            // need to convert it to a boolean
            const friend = new Friend(r.friend_id, r.u1_id, r.u2_id, r.u2_confirmed > 0);
            friends.push(friend);
        }

        return friends;
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
