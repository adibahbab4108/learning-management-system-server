import { Router } from "express";
import {
  createUser,
  getUserDetails,
  updateRoleToEducator,
} from "../controllers/user.controller.js";
const userRouter = Router();

// /api/v1/users
userRouter.get("/", (req, res) => res.send({ title: "GET all users" }));
userRouter.get("/:email", (req, res) => getUserDetails);
userRouter.post("/google-login", createUser);
userRouter.put("/:id", (req, res) => res.send({ title: "Update user by ID" }));
userRouter.patch("/:email/update-role", updateRoleToEducator);
userRouter.delete("/:id", (req, res) => res.send({ title: "Delete users" }));

export default userRouter;
