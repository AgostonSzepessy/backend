import { Model, RelationMappings } from 'objection';
import { join } from 'path';

export class Message extends Model {
    public static tableName = 'Message';
    public static idColumn = 'message_id';

    public static jsonSchema = {
        type: 'object',
        required: ['chat_id', 'username', 'message_text'],

        properties: {
            message_id: { type: 'bigint' },
            chat_id: { type: 'bigint' },
            username: { type: 'string', minLength: 1, maxLength: 20 },
            message_text: { type: 'string', minLength: 1, maxLength: 65_535 },
            date_time: { type: 'string' },
        }
    };

    public static modelPaths = [__dirname];

    public static relationMappings: RelationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: join(__dirname, 'user'),
            join: {
                from: 'Message.username',
                to: 'User.username',
            }
        },

        chat: {
            relation:Model.BelongsToOneRelation,
            modelClass: join(__dirname, 'chat'),
            join: {
                from: 'Message.chat_id',
                to: 'Chat.chat_id',
            }
        }
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
