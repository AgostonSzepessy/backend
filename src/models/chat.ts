import { Model, RelationMappings } from 'objection';
import { join } from 'path';

export class Chat extends Model {
    public static tableName = 'Chat';
    public static idColumn = 'chat_id';

    public static jsonSchema = {
        type: 'object',
        required: ['name', 'event_id'],

        properties: {
            chat_id: { type: 'bigint' },
            name: { type: 'string', minLength: 1, maxLength: 128 },
            event_id: { type: 'bigint' },
        }
    };

    public static modelPaths = [__dirname];

    public static relationMappings: RelationMappings = {
        user: {
            relation: Model.ManyToManyRelation,
            modelClass: join(__dirname, 'user'),

            join: {
                from: 'Chat.chat_id',
                through: {
                    from: 'ChatParticipation.chat_id',
                    to: 'ChatParticipation.username',
                },
                to: 'User.username',
            },
        },

        message: {
            relation: Model.HasManyRelation,
            modelClass: join(__dirname, 'message'),

            join: {
                from: 'Chat.chat_id',
                to: 'Message.chat_id',
            },
        },
    };

    // Variable names should match up with database column
    // names so this rule needs disabled
    /* tslint:disable:variable-name */
    public chat_id!: bigint;
    public name!: string;
    public event_id!: bigint;
    /* tslint:enable:variable-name */
}
