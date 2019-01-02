import { Model, RelationMappings } from 'objection';

export class Movie extends Model {
    public static tableName = 'Movie';
    public static idColumn = 'movie_id';

    public static modelPaths = [__dirname];

    public static jsonSchema = {
        type: 'object',
        required: ['movie_id', 'name', 'runtime', 'genre', 'parental_rating',
                    'poster_url', 'synopsis'],

        properties: {
            movie_id: { type: 'bigint' },
            name: { type: 'string' },
            runtime: { type: 'number' },
            genre: { type: 'string' },
            parental_rating: { type: 'string' },
            poster_url: { type: 'string' },
            synopsis: { type: 'string' },
        },
    };

    public static relationMappings: RelationMappings = {

    };

    // Variable names should match up with database column
    // names so this rule needs disabled
    /* tslint:disable:variable-name */
    public movie_id!: bigint;
    public name!: string;
    public runtime!: number;
    public genre!: string;
    public parental_rating!: string;
    public poster_url!: string;
    public synopsis!: string;
    /* tslint:enable:variable-name */
}
