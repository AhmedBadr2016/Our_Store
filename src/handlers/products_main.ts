import express, { Request, Response } from "express";
import product_model from "../models/product_methods";
import { products } from "../types/products";

const our_product_main = new product_model();

const index = async (_req: Request, res: Response) => {
  const output_all = await our_product_main.get_all_products();
  res.json(output_all);
};

const show = async (req: Request, res: Response) => {
  const output_one = await our_product_main.get_specific_product(req.body.id);
  res.json(output_one);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: products = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };

    const new_product = await our_product_main.create(product);
    res.json(new_product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product: products = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };

    const new_product = await our_product_main.update_product(product);
    res.json(new_product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await our_product_main.delete(req.params.id);
  res.json(deleted);
};

const products_handler = (app: express.Application): void => {
  app.get("/products", index);

  app.get("/product/:id", show);

  app.post("/product/create", create);

  app.patch("/product/edit/:id", update);

  app.delete("/product/delete/:id", destroy);
};
export default products_handler;
