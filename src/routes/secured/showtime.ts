import express, { Response, Request } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';
import { ShowtimeService } from '../../services/showtime';

module.exports = (router: express.Router) => {
    /**
     * Adds a new showtime
     */
    router.post('/showtime', asyncHandler(async (req: Request, res: Response) => {
        const theater_id = req.body.theater_id;
        const movie_id = req.body.movie_id;
        const date_time = req.body.date_time;
        const cost = req.body.cost;

        if(!theater_id || !movie_id || !date_time || !cost) {
            throw new MovnetError(400, 'All fields must be filled out');
        }

        const showtime = await ShowtimeService.add(theater_id, movie_id, date_time, cost);

        res.json(new ResponseValue(true, showtime));
    }));

    /**
     * Searches showtimes
     */
    router.get('/showtime', asyncHandler(async (req: Request, res: Response) => {
      const theater_id = req.query.theater_id || '';
      const movie_id = req.query.movie_id || '';
      const date_time = req.query.date_time || null;

      const showtimes = await ShowtimeService.search(theater_id, movie_id, date_time);

      res.json(new ResponseValue(true, showtimes));
    }));
};
