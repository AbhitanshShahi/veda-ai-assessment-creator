interface Props {
  error?: string;
}

export default function PaperFailed({ error }: Props) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-lg rounded-[32px] border bg-background p-8 text-center shadow-sm">
        <h2 className="text-3xl font-bold text-red-500">Generation Failed</h2>

        <p className="mt-3 text-muted-foreground">
          {error || "Something went wrong while generating the paper."}
        </p>
      </div>
    </div>
  );
}
