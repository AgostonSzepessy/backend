import express, { Response, Request } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';
import { TheaterService } from '../../services/theater';

module.exports = (router: express.Router) => {
  /**
  * Adds a new theater
  */
  router.post('/theater', asyncHandler(async (req: Request, res: Response) => {
    const name = req.body.name;
    const address = req.body.address;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    if(!name || !address){
      throw new MovnetError(400, 'Fields "name" & "address" must be filled out');
    }

    const theater = await TheaterService.add(name, address, longitude, latitude);

    return res.json(new ResponseValue(true, theater));
  }));

  /**
  * Searches for theaters
  */
  router.get('/theater', asyncHandler(async (req: Request, res: Response) => {
    const city = req.query.city || '';

    const theaters = await TheaterService.search(city);

    return res.json(new ResponseValue(true, theaters));
  }));
};
