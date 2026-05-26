import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import redisClient from "./lib/redis.js";
import { assignmentWorker } from "./workers/assignment.worker.js";
import assignmentRouter from "./routes/assignment.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 8000;

// Initialize Socket.io
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDB();

app.use("/api/auth", authRouter);
app.use("/api/assignments", assignmentRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running smoothly",
  });
});

io.on("connection", (socket) => {
  console.log(`📡 Client connected: ${socket.id}`);

  socket.on("join-assessment-room", (assessmentId: string) => {
    socket.join(assessmentId);
    console.log(`👥 Client ${socket.id} joined room: ${assessmentId}`);
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
