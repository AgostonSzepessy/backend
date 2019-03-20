import { knex } from '../utils/knex';

/**
 * Models the Movie Schema
 */
export class Movie {

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
        const data = {
            name,
            runtime,
            genre,
            parental_rating,
            poster_url,
            synopsis,
        };

        const movie_id = (await knex('Movie').insert(data).returning('movie_id'))[0];

        return new Movie(movie_id, name, runtime, genre, parental_rating, poster_url, synopsis);
    }

    public static async all(){
      return await knex('Movie').select().orderBy('name', 'asc');
    }

    public static async search(genre: string, name: string) {
      return await knex('Movie').where(function(){
        if(genre){
          this.where('genre', 'like', `%${genre}%`);
        }
        if(name){
          this.where('name', 'like', `%${name}%`);
        }
      }).orderBy('name', 'asc');
    }

    public static async findById(movie_id: number) {
      return (await knex('Movie').select('movie_id', 'name', 'runtime', 'genre', 'poster_url', 'synopsis')
        .where('movie_id', movie_id))[0];
    }

    // Variable names should match up with database column
    // names so this rule needs disabled
    /* tslint:disable:variable-name */
    public movie_id!: number;
    public name: string;
    public runtime: number;
    public genre: string;
    public parental_rating: string;
    public poster_url: string;
    public synopsis: string;
    /* tslint:enable:variable-name */

    constructor(movie_id: number, name: string, runtime: number, genre: string, parental_rating: string,
                poster_url: string, synopsis: string) {
        this.movie_id = movie_id;
        this.name = name;
        this.runtime = runtime;
        this.genre = genre;
        this.parental_rating = parental_rating;
        this.poster_url = poster_url;
        this.synopsis = synopsis;
    }
}
