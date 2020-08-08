const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("./environment");

const ROUND = SALT_ROUNDS;

class Hasher {
    static async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(parseInt(ROUND));
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            throw error.message;
        }
    }

    static async validatePassword(password, hashedPassword) {
        try {
            const result = await bcrypt.compare(password, hashedPassword);
            return result;
        } catch (error) {
            throw error.message;
        }
    }
}

module.exports = Hasher;
