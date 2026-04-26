import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const persAccoutRouter = Router();

persAccoutRouter.get("/", authMiddleware, (req, res) => {
  return res.json({
    message: "Protected route",
    user: req.user,
  });
});

export default persAccoutRouter;