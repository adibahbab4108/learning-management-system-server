import { Router } from "express";
import {
  createUser,
  getUserDetails,
  updateRoleToEducator,
} from "../controllers/user.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";
const userRouter = Router();

// /api/v1/users
userRouter.get("/", (req, res) => res.send({ title: "GET all users" }));
userRouter.get("/:email", getUserDetails);
userRouter.post("/google-login", verifyFirebaseToken, createUser);
userRouter.put("/:id", (req, res) => res.send({ title: "Update user by ID" }));
userRouter.patch("/:email/update-role", updateRoleToEducator);
userRouter.delete("/:id", (req, res) => res.send({ title: "Delete users" }));

export default userRouter;
