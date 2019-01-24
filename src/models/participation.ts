import { knex } from '../utils/knex';

/**
 * Models the Participation Schema
 */
export class Participation {
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
    public static async getEventsForUser(username: string){
      return (await knex('Participation').select('*').where('username', username).innerJoin('Event', 'Participation.event_id', '=', 'Event.event_id'));
    }

    /**
    * Gets the users in an event
    */
    public static async getUsersForEvent(event_id: number){
      return (await knex('Participation').select('*').where('event_id', event_id).innerJoin('User', 'Participation.username', '=', 'User.username'));
    }
}
