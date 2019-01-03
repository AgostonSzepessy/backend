// declare namespace Express {
//     export interface Request {
//         user: import("./models/user").User;
//     }
// }
import { User } from "./models/user";

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}
