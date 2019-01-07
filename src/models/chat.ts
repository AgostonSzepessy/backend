import { Model, RelationMappings } from 'objection';

/**
 * Models the Chat Schema
 */
export class Chat extends Model {
  public static tableName = 'Chat';
  public static idColumn = 'chat_id';

  public static modelPaths = [__dirname];

  public static jsonSchema = {
    type: 'object',
    required: ['chat_id', 'name', 'event_id', ],

    properties: {
      chat_id: { type: 'bigint' },
      event_id: { type: 'bigint' },
      name: { type: 'string' },
    },
  };

  public static relationMappings: RelationMappings = {

  };

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public chat_id!: bigint;
  public event_id!: bigint;
  public name!: string;
  /* tslint:enable:variable-name */
}
