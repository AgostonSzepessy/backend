import express, { Response, Request } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';
import { EventService } from '../../services/event';
import { RequestWithUser } from '../../interfaces/requests';

module.exports = (router: express.Router) => {
  /**
  * Adds a new event
  */
  router.post('/event', asyncHandler(async (req: Request, res: Response) => {
    const name = req.body.name;
    const showtime_id = req.body.showtime_id;

    if(!name || !showtime_id){
      throw new MovnetError(400, 'All fields must e filled out');
    }

    const event = await EventService.add(name, showtime_id);

    return res.json(new ResponseValue(true, event));
  }));

  /**
  * Gets a user's events
  */
  router.get('/event', asyncHandler(async (req: RequestWithUser, res: Response) => {
    if(req.user){
      const username = req.user.username;

      const events = await EventService.getEventsForUser(username);

      return res.json(new ResponseValue(true, events));
    }
    else {
      throw new MovnetError(422, 'No user da hek');
    }
  }));

  /**
  * Gets the users for an event
  */
  router.get('/event/:event_id', asyncHandler(async (req: Request, res: Response) => {
    const event_id = req.params.event_id;

    const users = await EventService.getUsersForEvent(event_id);

    return res.json(new ResponseValue(true, users));
  }));
};
