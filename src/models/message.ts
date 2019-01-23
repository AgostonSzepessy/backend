import { knex } from '../utils/knex';

/**
 * Model for messages
 */
export class Message {
  public message: string;
  public username: string;
  public chat_id: number;
  public message_id!: number;
  public date_time!: string;

  constructor(chat_id: number, message: string, username: string) {
    this.chat_id = chat_id;
    this.message = message;
    this.username = username;
  }


    /**
     * Adds a new message to the chat
     * @param chat_id ID of chat to add message to
     * @param username username of user sending message
     * @param message contents of message
     * @param date_time timestamp of the message
     */
    public static async add(chat_id: number, username: string, message: string) {
        const data = {
            chat_id,
            username,
            message,
        };

        const msgData = (await knex('Message').insert(data).returning('*'))[0];

        const msg = new Message(msgData.chat_id, msgData.message, msgData.username);
        msg.date_time = msgData.date_time;
        msg.message_id = msgData.message_id;

        return msg;
    }

    /**
    * Get the last X messages for the chat
    * @param chat_id id of the chat to get
    * @param start index of first message to get
    * @param limit max number of messages to get. Capped at 50
    */
    public static async get(chat_id: number, start: number, limit = 50){
      if(limit > 50) limit = 50; // cap limit to 50

      return (await knex('Message').select('*').where('chat_id', chat_id).orderBy('date_time', 'desc').limit(limit));
    }
}
