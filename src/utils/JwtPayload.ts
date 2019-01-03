/**
 * Data that gets stored in the JWT
 */
export default class JwtPayload {
    /**
     * Secret that the JWT gets encrypted with
     */
    // tslint:disable-next-line
    public static readonly TOKEN_SECRET = 'fïoîGsÒÇïÔ£Ó¯ã9ÂVçò¤9ëkeÍ¥aì®gÛcôÙv§m¨Ec«Ø¨DÑûXÔÃrâ½ËòKrMWìz¢ûdÑ©°iëRÈu¹÷sf55r4aÒ¨Óî«rcú¼Ö7ÃÊQñbyrÄ°ÜSÕHÈóäæCüg²ªhÂ©ÿáQÑ´«¥ßYCö²';    

    private _username: string;

    constructor(username: string) {
        this._username = username;
    }

    get username(): string {
        return this._username;
    }
}
