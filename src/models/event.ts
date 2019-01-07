import { Model, RelationMappings } from 'objection';

/**
 * Models the Event Schema
 */
export class Event extends Model {
  public static tableName = 'Event';
  public static idColumn = 'event_id';

  public static modelPaths = [__dirname];

  public static jsonSchema = {
    type: 'object',
    required: ['event_id', 'name', 'showtime_id']

    properties: {
      event_id: { type: 'bigint' },
      showtime_id: { type: 'bigint' },
      name: { type: 'string' }
    },
  };

  public static relationMappings: RelationMappings = {

  };

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public event_id!: bigint;
  public showtime_id!: bigint;
  public name!: string;
  /* tslint:enable:variable-name */
}
