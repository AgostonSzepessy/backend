import { Showtime } from '../models/showtime';

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
        let date_time = JSON.stringify(showtime.date_time).replace(/\"/g, '');
        // first half is always date
        showtime.date = date_time.split('T')[0];
        // second half is always time + time zone signifier (Z means UTC), so remove it
        showtime.time = date_time.split('T')[1].replace('Z', '');
        return showtime;
      });
    }
}
