import { GeneratedQuestion } from "@/types/generated-paper";

interface Props {
  question: GeneratedQuestion;

  index: number;
}

export default function PaperQuestion({ question, index }: Props) {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-[15px] leading-7">
            {index}. [{question.difficulty}] {question.question}
          </p>
        </div>

        <p className="whitespace-nowrap text-sm font-medium">
          [{question.marks} Marks]
        </p>
      </div>

      {question.type === "mcq" && question.options && (
        <div className="mt-2 ml-6 space-y-1">
          {question.options.map((option, idx) => (
            <p key={idx} className="text-sm">
              {String.fromCharCode(65 + idx)}. {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
