import e from "express";
import { getAllCourse, getCourseById } from "../controllers/course.controller.js";
const courseRouter = e.Router();

courseRouter.get('/all',getAllCourse)
courseRouter.get('/:id',getCourseById)

export default courseRouter;