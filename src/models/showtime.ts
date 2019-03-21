import { knex } from '../utils/knex';
import { dateHandler } from '../utils/dateHandler';

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

    public static async search(theater_id: number, movie_id: number, date_time: Date){
      return await knex('Showtime').where(function(){
        if(theater_id) {
          this.where('theater_id', theater_id);
        }
        if(movie_id){
          this.where('movie_id', movie_id);
        }
        if(date_time) {
          date_time = new Date(date_time);
          const startDate = new Date(date_time.setHours(0,0,0));
          const endDate = new Date(date_time.setHours(23,59,59));
          this.whereBetween('date_time', [ startDate, endDate ]);
        }
      }).orderBy('date_time', 'asc');
    }

    public static async findById(showtime_id: number) {
      const showtime = (await knex('Showtime').select('*').where('showtime_id', showtime_id))[0];
      return fixDate(showtime);
    }

    // Variable names should match up with database column
    // names so this rule needs disabled
    /* tslint:disable:variable-name */
    public showtime_id!: number;
    public theater_id: number;
    public movie_id: number;
    public date_time: Date;
    public cost: number;
    public date!: string;
    public time!: string;
    /* tslint:enable:variable-name */

    constructor(showtime_id: number, theater_id: number, movie_id: number, date_time: Date, cost: number) {
      this.showtime_id = showtime_id;
      this.theater_id = theater_id;
      this.movie_id = movie_id;
      this.date_time = date_time;
      this.cost = cost;

      fixDate(this);
    }
}

function fixDate(showtime: Showtime) {
  const dt = (new Date(JSON.stringify(showtime.date_time).replace(/\"/g, '')));
  const formattedDate = dateHandler.convertToEST(new Date(showtime.date_time));

  showtime.date = formattedDate.date;
  showtime.time = formattedDate.time;

  return showtime;
}
