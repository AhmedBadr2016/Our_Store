import express, { Request, Response } from "express";
import order_model from "../models/order_methods";
import { orders } from "../types/orders";

const our_order_main = new order_model();

const index = async (_req: Request, res: Response) => {
  const output_all = await our_order_main.get_all_orders();
  res.json(output_all);
};

const show = async (req: Request, res: Response) => {
  const output_one = await our_order_main.get_specific_order(req.body.id);
  res.json(output_one);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: orders = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    if (order.status == "active") {
      const new_order = await our_order_main.create(order);
      res.json(new_order);
    } else if (order.status == "complete") {
      const new_order = await our_order_main.create(order);
      res.json(new_order);
    } else {
      res.status(400);
      res.json(Error);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: orders = {
      id: req.body.id,
      status: req.body.status,
      user_id: req.body.id,
    };

    const new_order = await our_order_main.update_order(order);
    res.json(new_order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await our_order_main.delete(req.params.id);
  res.json(deleted);
};

const orders_handler = (app: express.Application): void => {
  app.get("/user/sign_in/orders", index);

  app.get("/user/sign_in/order/:id", show);

  app.post("/user/sign_in/order", create);

  app.patch("/user/sign_in/order/edit/:id", update);

  app.delete("/user/sign_in/order/delete/:id", destroy);
};
export default orders_handler;
