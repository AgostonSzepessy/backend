export namespace Jwt {
    /**
     * Data that gets stored in the JWT
     */
    export interface Payload {
        username?: string;
    }

    /**
     * Checks if the decoded JWT can be used as a Payload
     * @param decodedJwt The decoded JWT
     */
    export function isPayload(decodedJwt: string | object | Payload): decodedJwt is Payload {
        return (<Payload>decodedJwt).username !== undefined;
    }

    /**
     * Secret that the JWT gets encrypted with
     */
    // tslint:disable-next-line
    export const SECRET = 'fïoîGsÒÇïÔ£Ó¯ã9ÂVçò¤9ëkeÍ¥aì®gÛcôÙv§m¨Ec«Ø¨DÑûXÔÃrâ½ËòKrMWìz¢ûdÑ©°iëRÈu¹÷sf55r4aÒ¨Óî«rcú¼Ö7ÃÊQñbyrÄ°ÜSÕHÈóäæCüg²ªhÂ©ÿáQÑ´«¥ßYCö²';
    
    /**
     * Duration of the token. Expires in 30 days.
     */
    export const DURATION = '30d';
}
