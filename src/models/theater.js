import { knex } from '../utils/knex';

/**
 * Models the Theater Schema
 */
export class Theater {
  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public theater_id!: number;
  public name: string;
  public address: string;
  public longitude: number;
  public latitude: number;
  /* tslint:enable:variable-name */

  constructor(theater_id: number, name: string, longitude: number, latitude: number) {
      this.theater_id = theater_id;
      this.name = name;
      this.longitude = longitude;
      this.latitude = latitude;
    }

    /**
     * Adds a new theater to the database
     * @param name name of theater
     * @param longitude longitude of theater
     * @param latitude latitude of theater
     */
    public static async add(name: string, longitude: number, latitude: string) {
        const data = {
            name,
            longitude,
            latitude,
        };

        const theater_id = (await knex('Theater').insert(data).returning('theater_id'))[0];

        return new Theater(theater_id, name, longitude, latitude);
    }
}
