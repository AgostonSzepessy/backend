/**
 * Wraps express responses that get sent back to the client
 */
export default class ResponseValue {
    public success: boolean;
    public data: any;

    constructor(success: boolean, message: any) {
        this.success = success;
        this.data = message;
    }
}
