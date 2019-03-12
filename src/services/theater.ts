import { Theater } from '../models/theater';

export class TheaterService {
    /**
     * Adds a new theater to the database
     * @param name name of the theater
     * @param address address of the theater
     * @param longitude of the theater
     * @param latitude of the theater
     */
    public static async add(name: string, address: string, longitude: number, latitude: number) {
        return Theater.add(name, address, longitude, latitude);
    }

    /**
    * Searches the database for theaters in given city, if supplied. Otherwise returns all theaters
    */
    public static async search(city: string){
      if(city == ''){
        return Theater.all();
      }
      return Theater.search(city);
    }
}
