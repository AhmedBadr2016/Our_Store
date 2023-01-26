import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader !== undefined) {
      const token = authorizationHeader.split(" ")[1] as unknown as string;
      console.log(token);
      jwt.verify(token, config.tokensecret as string);
      next();
    } else {
      res.status(401).send(`Not authenticated`);
    }
  } catch (error) {
    res.status(401);
  }
};
export default verifyAuthToken;
