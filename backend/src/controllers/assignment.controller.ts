import type { Request, Response } from "express";

import mongoose from "mongoose";

import { AssignmentModel } from "../models/assignment.model.js";

import { assignmentQueue } from "../queues/assignment.queue.js";

import { createAssignmentSchema } from "../schemas/assignment.schema.js";

import cloudinary from "../lib/cloudinary.js";

import { extractTextFromFile } from "../services/file.service.js";

export const generateAssignment = async (req: Request, res: Response) => {
  try {
    if (typeof req.body.questionCount === "string") {
      req.body.questionCount = Number(req.body.questionCount);
    }

    if (typeof req.body.totalMarks === "string") {
      req.body.totalMarks = Number(req.body.totalMarks);
    }

    if (typeof req.body.questionTypes === "string") {
      req.body.questionTypes = JSON.parse(req.body.questionTypes);
    }

    const validatedData = createAssignmentSchema.parse(req.body);

    let uploadedFileUrl = "";

    let uploadedFileName = "";

    let uploadedFileType = "";

    let uploadedFileMimeType = "";

    let uploadedFileSize = 0;

    let extractedText = "";
    const file = req.file;
    if (file) {
      extractedText = await extractTextFromFile(
        file.buffer,

        file.mimetype,
      );

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",

              folder: "veda-ai-uploads",
            },

            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )

          .end(file.buffer);
      });

      uploadedFileUrl = uploadResult.secure_url;

      uploadedFileName = file.originalname;

      uploadedFileType = file.mimetype.includes("pdf") ? "pdf" : "txt";

      uploadedFileMimeType = file.mimetype;

      uploadedFileSize = file.size;
    }

    const assignment = await AssignmentModel.create({
      ...validatedData,

      uploadedFileUrl,

      uploadedFileName,

      uploadedFileType,

      uploadedFileMimeType,

      uploadedFileSize,

      extractedText,

      status: "queued",

      createdBy: req.user?._id,
    } as any);

    await assignmentQueue.add(
      "generate-assignment",

      {
        assignmentId: assignment._id,
      },
    );

    res.status(201).json({
      success: true,

      message: "Assignment queued successfully",

      assignmentId: assignment._id,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const assignmentId = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({
        success: false,

        message: "Invalid assignment ID format",
      });
    }

    const assignment = await AssignmentModel.findById(assignmentId)

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

export const getAssignments = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const assignments = await AssignmentModel.find({
      createdBy: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};