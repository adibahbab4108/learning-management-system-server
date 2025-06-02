import { Router } from "express";
import { addCourse } from "../controllers/educator.controller.js";

const educatorRouter = Router();

educatorRouter.post("/add-course", addCourse);

export default educatorRouter