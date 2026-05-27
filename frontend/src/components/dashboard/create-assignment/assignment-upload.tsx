"use client";

import { Upload } from "lucide-react";

interface Props {
  file: File | null;

  onFileChange: (file: File | null) => void;
}

export default function AssignmentUpload({ file, onFileChange }: Props) {
  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center rounded-[28px] border border-dashed border-border bg-background/40 p-8 text-center transition-all duration-300 hover:border-black/20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>

        <h3 className="mt-4 text-base font-semibold">Upload Reference File</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          PDF or TXT upto 10MB
        </p>

        {file && (
          <div className="mt-4 rounded-full bg-black px-4 py-1 text-xs text-white">
            {file.name}
          </div>
        )}

        <input
          type="file"
          accept=".pdf,.txt"
          className="hidden"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];

            if (selectedFile) {
              onFileChange(selectedFile);
            }
          }}
        />
      </label>
    </div>
  );
}
