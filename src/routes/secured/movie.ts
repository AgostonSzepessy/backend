import express, { Response, Request } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';
import { MovieService } from '../../services/movie';

module.exports = (router: express.Router) => {
    /**
     * Adds a new movie
     */
    router.post('/movie', asyncHandler(async (req: Request, res: Response) => {
        const name = req.body.name;
        const runtime = req.body.runtime;
        const genre = req.body.genre;
        const parentalRating = req.body.parentalRating;
        const posterUrl = req.body.posterUrl;
        const synopsis = req.body.synopsis;
        const movie_length = req.body.movie_length || '';

        if(!name || !runtime || !genre || !parentalRating || !posterUrl || !synopsis) {
            throw new MovnetError(400, 'All fields must be filled out');
        }

        const movie = await MovieService.add(name, runtime, genre, parentalRating, posterUrl, synopsis, movie_length);

        res.json(new ResponseValue(true, movie));
    }));

    /**
     * searches movies
     */
    router.get('/movie', asyncHandler(async (req: Request, res: Response) => {
      const genre = req.query.genre || '';
      const name = req.query.name || '';

      const movies = await MovieService.search(genre, name);

      res.json(new ResponseValue(true, movies));
    }));
};
