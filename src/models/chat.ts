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
    public static create(name: string, eventId: number) {
        const chatData = {
            name,
            event_id: eventId,
        };

        return knex('Chat').returning('chat_id').insert(chatData);
    }

    /**
     * Adds a user to a chat
     * @param username Username of user to add to chat
     * @param chatId Chat to add them to
     */
    public static addUser(username: string, chatId: number) {
        const chatParticipation = {
            username,
            chat_id: chatId,
        };

        return knex('ChatParticipation').insert(chatParticipation).returning('chat_participation_id');
    }

    /**
     * Deletes a chat
     * @param chatId Chat to delete
     */
    public static deleteChat(chatId: number) {
        knex('Chat').where('chat_id', chatId).del();
    }
}
