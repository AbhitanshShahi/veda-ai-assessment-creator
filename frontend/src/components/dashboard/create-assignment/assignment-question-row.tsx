"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  id: number;

  type: string;

  questions: number;

  marks: number;

  difficulty: string;

  onTypeChange: (id: number, value: string) => void;

  onIncrementQuestions: (id: number) => void;

  onDecrementQuestions: (id: number) => void;

  onIncrementMarks: (id: number) => void;

  onDecrementMarks: (id: number) => void;

  onDelete: (id: number) => void;

  onDifficultyChange: (id: number, value: string) => void;
}

export default function AssignmentQuestionRow({
  id,
  type,
  questions,
  marks,
  difficulty,
  onTypeChange,
  onIncrementQuestions,
  onDecrementQuestions,
  onIncrementMarks,
  onDecrementMarks,
  onDelete,
  onDifficultyChange,
}: Props) {
  return (
    <div className="grid grid-cols-[1fr_120px_100px_100px_36px] items-center gap-3">
      <Select value={type} onValueChange={(value) => onTypeChange(id, value)}>
        <SelectTrigger className="h-11 rounded-2xl">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="mcq">MCQ</SelectItem>

          <SelectItem value="short-answer">Short Questions</SelectItem>

          <SelectItem value="long-answer">Long Questions</SelectItem>

          <SelectItem value="true-false">True / False</SelectItem>

          <SelectItem value="diagram">Diagram Based Questions</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={difficulty}
        onValueChange={(value) => onDifficultyChange(id, value)}
      >
        <SelectTrigger className="h-11 rounded-2xl">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>

          <SelectItem value="medium">Medium</SelectItem>

          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex h-11 items-center justify-between rounded-2xl border bg-background px-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded-full"
          onClick={() => onDecrementQuestions(id)}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="text-sm font-semibold">{questions}</span>

        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded-full"
          onClick={() => onIncrementQuestions(id)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex h-11 items-center justify-between rounded-2xl border bg-background px-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded-full"
          onClick={() => onDecrementMarks(id)}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="text-sm font-semibold">{marks}</span>

        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded-full"
          onClick={() => onIncrementMarks(id)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={() => onDelete(id)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
