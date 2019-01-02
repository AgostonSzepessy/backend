import { Model, RelationMappings } from 'objection';

export class User extends Model {

    public static tableName = 'User';
    public static idColumn = 'username';

    public static jsonSchema = {
        type: 'object',
        required: ['fname', 'lname', 'username', 'email', 'password'],

        properties: {
            fname: { type: 'string', minLength: 1, maxLength: 30 },
            lname: { type: 'string', minLength: 1, maxLength: 30 },
            username: { type: 'string', minLength: 1, maxLength: 20 },
            email: { type: 'string', minLength: 1, maxLength: 320 },
            password: { type: 'string', minLength: 1, maxLength: 128 },
        }
    };

    public static modelPaths = [__dirname];

    public static relationMappings: RelationMappings = {

    };

    // Variable names should match up with database column
    // names so this rule needs disabled
    /* tslint:disable:variable-name */
    public fname!: string;
    public lname!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    /* tslint:enable:variable-name */
}
