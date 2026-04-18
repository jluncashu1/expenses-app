import { Request, Response } from "express"
import { hashPassword } from "../utils/hash.js";
import { db } from "../db/index.js";
import { users } from "../db/schemas/user.schema.js";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const hashed = await hashPassword(password);

        const user = await db
            .insert(users)
            .values({
                email,
                password: hashed
            })
            .returning();

        res.status(201).json(user[0]);
    } catch (err) {
        res.status(500).json({ error: "Registration failed"})
    }
}