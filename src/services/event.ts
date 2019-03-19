import { Event } from '../models/event';
import { Participation } from '../models/participation';
import { User } from '../models/user';
import { Friend } from '../models/friend';

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
      return Participation.getEventsForUser(username);
    }

    /**
     * Get's an event's participants
     * @param event_id
     */
    public static async getUsersForEvent(event_id: number): Promise<User[]> {
      return Participation.getUsersForEvent(event_id);
    }

    public static async addUserstoEvent(event_id: number, username: string, usernames: string[]) {
      // filter out non-friends in case
      let { confirmed } = await Friend.getFriends(username);
      // usernames = usernames.filter(uname => {
      //   return confirmed.some(confirmedFriend => confirmedFriend.username == uname);
      // });

      // get rid of people already in event
      let currentParticipants = await EventService.getUsersForEvent(event_id);
      usernames = usernames.filter(uname => {
        return !currentParticipants.some(participant => participant.username == uname);
      });

      return Participation.addUserstoEvent(event_id, usernames);
    }
}
