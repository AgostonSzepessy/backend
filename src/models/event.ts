import { knex } from '../utils/knex';

/**
 * Model for messages
 */
export class Event {

  /**
   * Adds a new message to the chat
   * @param event_id ID of event
   * @param name name of the event
   * @param showtime_id id of the associated showtime
   */
  public static async add(name: string, showtime_id: number) {
      const data = {
          name,
          showtime_id,
      };

      const eventData = (await knex('Event').insert(data).returning('*'))[0];

      const event = new Event(eventData.event_id, eventData.name, eventData.showtime_id);

      return event;
  }

  public static async getData(event_id: number) {
    const data = (await knex('Event').select('name', 'showtime_id').where('event_id', event_id))[0];

    return data;
  }

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public event_id: number;
  public name: string;
  public showtime_id: number;
  /* tslint:enable:variable-name */

  constructor(event_id: number, name: string, showtime_id: number) {
    this.event_id = event_id;
    this.name = name;
    this.showtime_id = showtime_id;
  }
}
