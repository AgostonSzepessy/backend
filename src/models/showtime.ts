import { knex } from '../utils/knex';

/**
 * Models the Showtime Schema
 */
export class Showtime {

    /**
     * Adds a new theater to the database
     * @param theater_id id of theater
     * @param movie_id id of movie
     * @param date_time date and time of showtime
     * @param cost cost of the showtime
     */
    public static async add(theater_id: number, movie_id: number, date_time: Date, cost: number) {
        const data = {
            theater_id,
            movie_id,
            date_time,
            cost,
        };

        const showtime_id = (await knex('Showtime').insert(data).returning('showtime_id'))[0];

        return new Showtime(showtime_id, theater_id, movie_id, date_time, cost);
    }

    // Variable names should match up with database column
    // names so this rule needs disabled
    /* tslint:disable:variable-name */
    public showtime_id!: number;
    public theater_id: number;
    public movie_id: number;
    public date_time: Date;
    public cost: number;
    /* tslint:enable:variable-name */

    constructor(showtime_id: number, theater_id: number, movie_id: number, date_time: Date, cost: number) {
      this.showtime_id = showtime_id;
      this.theater_id = theater_id;
      this.movie_id = movie_id;
      this.date_time = date_time;
      this.cost = cost;
    }
}
