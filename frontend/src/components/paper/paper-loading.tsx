"use client";

import { Brain, CheckCircle2, FileText, Loader2, Sparkles } from "lucide-react";

interface Props {
  progress: number;

  step: string;
}

const steps = [
  {
    key: "queued",
    label: "Queued for generation",
  },

  {
    key: "preparing-prompt",
    label: "Preparing AI instructions",
  },

  {
    key: "generating-questions",
    label: "Generating academic questions",
  },

  {
    key: "validating-response",
    label: "Validating paper structure",
  },

  {
    key: "saving-paper",
    label: "Saving final assignment",
  },

  {
    key: "completed",
    label: "Assignment completed",
  },
];

export default function PaperLoading({ progress, step }: Props) {
  const activeIndex = steps.findIndex((item) => item.key === step);

  return (
    <div className="mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center px-6 py-10">
      <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[36px] border bg-background p-10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
              <Sparkles className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-[-0.03em]">
                Generating Assignment
              </h1>

              <p className="mt-1 text-muted-foreground">
                AI is preparing your paper...
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="h-4 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-black transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {steps[activeIndex]?.label || "Generating..."}
              </p>

              <p className="text-lg font-semibold">{progress}%</p>
            </div>
          </div>

          <div className="mt-12 space-y-5">
            {steps.map((item, index) => {
              const isCompleted = index < activeIndex;

              const isActive = index === activeIndex;

              return (
                <div key={item.key} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : isActive ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <div className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                    )}
                  </div>

                  <p
                    className={`text-sm font-medium ${
                      isCompleted || isActive
                        ? "text-black"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden rounded-[36px] border bg-background p-8 shadow-xl lg:block">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6" />

            <h2 className="text-2xl font-bold">AI Processing</h2>
          </div>

          <div className="mt-8 space-y-5">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse rounded-3xl border p-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1">
                    <div className="h-4 w-3/4 rounded-full bg-neutral-200" />

                    <div className="mt-3 h-3 w-full rounded-full bg-neutral-100" />

                    <div className="mt-2 h-3 w-5/6 rounded-full bg-neutral-100" />

                    <div className="mt-2 h-3 w-2/3 rounded-full bg-neutral-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
