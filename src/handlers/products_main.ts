import express, { Request, Response } from "express";
import product_model from "../models/product_methods";
import { products } from "../types/products";
import jwt from "jsonwebtoken";
import config from "../config";

const our_product_main = new product_model();

const index = async (_req: Request, res: Response) => {
  const new_product = await our_product_main.get_all_products();
  if (new_product !== null) {
    // res.json(new_product);
    const token = jwt.sign(
      { new_product },
      config.tokensecret as unknown as string
    );
    return res.json({
      status: 200,
      data: { ...new_product, token },
      message: `product authenticated successfully`,
    });
  } else {
    res
      .status(404)
      .send(
        `The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
      );
    console.log(
      `The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
    );
  }
};

const show = async (req: Request, res: Response) => {
  const new_product = await our_product_main.get_specific_product(req.body.id);
  if (new_product !== null) {
    // res.json(new_product);
    const token = jwt.sign(
      { new_product },
      config.tokensecret as unknown as string
    );
    return res.json({
      status: 200,
      data: { ...new_product, token },
      message: `product authenticated successfully`,
    });
  } else {
    res
      .status(404)
      .send(
        `The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
      );
    console.log(
      `The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
    );
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: products = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };

    const new_product = await our_product_main.create(product);
    if (new_product !== null) {
      // res.json(new_product);
      const token = jwt.sign(
        { new_product },
        config.tokensecret as unknown as string
      );
      return res.json({
        status: 200,
        data: { ...new_product, token },
        message: `product authenticated successfully`,
      });
    } else {
      res
        .status(404)
        .send(
          `The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
        );
      console.log(
        `The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
      );
    }
  } catch (err) {
    res.status(400).send(`Token required- name and price`);
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
    if (new_product !== null) {
      // res.json(new_product);
      const token = jwt.sign(
        { new_product },
        config.tokensecret as unknown as string
      );
      return res.json({
        status: 200,
        data: { ...new_product, token },
        message: `product authenticated successfully`,
      });
    } else {
      res
        .status(404)
        .send(
          `The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
        );
      console.log(
        `The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
      );
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const new_product = await our_product_main.delete(req.params.id);
  if (new_product !== null) {
    // res.json(new_product);
    const token = jwt.sign(
      { new_product },
      config.tokensecret as unknown as string
    );
    return res.json({
      status: 200,
      data: { ...new_product, token },
      message: `product authenticated successfully`,
    });
  } else {
    res
      .status(404)
      .send(
        `The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
      );
    console.log(
      `The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
    );
  }
};

const products_handler = (app: express.Application): void => {
  app.get("/products", index);

  app.get("/product/:id", show);

  app.post("/product/create", create);

  app.patch("/product/edit/:id", update);

  app.delete("/product/delete/:id", destroy);
};
export default products_handler;
