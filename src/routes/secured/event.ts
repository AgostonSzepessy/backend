import express, { Response, Request } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';
import { EventService } from '../../services/event';

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
};
