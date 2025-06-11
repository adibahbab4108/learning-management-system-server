import { Router } from "express";
import {
  addCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
} from "../controllers/educator.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";

const educatorRouter = Router();
// app.use("/api/v1/educator", educatorRouter);

educatorRouter.post("/add-course", addCourse);
educatorRouter.get("/courses", verifyFirebaseToken, getEducatorCourses); // replace middleware with protectEducator later
educatorRouter.get("/dashboard", verifyFirebaseToken, educatorDashboardData);
educatorRouter.get("/enrolled-students", verifyFirebaseToken, getEnrolledStudentsData);

export default educatorRouter;
