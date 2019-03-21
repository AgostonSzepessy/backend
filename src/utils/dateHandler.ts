import { DateTime } from 'luxon';
import { MovnetDate } from '../interfaces/MovnetDate';

class DateHandler {

    /**
     * Converts JS date to 
     * @param date JS date to convert
     */
    public convertToEST(date: Date): MovnetDate {
        const dt = DateTime.fromJSDate(date, { zone: 'America/New_York' });
        const dayMonth = dt.toFormat('ccc LLL d');
        const time = dt.toFormat('hh:mm a');

        return {
            date: dayMonth,
            time
        };
    }
}

export const dateHandler = new DateHandler();
