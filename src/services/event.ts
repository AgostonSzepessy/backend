import { Event } from '../models/event';
import { Participation } from '../models/participation';
import { Showtime } from '../models/showtime';
import { Movie } from '../models/movie';
import { Theater } from '../models/theater';
import { ChatParticipation } from '../models/chatParticipation';
import { User } from '../models/user';
import { Friend } from '../models/friend';
import { logger } from '../utils/logger';

export class EventService {
    /**
     * Adds a new event to the database
     * @param name name of event
     * @param showtime_id the showtime's id
     */
    public static async add(username: string, name: string, showtime_id: number) {
      const event = await Event.add(name, showtime_id);
      await Participation.addUserstoEvent(event.event_id, [ username ]);

      return event;
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

    /**
     * Adds users to an event. Once they are added to the event, they are also
     * added to the corresponding group chat for that event.
     * @param event_id id of event to add users to
     * @param username username of user that created the event
     * @param usernames usernames of other users to add to event
     */
    public static async addUserstoEvent(event_id: number, username: string, usernames: string[]) {
      // filter out users who aren't friends with the person who made the event
      const { confirmed } = await Friend.getFriends(username);
      usernames = usernames.filter((uname) => {
         return confirmed.some((confirmedFriend) => confirmedFriend.username === uname);
      });

      // get rid of people already in event
      const currentParticipants = await EventService.getUsersForEvent(event_id);
      usernames = usernames.filter((uname) => {
        return !currentParticipants.some((participant: any) => participant.username === uname);
      });

      const addedUsers = await Participation.addUserstoEvent(event_id, usernames);

      // add the people to the chat too
      const chats = await ChatParticipation.getChatsForUser(username);
      const chat = chats.find((c) => c.event_id === event_id);

      if(!chat) {
        throw new Error('This shouldnt happend...?');
      }

      await ChatParticipation.addUserstoChat(chat.chat_id, usernames);

      return addedUsers;
  }
}
