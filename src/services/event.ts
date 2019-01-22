import { Event } from '../models/event';

export class EventService {
    /**
     * Adds a new movie to the database
     * @param name name of movie
     * @param showtime_id the showtime's id
     */
    public static async add(name: string, showtime_id: number) {
        return Event.add(name, showtime_id);
    }
}
