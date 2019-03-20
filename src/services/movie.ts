import { Movie } from '../models/movie';

export class MovieService {
    /**
     * Adds a new movie to the database
     * @param name name of movie
     * @param runtime runtime of movie
     * @param genre genre of movie
     * @param parental_rating parental rating of movie
     * @param poster_url part of the link to the poster
     * @param synopsis synopsis of movie
     */
    public static async add(name: string, runtime: number, genre: string, parental_rating: string,
                            poster_url: string, synopsis: string) {
        return Movie.add(name, runtime, genre, parental_rating, poster_url, synopsis);
    }

    public static async search(genre: string, name: string){
      if(!genre && !name){
        return await Movie.all();
      }
      return await Movie.search(genre, name);
    }

    public static async findById(movie_id: number) {
      return Movie.findById(movie_id);
    }
}
