import { knex } from '../utils/knex';

/**
 * Models the ChatParticipation Schema
 */
export class ChatParticipation {
  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public chat_participation_id!: number;
  public chat_id: number;
  public username: number;
  /* tslint:enable:variable-name */

  constructor(chat_participation_id: number, chat_id: number, username: string) {
      this.chat_participation_id = participation_id;
      this.chat_id = event_id;
      this.username = username;
    }

    /**
     * Adds a new theater to the database
     * @param chat_id id of event to participate of theater
     * @param username username of participant
     */
    public static async add(chat_id: number, username: string) {
        const data = {
          chat_id,
          username,
        };

        const chat_participation_id = (await knex('ChatParticipation').insert(data).returning('chat_participation_id'))[0];

        return new ChatParticipation(chat_participation_id, chat_id, username);
    }
}
