/**
 * Wraps express responses that get sent back to the client
 */
export default class ResponseValue {
    public success: boolean;
    public message: any;

    constructor(success: boolean, message: any) {
        this.success = success;
        this.message = message;
    }
}
