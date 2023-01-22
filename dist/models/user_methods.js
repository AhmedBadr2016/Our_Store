"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash_password = (password) => {
    const salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.papper}`, salt);
};
class userStore {
    // view all users
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    // view user
    async show(email) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users WHERE email = ($1)";
            const result = await conn.query(sql, [email]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${email}. Error: ${err}`);
        }
    }
    // create user
    async create(u) {
        try {
            console.log("above the inserting of user");
            const sql = "INSERT INTO users (first_name, last_name, email, username, password) VALUES ( ($1) , ($2) , ($3) ,($4), ($5)) RETURNING *  ";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                u.email,
                u.username,
                hash_password(u.password),
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.email}. Error: ${err}`);
        }
    }
    // update user
    async update(u) {
        try {
            const sql = "UPDATE users SET first_name= ($1) , last_name= ($2) , email= ($3) , username= ($4), password= ($5) WHERE email= ($3) ";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                u.email,
                u.username,
                hash_password(u.password),
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not update new user ${u.email}. Error: ${err}`);
        }
    }
    // delete user
    async delete(email) {
        try {
            const conn = await database_1.default.connect();
            //console.log("before delete sql");
            const sql = "DELETE FROM users WHERE email = ($1) ";
            console.log(sql);
            const result = await conn.query(sql, [email]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${email}. Error: ${err}`);
        }
    }
    async authenticate(email, password) {
        const conn = await database_1.default.connect();
        const sql = "SELECT password FROM users WHERE username= ($1) ";
        const result = await conn.query(sql, [email, hash_password(password)]);
        console.log(`${password}${config_1.default.papper}`);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(`${password}${config_1.default.papper}`, user.password)) {
                return user;
            }
        }
        return null;
    }
}
exports.userStore = userStore;
