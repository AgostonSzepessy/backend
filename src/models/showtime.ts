import { Model, RelationMappings } from 'objection';

/**
 * Models the Showtime Schema
 */
export class Showtime extends Model {
  public static tableName = 'Showtime';
  public static idColumn = 'showtime_id';

  public static modelPaths = [__dirname];

  public static jsonSchema = {
    type: 'object',
    required: ['showtime_id', 'theater_id', 'movie_id', 'date_time', 'cost']

    properties: {
      showtime_id: { type: 'bigint' },
      theater_id: { type: 'bigint' },
      movie_id: { type: 'bigint' },
      date_time: { type: 'string' },
      cost: { type: 'number' },
    },
  };

  public static relationMappings: RelationMappings = {

  };

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public showtime_id!: bigint;
  public theater_id!: bigint;
  public movie_id!: bigint;
  public date_time!: string;
  public cost!: number;
  /* tslint:enable:variable-name */
}
