import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../modules/user/repositories/UserRepository";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Token is required");
  }

  token = token.slice(7, token.length) as string;

  try {
    const decoded = jwt.verify(
      token,
      JSON.stringify(process.env.JWT_SECRET)
    ) as {
      email: string;
    };
    const userRepository = new UserRepository();
    const user = await userRepository.findOne({
      where: { email: decoded.email },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;

    next();
  } catch (e) {
    return res.status(401).send("Token is invalid");
  }
};

export { auth };