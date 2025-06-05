import { Router } from "express";
import { addCourse, getEducatorCourses,  } from "../controllers/educator.controller.js";

const educatorRouter = Router();

educatorRouter.post("/add-course", addCourse);
educatorRouter.get("/courses",getEducatorCourses)

export default educatorRouter