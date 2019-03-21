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

  /**
   * Updates an event's name and/or users
   * @param event_id ID of event
   * @param name (optional) new name of event
   * @param friends (optional) usernames of friends to add to event
   */
  router.post('/event/:event_id', asyncHandler(async (req: RequestWithUser, res: Response) => {
    if(req.user) {
      const event_id = req.params.event_id;
      const name = req.body.name || '';
      const friends = req.body.friends || [];

      const username = req.user.username;

      if(!name && !friends) {
        throw new MovnetError(422, 'Name or friends must be specified');
      }

      const result: any = { };

      if(name) {
        const eventData = await EventService.updateName(event_id, name);
        result.eventData = eventData;
      }

      if(friends) {
        const users = await EventService.addUserstoEvent(event_id, username, friends);
        result.users = users;
      }

      res.json(new ResponseValue(true, result));
    } else {
      throw new MovnetError(422, 'No user da hek');
    }
  }));

  /**
   * Deletes an event
   * @param event_id id of event to delete
   */
  router.delete('/event/:event_id', asyncHandler(async (req: RequestWithUser, res: Response) => {
    if(!req.user) {
      throw new MovnetError(422, 'User has bad token');
    }

    const event_id = req.params.event_id;
    const username = req.user.username;

    await EventService.deleteEvent(event_id, username);

    res.json(new ResponseValue(true, `Deleted ${event_id}`));
  }));

  /**
   * Gets all friends that aren't part of the event
   */
  router.get('/event/:event_id/friend', asyncHandler(async (req: RequestWithUser, res: Response) => {
    if(!req.user) {
      throw new MovnetError(422, 'User is corrupted');
    }

    const event_id = req.params.event_id;
    const username = req.user.username;

    const friends = await EventService.getNonParticipantFriends(event_id, username);

    res.json(new ResponseValue(true, friends));
  }));
};
