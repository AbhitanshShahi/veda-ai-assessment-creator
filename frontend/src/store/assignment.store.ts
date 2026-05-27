import { create } from "zustand";
import axios from "axios";

interface Assignment {
  _id: string;
  title: string;
  subject: string;
  dueDate: string;
  questionCount: number;
  totalMarks: number;
  difficulty: "easy" | "medium" | "hard";
  questionTypes: string[];
  additionalInstructions: string;
  uploadedFileUrl?: string;
  uploadedFileName?: string;
  status: string;
  generatedPaperId?: string;
  createdAt: string;
}

interface AssignmentStore {
  assignments: Assignment[];

  isLoading: boolean;

  fetchAssignments: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignments: [],

  isLoading: false,

  fetchAssignments: async () => {
    try {
      set({ isLoading: true });

      const response = await axios.get(`${API_URL}/assignments`, {
        withCredentials: true,
      });

      set({
        assignments: response.data.assignments,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch assignments:", error);

      set({
        assignments: [],
        isLoading: false,
      });
    }
  },
}));
