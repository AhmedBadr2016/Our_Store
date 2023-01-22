import Client from "../database";
import { users } from "../types/users";
import config from "../config";
import bcrypt from "bcrypt";

const hash_password = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.papper}`, salt);
};

export class userStore {
  // view all users
  async index(): Promise<users[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  // view user
  async show(email: string): Promise<users> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE email = ($1)";

      const result = await conn.query(sql, [email]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${email}. Error: ${err}`);
    }
  }

  // create user
  async create(u: users): Promise<users> {
    try {
      console.log("above the inserting of user");
      const sql =
        "INSERT INTO users (first_name, last_name, email, username, password) VALUES ( ($1) , ($2) , ($3) ,($4), ($5)) RETURNING *  ";
      const conn = await Client.connect();

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
    } catch (err) {
      throw new Error(`Could not add new user ${u.email}. Error: ${err}`);
    }
  }

  // update user
  async update(u: users): Promise<users> {
    try {
      const sql =
        "UPDATE users SET first_name= ($1) , last_name= ($2) , email= ($3) , username= ($4), password= ($5) WHERE email= ($3) ";
      const conn = await Client.connect();

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
    } catch (err) {
      throw new Error(`Could not update new user ${u.email}. Error: ${err}`);
    }
  }

  // delete user
  async delete(email: string): Promise<users> {
    try {
      const conn = await Client.connect();
      //console.log("before delete sql");
      const sql = "DELETE FROM users WHERE email = ($1) ";
      console.log(sql);

      const result = await conn.query(sql, [email]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${email}. Error: ${err}`);
    }
  }

  async authenticate(email: string, password: string): Promise<users | null> {
    const conn = await Client.connect();
    const sql = "SELECT password FROM users WHERE username= ($1) ";

    const result = await conn.query(sql, [email, hash_password(password)]);

    console.log(`${password}${config.papper}`);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(`${password}${config.papper}`, user.password)) {
        return user;
      }
    }
    return null;
  }
}
