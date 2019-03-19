import { Showtime } from '../models/showtime';
import { logger } from '../utils/logger';

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
      return showtimes.map((showtime:any) => {
        // get the date_time as a string (this is easiest way...)
        let date_time = (new Date(JSON.stringify(showtime.date_time).replace(/\"/g, '')));
        let date = date_time.toString().split(' ').slice(0,4).join(' ');
        const timeRegex = /\d+:\d+/; // matches time formats of HH:MM, where the first H could be missing
        let time = date_time.toLocaleTimeString('en-US').split(' ').map(
          (str, index) => {
            if(index>0) {
              return str;
            } else {
                const timeResult = timeRegex.exec(str);

                if(timeResult) {
                  return timeResult[0];
                }

                return 'Invalid';
              }
          }).join(' ');
        showtime.date = date;
        showtime.time = time;
        showtime.date_time = date_time.toString();
        return showtime;
      });
    }
}
