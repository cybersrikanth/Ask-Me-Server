const bcrypt = require("bcrypt");

const ROUND = process.env.SALT_ROUND || 10;

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
