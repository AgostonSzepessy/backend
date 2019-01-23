import { knex } from '../utils/knex';

/**
 * Operations you can do on the Chat table
 */
export class Chat {
    /**
     * Creates a new chat
     * @param name Name of chat
     * @param eventId Event this chat is for
     */
    public static async add(name: string, eventId: number): Promise<number> {
        const chatData = {
            name,
            event_id: eventId,
        };

        return (await knex('Chat').returning('chat_id').insert(chatData))[0];
    }

    /**
     * Adds a user to a chat
     * @param username Username of user to add to chat
     * @param chatId Chat to add them to
     */
    public static async addUser(username: string, chatId: number): Promise<number> {
        const chatParticipation = {
            username,
            chat_id: chatId,
        };

        return (await knex('ChatParticipation').insert(chatParticipation).returning('chat_participation_id'))[0];
    }

    /**
     * Deletes a chat
     * @param chatId Chat to delete
     */
    public static async deleteChat(chatId: number) {
        return knex('Chat').where('chat_id', chatId).del();
    }

    /**
    * Creates message and adds to chat
    * @param chat_id id of the chat
    * @param username of the sender
    * @param message_text body of the message
    */
    public static async addMessage(chat_id: number, username: string, message_text: string): Promise<number> {
      const message = {
        chat_id,
        username,
        message_text,
      };

      return (await knex('Message').insert(message).returning('message_id'))[0];
    }
}
