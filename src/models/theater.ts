import { Model, RelationMappings } from 'objection';

/**
 * Models the Theater Schema
 */
export class Theater extends Model {
  public static tableName = 'Theater';
  public static idColumn = 'theater_id';

  public static modelPaths = [__dirname];

  public static jsonSchema = {
    type: 'object',
    required: ['theater_id', 'name', 'address', 'longitude', 'latitude'],

    properties: {
      theater_id: { type: 'bigint' },
      name: { type: 'string' },
      address: { type: 'string' },
      longitude: { type: 'number' },
      latitude: { type: 'number' },
    },
  };

  public static relationMappings: RelationMappings = {

  };

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public theater_id!: bigint;
  public name!: string;
  public address!: string;
  public longitude!: number;
  public latitude!: number;
  /* tslint:enable:variable-name */
}
