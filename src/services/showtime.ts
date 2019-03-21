import { Showtime } from '../models/showtime';
import { logger } from '../utils/logger';
import { dateHandler } from '../utils/dateHandler';
import { DateTime } from 'luxon';

export class ShowtimeService {
    /**
     * Adds a new showtime to the database
     * @param { number } theater_id
     * @param { number } movie_id
     * @param { Date } date_time
     * @param { number } cost
     */
    public static async add(theater_id: number, movie_id: number, date_time: Date, cost: number) {
        return Showtime.add(theater_id, movie_id, date_time, cost);
    }

    public static async search(theater_id: number, movie_id: number, date_time: Date) {
      // perform search
      let showtimes = await Showtime.search(theater_id, movie_id, date_time);

      // format the date and time for each showtime
      return showtimes.map((showtime: any) => {
        // get the date_time as a string (this is easiest way...)
        const dt = (new Date(JSON.stringify(showtime.date_time).replace(/\"/g, '')));
        const formattedDate = dateHandler.convertToEST(new Date(showtime.date_time));

        showtime.date = formattedDate.date;
        showtime.time = formattedDate.time;
        showtime.date_time = dt.toString();
        return showtime;
      });

    }
}
