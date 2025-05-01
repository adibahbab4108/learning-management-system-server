import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ title: "GET all users" }));
userRouter.get("/:id", (req, res) => res.send({ title: "GET user details" }));
userRouter.post("/google-login", createUser);
userRouter.put("/:id", (req, res) => res.send({ title: "Update user by ID" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "Delete users" }));

export default userRouter;
