import { knex } from '../utils/knex';

/**
 * Models the Friend Schema
 */
export class Friend {

    /**
     * Adds a new theater to the database
     * @param u1_id id of user 1 in friendship
     * @param u2_id id of user 2 in friendship
     */
    public static async add(u1_id: string, u2_id: string) {
        const data = {
          u1_id,
          u2_id,
        };

        const friend_id = (await knex('Friend').insert(data).returning('friend_id'))[0];

        return new Friend(friend_id, u1_id, u2_id);
    }

    // Variable names should match up with database column
    // names so this rule needs disabled
    /* tslint:disable:variable-name */
    public friend_id!: number;
    public u1_id: string;
    public u2_id: string;
    /* tslint:enable:variable-name */

    constructor(friend_id: number, u1_id: string, u2_id: string) {
      this.participation_id = participation_id;
      this.u1_id = u1_id;
      this.u2_id = u2_id;
    }
}
