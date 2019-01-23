import express, { Response, Request } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';
import { ChatService } from '../../services/chat';

module.exports = (router: express.Router) => {
  /**
  * Adds a new chat
  */
  router.post('/chat', asyncHandler(async (req: Request, res: Response) => {
    const name = req.body.name;
    const event_id = req.body.event_id;

    if(!name || !event_id){
      throw new MovnetError(422, 'All fields must be filled out');
    }

    const chat = await ChatService.add(name, event_id);

    return res.json(new ResponseValue(true, chat));
  }));

  /**
  * Creates a message and adds it to chat
  */
  router.post('/chat/:chat_id', asyncHandler(async (req: Request, res: Response) => {
    const chat_id = req.body.chat_id;
    const username = req.body.username;
    const message_text = req.body.message_text;

    if(!chat_id || !username || !message_text){
      throw new MovnetError(422, 'All fields must be filled out');
    }

    const message = await ChatService.addMessage(chat_id, username, message_text);

    return res.json(new ResponseValue(true, message));
  }));
};
