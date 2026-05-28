import { GeneratedSection } from "@/types/generated-paper";

import PaperQuestion from "./paper-question";

interface Props {
  section: GeneratedSection;
}

export default function PaperSection({ section }: Props) {
  return (
    <div className="mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{section.title}</h2>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">{section.title}</h3>

        <p className="mt-1 text-sm italic text-muted-foreground">
          {section.instruction}
        </p>
      </div>

      <div className="mt-6">
        {section.questions.map((question, index) => (
          <PaperQuestion key={index} question={question} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
