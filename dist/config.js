"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, ENV, POSTGRS_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, BCRYPT_PASSWORD, SALT_ROUNDS, } = process.env;
exports.default = {
    port: PORT,
    host: POSTGRS_HOST,
    dbport: POSTGRES_PORT,
    database: ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    papper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
};
