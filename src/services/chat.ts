import { Chat } from '../models/chat';


export class ChatService {
    /**
     * Adds a new movie to the database
     * @param name name of chat
     * @param event_id id of the event the chat is for
     */
    public static async add(name: string, event_id: number) {
        return Chat.add(name, event_id);
    }

    /**
    * Adds a user to the chat
    * @param username username of the user to add
    * @param chat_id id of the chat to add user to
    */
    public static async addUser(username: string, chat_id: number){
      return Chat.addUser(username, chat_id);
    }

    /**
    * Adds message to the chat
    * @param chat_id id of the chat
    * @param username of the person to add
    * @param message_text body of the message
    */
    public static async addMessage(chat_id: number, username: string, message_text: string){
      return Chat.addMessage(chat_id, username, message_text);
    }
}
