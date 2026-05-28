"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowRight, Circle, Plus } from "lucide-react";
import AssignmentUpload from "@/components/dashboard/create-assignment/assignment-upload";
import AssignmentQuestionRow from "@/components/dashboard/create-assignment/assignment-question-row";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export default function CreateAssignmentPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");

  const [subject, setSubject] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [instructions, setInstructions] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const [rows, setRows] = useState([
    {
      id: 1,
      type: "mcq",
      questions: 5,
      marks: 1,
      difficulty: "easy",
    },
  ]);

  const totalQuestions = useMemo(() => {
    return rows.reduce((acc, row) => acc + row.questions, 0);
  }, [rows]);

  const totalMarks = useMemo(() => {
    return rows.reduce((acc, row) => acc + row.questions * row.marks, 0);
  }, [rows]);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "mcq",
        questions: 1,
        marks: 1,
        difficulty: "easy",
      },
    ]);
  };

  const deleteRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const updateRow = (id: number, key: string, value: any) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [key]: value,
            }
          : row,
      ),
    );
  };

  const handleGenerate = async () => {
    const toastId = toast.loading("Creating assignment...");

    try {
      setIsGenerating(true);

      const formData = new FormData();

      formData.append("title", title);

      formData.append("subject", subject);

      formData.append("dueDate", dueDate);

      formData.append("questionCount", String(totalQuestions));

      formData.append("totalMarks", String(totalMarks));

      formData.append("additionalInstructions", instructions);

      formData.append(
        "questionTypes",
        JSON.stringify(
          rows.map(({ id, ...rest }) => ({
            ...rest,
          })),
        ),
      );

      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post(
        `${API_URL}/assignments/generate`,
        formData,
        {
          withCredentials: true,
        },
      );

      toast.success("Assignment queued successfully", {
        id: toastId,
      });

      const assignmentId = response.data.assignmentId;

      router.push(`/dashboard/assignment/${assignmentId}`);
    } catch (error) {
      console.error(error);

      toast.error("Failed to create assignment", {
        id: toastId,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500/20">
            <Circle className="h-2.5 w-2.5 fill-green-500 text-green-500" />
          </div>

          <h1 className="text-[28px] font-bold tracking-[-0.04em]">
            Create Assignment
          </h1>
        </div>

        <p className="mt-1 pl-7 text-sm text-muted-foreground">
          Configure and generate AI-powered assessments
        </p>
      </div>

      <Card className="rounded-[32px] p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Assignment Title
            </label>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Subject</label>

            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-11 rounded-2xl"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium">Due Date</label>

          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="h-11 rounded-2xl"
          />
        </div>

        <div className="mt-6">
          <AssignmentUpload file={file} onFileChange={setFile} />
        </div>

        <div className="mt-8">
          <div className="mb-4 grid grid-cols-[1fr_120px_100px_100px_36px] gap-3">
            <h3 className="text-sm font-semibold">Question Type</h3>

            <h3 className="text-center text-sm font-semibold">Difficulty</h3>

            <h3 className="text-center text-sm font-semibold">Questions</h3>

            <h3 className="text-center text-sm font-semibold">Marks</h3>
          </div>

          <div className="space-y-3">
            {rows.map((row) => (
              <AssignmentQuestionRow
                key={row.id}
                {...row}
                difficulty={row.difficulty}
                onTypeChange={(id, value) => updateRow(id, "type", value)}
                onDifficultyChange={(id, value) =>
                  updateRow(id, "difficulty", value)
                }
                onIncrementQuestions={(id) =>
                  updateRow(id, "questions", row.questions + 1)
                }
                onDecrementQuestions={(id) =>
                  updateRow(id, "questions", Math.max(1, row.questions - 1))
                }
                onIncrementMarks={(id) => updateRow(id, "marks", row.marks + 1)}
                onDecrementMarks={(id) =>
                  updateRow(id, "marks", Math.max(1, row.marks - 1))
                }
                onDelete={deleteRow}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            className="mt-4 rounded-full"
            onClick={addRow}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Question Type
          </Button>

          <div className="mt-6 flex justify-end">
            <div className="space-y-1 text-right">
              <p className="text-sm font-semibold">
                Total Questions : {totalQuestions}
              </p>

              <p className="text-sm font-semibold">
                Total Marks : {totalMarks}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium">
            Additional Instructions
          </label>

          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Generate conceptual and application-based questions..."
            className="min-h-[120px] rounded-3xl"
          />
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="h-11 rounded-full px-6"
          >
            {isGenerating ? "Generating..." : "Generate Assignment"}

            {!isGenerating && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
