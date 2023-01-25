import express, { Request, Response } from "express";
import order_product_model from "../models/order_product_methods";
import { order_products } from "../types/order_products";

const our_order_product_main = new order_product_model();

const index = async (_req: Request, res: Response) => {
  const output_all = await our_order_product_main.get_all_order_products();
  res.json(output_all);
};

const show = async (req: Request, res: Response) => {
  const output_one = await our_order_product_main.get_specific_order_product(
    req.body.order_id
  );
  res.json(output_one);
};

const create = async (req: Request, res: Response) => {
  try {
    const order_product: order_products = {
      id: req.body.id,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };

    const new_order_product = await our_order_product_main.create(
      order_product
    );
    res.json(new_order_product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order_product: order_products = {
      id: req.body.id,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };

    const new_order_product = await our_order_product_main.update_order_product(
      order_product
    );
    res.json(new_order_product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await our_order_product_main.delete(req.params.id);
  res.json(deleted);
};

const addProduct = async (_req: Request, res: Response) => {
  const op: order_products = {
    order_id: _req.body.order_id,
    product_id: _req.body.product_id,
    quantity: _req.body.quantity,
  };
  try {
    const addedProduct = await our_order_product_main.addProduct(op);
    res.json(addedProduct);
  } catch (err) {
    res.status(400).send(`can't add products to card`);
    res.json(err);
  }
};

const order_products_handler = (app: express.Application): void => {
  app.get("/order_products", index);

  app.get("/order_product/:id", show);

  app.post("/order_product/create", create);

  app.patch("/order_product/edit/:id", update);

  app.delete("/order_product/delete/:id", destroy);

  app.post("/user/sign_in/order/:id/products", addProduct);
};
export default order_products_handler;
