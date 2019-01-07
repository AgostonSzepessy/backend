import { Model, RelationMappings } from 'objection';

/**
 * Models the Friend Schema
 */
export class Friend extends Model {
  public static tableName = 'Friend';
  public static idColumn = 'friend_id';

  public static modelPaths = [__dirname];

  public static jsonSchema = {
    type: 'object',
    required: ['friend_id', 'u1_id', 'u2_id', 'u2_confirmed']

    properties: {
      friend_id: { type: 'bigint' },
      u1_id: { type: 'bigint' },
      u2_id: { type: 'bigint' },
      u2_confirmed: { type: 'boolean' }
    },
  };

  public static relationMappings: RelationMappings = {

  };

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public friend_id!: bigint;
  public u1_id!: bigint;
  public u2_id!: bigint;
  public u2_confirmed!: boolean;
  /* tslint:enable:variable-name */
}
