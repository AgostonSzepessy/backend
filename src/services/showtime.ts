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
      return Showtime.search(theater_id, movie_id, date_time);
    }
}
