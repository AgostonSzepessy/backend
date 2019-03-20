import express, { Response, Request } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';
import { EventService } from '../../services/event';
import { ChatService } from '../../services/chat';
import { RequestWithUser } from '../../interfaces/requests';
import { Event } from '../../models/event';

module.exports = (router: express.Router) => {
  /**
   * Adds a new event
   */
  router.post('/event', asyncHandler(async (req: RequestWithUser, res: Response) => {
    if(req.user) {
      const username = req.user.username;
      const name = req.body.name;
      const showtime_id = req.body.showtime_id;
      const friends = req.body.friends;

      if(!name || !showtime_id || !friends) {
        throw new MovnetError(400, 'All fields must e filled out');
      }

      // create the event
      const event = await EventService.add(username, name, showtime_id);
      // create the chat for the event
      const chat = await ChatService.add(username, name, event.event_id);

      const users = await EventService.addUserstoEvent(event.event_id, username, friends);

      return res.json(new ResponseValue(true, {event, chat, users}));
    } else {
      return res.json(new ResponseValue(false, 'No user, WRONG!'));
    }
  }));

  /**
   * Gets a user's events
   */
  router.get('/event', asyncHandler(async (req: RequestWithUser, res: Response) => {
    if(req.user) {
      const username = req.user.username;

      const events = await EventService.getEventsForUser(username);

      return res.json(new ResponseValue(true, events));
    } else {
      throw new MovnetError(422, 'No user da hek');
    }
  }));

  /**
   * Gets data about an event
   */
  router.get('/event/:event_id', asyncHandler(async (req: Request, res: Response) => {
    const event_id = req.params.event_id;

    const eventData = await EventService.getEventData(event_id);

    return res.json(new ResponseValue(true, eventData));
  }));
};
