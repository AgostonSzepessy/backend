import { Event } from '../models/event';
import { Participation } from '../models/participation';

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
    public static async getEventsForUser(username: string){
      return Participation.getEventsForUser(username);
    }

    /**
    * Get's an event's participants
    * @param event_id
    */
    public static async getUsersForEvent(event_id: number){
      return Participation.getUsersForEvent(event_id);
    }
}
