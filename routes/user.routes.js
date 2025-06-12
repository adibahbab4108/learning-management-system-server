import { Router } from "express";
import {
  createUser,
  getUserDetails,
  purchaseCourse,
  updateRoleToEducator,
  userEnrolledCourses,
} from "../controllers/user.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";
const userRouter = Router();

// /api/v1/users
userRouter.get("/", (req, res) => res.send({ title: "GET all users" }));
userRouter.post("/google-login", verifyFirebaseToken, createUser);
userRouter.get("/user-details", verifyFirebaseToken, getUserDetails);
userRouter.get("/enrolled-courses", verifyFirebaseToken, userEnrolledCourses);
userRouter.post("/purchase", verifyFirebaseToken, purchaseCourse);

userRouter.put("/:id", (req, res) => res.send({ title: "Update user by ID" }));
userRouter.patch("/:email/update-role", updateRoleToEducator);
userRouter.delete("/:id", (req, res) => res.send({ title: "Delete users" }));

export default userRouter;
