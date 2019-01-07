import { Model, RelationMappings } from 'objection';

/**
 * Models the Participation Schema
 */
export class Participation extends Model {
  public static tableName = 'Participation';
  public static idColumn = 'participation_id';

  public static modelPaths = [__dirname];

  public static jsonSchema = {
    type: 'object',
    required: ['participation_id', 'event_id', 'username']

    properties: {
      participation_id: { type: 'bigint' },
      event_id: { type: 'bigint' },
      username: { type: 'string' },
    },
  };

  public static relationMappings: RelationMappings = {

  };

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public participation_id!: bigint;
  public event_id!: bigint;
  public username!: string;
  /* tslint:enable:variable-name */
}
