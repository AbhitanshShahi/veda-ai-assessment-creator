export type GeneratedQuestion = {
  question: string;

  difficulty: "easy" | "medium" | "hard";

  marks: number;

  type: "mcq" | "short-answer" | "long-answer" | "true-false" | "diagram";

  options?: string[];

  answer?: string;
};

export type GeneratedSection = {
  title: string;

  instruction: string;

  questions: GeneratedQuestion[];
};

export type GeneratedPaper = {
  _id: string;

  sections: GeneratedSection[];
};
