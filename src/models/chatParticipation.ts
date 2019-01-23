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
  public username: string;
  /* tslint:enable:variable-name */

  constructor(chat_participation_id: number, chat_id: number, username: string) {
      this.chat_participation_id = chat_participation_id;
      this.chat_id = chat_id;
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

    /**
    * Gets the chats that a user is part of
    * @param username of the user to get chats for
    */
    public static async getChatsForUser(username: string){
      return (await knex('ChatParticipation').select('*').where('username', username).innerJoin('Chat', 'ChatParticipation.chat_id', '=', 'Chat.chat_id'));
    }

    /**
    * Get the users in the chat
    * @param chat_id the id of the chat
    */
    public static async getUsersForChat(chat_id: number){
      return (await knex('ChatParticipation').select('*').where('chat_id', chat_id).innerJoin('User', 'ChatParticipation.username', '=', 'User.username'));
    }
}
