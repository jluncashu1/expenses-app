import { Request, Response } from "express"
import { comparePassword, hashPassword } from "../utils/hash.js";
import { db } from "../db/index.js";
import { users } from "../db/schemas/user.schema.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!"
            })
        }

        const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

        if (existingUser.length > 0) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashed = await hashPassword(password);

        const newUser = await db
            .insert(users)
            .values({
                email,
                password: hashed
            })
            .returning();

        return res.status(201).json({
            message: "User created",
            user: {
                id: newUser[0].id,
                email: newUser[0].email,
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Registration failed"})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!"
            })
        }

        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if(user.length === 0) {
            return res.status(400).json({
                message: "Inexisting user"
            })
        }

        const foundUser = user[0];

        const isMatch = await comparePassword(
            password,
            foundUser.password
        );

        if(!isMatch) {
            return res.status(400).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign(
            {
                userId: foundUser.id,
                email: foundUser.email,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        )

        return res.json({
            message: "Login successful",
            token
        })
    
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}