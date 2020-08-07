const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET || "secret";
const EXP = process.env.EXP || "1d";

class TokenProvider {
    static getSecret(user) {
        return `${SECRET}${user.password}`;
    }

    static async getToken(user) {
        const NEW_SECRET = TokenProvider.getSecret(user);
        const token = await jwt.sign(
            {
                id: user._id,
                session: user.session,
            },
            NEW_SECRET,
            {
                expiresIn: EXP,
            }
        );

        return token;
    }

    static async verifyToken(token, user) {
        const NEW_SECRET = TokenProvider.getSecret(user);
        const decoded = await jwt.verify(token, NEW_SECRET);
        return decoded;
    }

    static async decodeToken(token) {
        const decoded = await jwt.decode(token);
        return decoded;
    }
}

module.exports = TokenProvider;
