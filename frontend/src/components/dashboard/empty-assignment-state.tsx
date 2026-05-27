"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyAssignmentState() {
  const router = useRouter();

  return (
    <div className="flex min-h-[78vh] items-center justify-center px-4">
      <div className="flex max-w-xl flex-col items-center text-center">
        
        <img
          src="/assets/no-assignments.png"
          alt="No assignments"
          className="h-56 w-56 object-contain"
        />

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          No assignments yet
        </h2>

        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          Create your first assignment to start collecting and grading
          student submissions. You can set up rubrics, define marking
          criteria, and let AI assist with grading.
        </p>

        <button
          onClick={() =>
            router.push("/dashboard/assignments/create")
          }
          className="mt-7 flex h-11 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white transition-all hover:bg-black/90"
        >
          <Plus className="h-4 w-4" />
          Create Your First Assignment
        </button>
      </div>
    </div>
  );
}