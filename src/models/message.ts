import { Model, RelationMappings } from 'objection';

/**
 * Models the Message Schema
 */
export class Message extends Model {
  public static tableName = 'Message';
  public static idColumn = 'message_id';

  public static modelPaths = [__dirname];

  public static jsonSchema = {
    type: 'object',
    required: ['message_id', 'chat_id', 'username', 'message_text', 'date_time']

    properties: {
      message_id: { type: 'bigint' },
      chat_id: { type: 'bigint' },
      username: { type: 'string' },
      message_text: { type: 'string' },
      date_time: { type: 'string' }
    },
  };

  public static relationMappings: RelationMappings = {

  };

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public message_id!: bigint;
  public chat_id!: bigint;
  public username!: string;
  public message_text!: string;
  public date_time!: string;
  /* tslint:enable:variable-name */
}
