import { Event } from '../models/event';
import { Participation } from '../models/participation';
import { Showtime } from '../models/showtime';
import { Movie } from '../models/movie';
import { Theater } from '../models/theater';
import { logger } from '../utils/logger';

export class EventService {
    /**
     * Adds a new event to the database
     * @param name name of event
     * @param showtime_id the showtime's id
     */
    public static async add(name: string, showtime_id: number) {
        return Event.add(name, showtime_id);
    }

    /**
     * Gets a user's events
     * @param username
     */
    public static async getEventsForUser(username: string) {
      const participations = await Participation.getEventsForUser(username);

      const events = [];

      for(const p of participations) {
        events.push(await this.getEventData(p.event_id));
      }

      return events;
    }

    /**
     * Get's an event's participants
     * @param event_id
     */
    public static async getUsersForEvent(event_id: number) {
      return Participation.getUsersForEvent(event_id);
    }

    /**
     * Returns data about an event, including:
     * name, showtime_id, movie, theater and users
     */
    public static async getEventData(event_id: number) {
      const eventData = await Event.getData(event_id);
      const showtimeData = await Showtime.findById(eventData.showtime_id);
      const users = await Participation.getUsersForEvent(event_id);
      const movieData = await Movie.findById(showtimeData.movie_id);
      const theaterData = await Theater.findById(showtimeData.theater_id);

      return {
        eventData,
        showtimeData,
        users,
        movieData,
        theaterData,
      };
    }
}
