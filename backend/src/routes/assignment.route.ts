import { Router } from "express";
import { generateAssignment, getAssignmentById } from "../controllers/assignment.controller.js";

const router = Router();

router.post("/generate", generateAssignment);
router.get("/:id", getAssignmentById);

export default router;