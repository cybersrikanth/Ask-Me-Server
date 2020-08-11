require("dotenv").config();

const DB_URI = process.env.DB_URI;
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const SECRET = process.env.SECRET || "secret";
const JWT_EXP = process.env.EXP || "2d";
const PORT = process.env.PORT || 50000;
const TEST = process.env.TEST || false;

module.exports = { DB_URI, SALT_ROUNDS, SECRET, JWT_EXP, PORT, TEST };
