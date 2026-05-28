import { Router } from "express";
import {
  generateAssignment,
  getAssignmentById,
  getAssignments,
  deleteAssignment,
} from "../controllers/assignment.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";

const router = Router();

router.post(
  "/generate",
  protectRoute,
  upload.single("file"),
  generateAssignment,
);

router.get("/:id", protectRoute, getAssignmentById);

router.get("/", protectRoute, getAssignments);

router.delete("/:id", protectRoute, deleteAssignment);

export default router;
