import { Router } from "express";
import { createProject } from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

//* All project routes need authentication

router.route("/").post(verifyJWT,createProject);


export default router