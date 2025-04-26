import { Router } from "express";
import { updateRoleToEducator } from "../controllers/educatorController";
// or import express from "express";
// and const eudcatorRouter = express.Router();
const eudcatorRouter = Router();

//User to Educator Role
eudcatorRouter.get('/update-role',updateRoleToEducator)

export default eudcatorRouter