import { Model, RelationMappings } from 'objection';

/**
 * Models the ChatParticipation Schema
 */
export class ChatParticipation extends Model {
  public static tableName = 'ChatParticipation';
  public static idColumn = 'chat_participation_id';

  public static modelPaths = [__dirname];

  public static jsonSchema = {
    type: 'object',
    required: ['chat_participation_id', 'chat_id', 'username']

    properties: {
      chat_participation_id: { type: 'bigint' },
      chat_id: { type: 'bigint' },
      username: { type: 'string' }
    },
  };

  public static relationMappings: RelationMappings = {

  };

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public chat_participation_id!: bigint;
  public chat_id!: bigint;
  public username!: string;
  /* tslint:enable:variable-name */
}
