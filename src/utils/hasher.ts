import * as argon2 from 'argon2';

/**
 * Hashes passwords and verifies them
 */
class Hasher {

    /**
     * Secret input that gets added to the password before it's hashed
     */
    // tslint:disable-next-line
    private readonly PEPPER = 'cîLx9ÓEóüVâtXÛÌÙ6w¨¢9k·fñ§ê´vMQ4FÎÑ3Ã¶XÜôcÒÿ×²pGÀ·µ®T¯²¤ú9î8ï«hDëw98ÙGºéòRUK¶5¡¶xcýL½J¨ý¬Æ6uÇAC±ã±p¾«ÛÝÚrg«GEÆs±LVQkjRnY³øBÉri»Ò';

    /**
     * Settings to use when hashing a password
     */
    private readonly ARGON2_SETTINGS = {
        type: argon2.argon2id, // Recommended default from IETF draft
        memoryCost: 2 ** 16, // Uses 16 MB of memory. TODO: maybe change later?
    };

    /**
     * Wraps argon2 with recommended settings
     * @param password Password to hash
     */
    public async hash(password: string) {
        const pepperedPassword = password + this.PEPPER;
        return argon2.hash(pepperedPassword, this.ARGON2_SETTINGS);
    }

    /**
     * Checks if the user has the correct password
     * @param hash Hash to check password against
     * @param password Plaintext password that gets checked
     */
    public async verify(hash: string, password: string) {
        const pepperedPassword = password + this.PEPPER;
        return argon2.verify(hash, pepperedPassword);
    }
}

export const hasher = new Hasher();
