import { eq } from "drizzle-orm";
import { database, users } from "../database";
import type User from "../models/User";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import "dotenv/config";

export default class AuthController {
  login = async (req: Request, res: Response) => {
    try {
      const userRequestData = req.body as User;
      const userData = await this.getUserByEmail(userRequestData.email);

      if (!userData) {
        throw new Error("User not found");
      }

      const passwordsMatch = await compare(
        userRequestData.password,
        userData.password
      );

      if (!passwordsMatch) {
        throw new Error("Invalid password");
      }

      const user = {
        id: userData.id!,
        name: userData.name,
        email: userData.email,
      };

      const token = this.generateUserJWT(user);

      res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
      res.status(500).json({ error });
      console.log({ error });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { password, ...user } = req.body as User;
      const userAlreadyExists = await this.getUserByEmail(user.email);

      if (userAlreadyExists) {
        throw new Error("User already exists");
      }

      const hashedPassword = await hash(password, 10);

      const createdUser = await database
        .insert(users)
        .values({ password: hashedPassword, ...user })
        .returning()
        .get();

      const token = this.generateUserJWT({
        id: createdUser.id!,
        name: user.name,
        email: user.email,
      });

      res.status(200).json({ message: "User created successfully", token });
    } catch (error) {
      res.status(500).json({ error });
      console.log({ error });
    }
  };

  private getUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
      const queryResult = await database
        .select()
        .from(users)
        .where(eq(users.email, email))
        .get();

      return queryResult;
    } catch (error) {
      console.log(error);
    }
  };

  private generateUserJWT = (user: {
    id: number;
    name: string;
    email: string;
  }) => {
    console.log("generating token", user)

    const JWT_SECRET = process.env.JWT_SECRET!;
    const expiresIn = 60 * 60 * 24 * 30; // 30 days

    const token = jwt.sign(user, JWT_SECRET, { expiresIn });

    return token;
  };
}
