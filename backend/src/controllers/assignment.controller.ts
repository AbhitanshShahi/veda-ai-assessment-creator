import type { Request, Response } from "express";
import { AssignmentModel } from "../models/assignment.model.js";
import { assignmentQueue } from "../queues/assignment.queue.js";
import { createAssignmentSchema } from "../schemas/assignment.schema.js";
import {generatedPaperSchema} from "../models/generatedPaper.model.js";

export const generateAssignment = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData =
      createAssignmentSchema.parse(req.body);

    const assignment = await AssignmentModel.create({
      ...validatedData,

      uploadedFileUrl:
        validatedData.uploadedFileUrl || "",

      uploadedFileName:
        validatedData.uploadedFileName || "",

      uploadedFileType:
        validatedData.uploadedFileType,

      uploadedFileMimeType:
        validatedData.uploadedFileMimeType,

      uploadedFileSize:
        validatedData.uploadedFileSize,

      status: "queued",
    } as any);

    await assignmentQueue.add(
      "generate-assignment",
      {
        assignmentId: assignment._id,
      }
    );

    res.status(201).json({
      success: true,
      message:
        "Assignment queued successfully",

      assignmentId: assignment._id,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAssignmentById = async (
  req: Request,
  res: Response
) => {
  try {
    const assignment = await AssignmentModel
      .findById(req.params.id)
      .populate("generatedPaperId");

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};