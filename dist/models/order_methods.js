"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class order_model {
    // the order model
    // first create item in the database!
    async create(o) {
        try {
            // open connection with Client
            const Connection = await database_1.default.connect();
            const sql = "INSERT INTO orders (status , user_id) VALUES ( ($1) , ($2) ) RETURNING *";
            // run query
            const output = await Connection.query(sql, [o.status, o.user_id]);
            const order = output.rows[0];
            // release the connection to database
            Connection.release();
            // retunrn the order
            return order;
        }
        catch (err) {
            throw new Error(`Could not create (${o.status}) for user (${o.user_id}): ${err}`);
        }
    }
    // get all orders
    async get_all_orders() {
        try {
            // open connection with Client
            const Connection = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            // run query
            const output = await Connection.query(sql);
            // release the connection to database
            Connection.release();
            // retunrn the order
            return output.rows;
        }
        catch (err) {
            throw new Error(`Could not get all the orders: ${err}`);
        }
    }
    // get specific order
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async get_specific_order(id) {
        try {
            // open connection with Client
            const Connection = await database_1.default.connect();
            const sql = "SELECT * FROM orders where id=($1)";
            // run query
            const output = await Connection.query(sql, [id]);
            // release the connection to database
            Connection.release();
            // retunrn the order
            return output.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get all the orders: ${err}`);
        }
    }
    // update orders
    async update_order(o) {
        try {
            // open connection with Client
            const Connection = await database_1.default.connect();
            const sql = "UPDATE orders SET status=($2) WHERE id=($1) RETURNING *";
            // run query
            const output = await Connection.query(sql, [o.id, o.status]);
            // release the connection to database
            Connection.release();
            // retunrn the order
            return output.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create (${o.status}): ${err}`);
        }
    }
    //delete order
    async delete(id) {
        try {
            const Connection = await database_1.default.connect();
            const sql = "DELETE FROM orders WHERE id= ($1) ";
            const output = await Connection.query(sql, [id]);
            const order = output.rows[0];
            Connection.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete the order ${id}. Error: ${err}`);
        }
    }
}
exports.default = order_model;
