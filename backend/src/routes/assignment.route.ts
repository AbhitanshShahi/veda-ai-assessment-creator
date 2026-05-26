import { Router } from "express";

import {
  generateAssignment,
  getAssignmentById,
} from "../controllers/assignment.controller.js";

import { upload } from "../middlewares/upload.middleware.js";

import { protectRoute } from "../middlewares/protectRoute.middleware.js";

const router = Router();

router.post("/generate",protectRoute ,upload.single("file"), generateAssignment);

router.get("/:id",protectRoute ,getAssignmentById);

export default router;
