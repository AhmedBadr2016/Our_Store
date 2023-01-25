"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class order_product_model {
    // the order model
    // first create item in the database!
    async create(op) {
        try {
            // open connection with Client
            const Connection = await database_1.default.connect();
            const sql = "INSERT INTO order_products (quantity) VALUES ($1) RETURNING *";
            // run query
            const output = await Connection.query(sql, [op.quantity]);
            // release the connection to database
            Connection.release();
            // retunrn the order
            return output.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create (${op.quantity}): ${err}`);
        }
    }
    // get all orders
    async get_all_order_products() {
        try {
            // open connection with Client
            const Connection = await database_1.default.connect();
            const sql = "SELECT * FROM order_products";
            // run query
            const output = await Connection.query(sql);
            // release the connection to database
            Connection.release();
            // retunrn the order
            return output.rows;
        }
        catch (err) {
            throw new Error(`Could not get all the order_products: ${err}`);
        }
    }
    // get specific order
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async get_specific_order_product(order_id) {
        try {
            // open connection with Client
            const Connection = await database_1.default.connect();
            const sql = "SELECT * FROM order_products where order_id=($1)";
            // run query
            const output = await Connection.query(sql, [order_id]);
            const op = output.rows;
            // release the connection to database
            Connection.release();
            // retunrn the order
            if (output.rows.length) {
                return op;
            }
            return null;
        }
        catch (err) {
            throw new Error(`Could not get all the orders: ${err}`);
        }
    }
    // update orders
    async update_order_product(op) {
        try {
            // open connection with Client
            const Connection = await database_1.default.connect();
            const sql = "UPDATE order_products SET quantity=($2) WHERE id=($1) RETURNING *";
            // run query
            const output = await Connection.query(sql, [op.id, op.quantity]);
            // release the connection to database
            Connection.release();
            // retunrn the order
            return output.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create (${op.quantity}): ${err}`);
        }
    }
    //delete order
    async delete(id) {
        try {
            const Connection = await database_1.default.connect();
            const sql = "DELETE FROM order_products WHERE id= ($1) ";
            const output = await Connection.query(sql, [id]);
            const order_product = output.rows[0];
            Connection.release();
            return order_product;
        }
        catch (err) {
            throw new Error(`Could not delete the order of the product ${id}. Error: ${err}`);
        }
    }
    async addProduct(op) {
        // get order to see if it is open
        /*
        try {
          const conn = await Client.connect();
    
          const ordersql = "SELECT * FROM orders WHERE id=($1)";
    
          const result = await conn.query(ordersql, [op.order_id]);
    
          const order = result.rows[0];
    
          if (order.status !== "active" || order.status !== "completed") {
            throw new Error(
              `Could not add product ${op.product_id} to order ${op.order_id} because order status is ${order.status}`
            );
          }
    
          conn.release();
        } catch (err) {
          throw new Error(`${err}`);
        }
    */
        try {
            const sql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES( ($1) , ($2) , ($3) ) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                op.order_id,
                op.product_id,
                op.quantity,
            ]);
            const order = result.rows[0];
            /*
            if (order.status !== "active" || order.status !== "completed") {
              throw new Error(
                `Could not add product ${op.product_id} to order ${op.order_id} because order status is ${order.status}`
              );
            }
      */
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${op.order_id} to order ${op.product_id}: ${err}`);
        }
    }
}
exports.default = order_product_model;
