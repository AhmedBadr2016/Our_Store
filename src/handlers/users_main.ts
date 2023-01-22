import express, { Request, Response } from "express";
import { userStore } from "../models/user_methods";
import { users } from "../types/users";

const our_user_main = new userStore();

const users_handler = (app: express.Application): void => {
  app.get("/users", index);

  app.get("/user/:email", show);
  console.log("above the create user");
  app.post("/user/sign_up", create);
  app.post("/user/sign_in", authenticate);

  app.patch("/user/edit/:email", update);

  app.delete("/user/delete/:email", destroy);
};

const index = async (_req: Request, res: Response) => {
  const output_all = await our_user_main.index();
  res.json(output_all);
};

const show = async (req: Request, res: Response) => {
  const output_one = await our_user_main.show(req.params.email);
  res.json(output_one);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: users = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    console.log("Sign up new user");
    const new_user = await our_user_main.create(user);
    res.json(new_user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    console.log("sign in a Client");
    const new_user = await our_user_main.authenticate(
      req.body.email,
      req.body.password
    );
    res.json(new_user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: users = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const new_user = await our_user_main.update(user);
    res.json(new_user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await our_user_main.delete(req.params.email);
  res.json(deleted);
};

export default users_handler;
