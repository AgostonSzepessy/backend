import { knex } from '../utils/knex';
import { User } from '../models/user';

/**
 * Models the Participation Schema
 */
export class Participation {

    /**
     * Adds a new theater to the database
     * @param event_id id of event to participate of theater
     * @param username username of participant
     */
    public static async add(event_id: number, username: string) {
        const data = {
          event_id,
          username,
        };

        const participation_id = (await knex('Participation').insert(data).returning('participation_id'))[0];

        return new Participation(participation_id, event_id, username);
    }

    /**
     * Gets the events for a user
     * @param username
     */
    public static async getEventsForUser(username: string) {
      return knex('Participation')
        .select('*')
        .where('username', username)
        .innerJoin('Event', 'Participation.event_id', '=', 'Event.event_id');
    }

    /**
     * Gets the users in an event
     */
    public static async getUsersForEvent(event_id: number) {
      return knex('Participation')
        .select('User.username', 'fname', 'lname', 'participation_id')
        .where('event_id', event_id)
        .innerJoin('User', 'Participation.username', '=', 'User.username');
    }

    public static async addUserstoEvent(event_id: number, usernames: string[]) {
      const result = [];
      for(const username of usernames) {
        const data = await Participation.add(event_id, username);
        const userData = await User.findByUsername(username);

        result.push({
          ...data,
          fname: userData.fname,
          lname: userData.lname,
        });
      }

      return result;
    }

    // Variable names should match up with database column
    // names so this rule needs disabled
    /* tslint:disable:variable-name */
    public participation_id!: number;
    public event_id: number;
    public username: string;
    /* tslint:enable:variable-name */

    constructor(participation_id: number, event_id: number, username: string) {
      this.participation_id = participation_id;
      this.event_id = event_id;
      this.username = username;
    }
}
