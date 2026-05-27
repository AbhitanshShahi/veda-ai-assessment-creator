import { create } from "zustand";

import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
  getMe,
  type LoginData,
  type SignupData,
} from "@/services/auth.service";

interface User {
  _id: string;
  name: string;
  email: string;
  schoolName: string;
  selectedClass: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;

  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (data) => {
    try {
      set({ isLoading: true });

      const response = await signupService(data);

      set({
        user: response.user,
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoading: true });

      const response = await loginService(data);

      set({
        user: response.user,
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });

      await logoutService();

      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCurrentUser: async () => {
    try {
      const response = await getMe();

      set({
        user: response.user,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },
}));
