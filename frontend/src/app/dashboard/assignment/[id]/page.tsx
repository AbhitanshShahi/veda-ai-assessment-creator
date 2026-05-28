"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { socket } from "@/lib/socket";
import PaperFailed from "@/components/paper/paper-failed";
import PaperHeader from "@/components/paper/paper-header";
import PaperLoading from "@/components/paper/paper-loading";
import PaperSection from "@/components/paper/paper-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AssignmentPaperPage() {
  const params = useParams();

  const id = params.id as string;

  const paperRef = useRef<HTMLDivElement | null>(null);

  const [assignment, setAssignment] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState(0);

  const [step, setStep] = useState("queued");

  const handlePrint = useReactToPrint({
    contentRef: paperRef,
    documentTitle: assignment?.title || "Assignment",
  });

  const fetchAssignment = async () => {
    try {
      const response = await axios.get(`${API_URL}/assignments/${id}`, {
        withCredentials: true,
      });

      setAssignment(response.data.assignment);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("join-assessment-room", id);
    });

    socket.on("generation-progress", (data) => {
      setProgress(data.progress);

      setStep(data.step);
    });

    socket.on("generation-completed", async () => {
      toast.success("Assignment generated");

      await fetchAssignment();
    });

    socket.on("generation-failed", async () => {
      toast.error("Generation failed");

      await fetchAssignment();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return <PaperLoading progress={progress} step={step} />;
  }

  if (assignment?.status === "failed") {
    return <PaperFailed error={assignment?.generationError} />;
  }

  if (assignment?.status !== "completed") {
    return <PaperLoading progress={progress} step={step} />;
  }

  const generatedPaper = assignment.generatedPaperId;

  return (
    <div className="mx-auto max-w-4xl py-6">
      <Card className="print-hidden mb-5 overflow-hidden rounded-[28px] border-0 bg-[#111111] text-white shadow-xl">
        <div className="p-6">
          <div className="max-w-3xl">
            <h2 className="text-[20px] font-semibold leading-8 tracking-[-0.02em]">
              Here is your AI-generated question paper based on the uploaded
              syllabus and requested question configuration.
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Generated for{" "}
              <span className="font-medium text-white">
                {assignment.createdBy?.name || "Teacher"}
              </span>
            </p>
          </div>

          <div className="mt-6">
            <Button
              onClick={handlePrint}
              className="h-11 rounded-full bg-white px-5 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-gray-200"
            >
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
          </div>
        </div>
      </Card>

      <div className="bg-white p-6">
        <div
          ref={paperRef}
          className="mx-auto min-h-screen max-w-[210mm] bg-white p-10 text-black"
        >
          <PaperHeader
            title={assignment.title}
            subject={assignment.subject}
            totalMarks={assignment.totalMarks}
          />

          <div className="mt-10">
            {generatedPaper.sections.map((section: any, index: number) => (
              <PaperSection key={index} section={section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
