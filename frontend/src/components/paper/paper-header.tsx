interface Props {
  title: string;

  subject: string;

  totalMarks: number;
}

export default function PaperHeader({ title, subject, totalMarks }: Props) {
  return (
    <div className="border-b border-black pb-6 text-center">
      <h1 className="text-3xl font-bold">Delhi Public School</h1>

      <p className="mt-2 text-2xl font-semibold">{title}</p>

      <p className="mt-2 text-lg">Subject: {subject}</p>

      <div className="mt-6 flex items-center justify-between text-sm font-medium">
        <p>Time Allowed: 45 minutes</p>

        <p>Maximum Marks: {totalMarks}</p>
      </div>

      <div className="mt-6 text-left">
        <p className="text-sm">
          All questions are compulsory unless stated otherwise.
        </p>

        <div className="mt-5 space-y-2 text-sm">
          <p>Name: ___________________</p>

          <p>Roll Number: ___________________</p>

          <p>Section: ___________________</p>
        </div>
      </div>
    </div>
  );
}
