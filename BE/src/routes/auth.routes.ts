import { Router } from "express";
import { register } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.get('/register', (req, res) => {
    res.json('vasok')
})
authRoutes.post('/register', register);

export default authRoutes;
