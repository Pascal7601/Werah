import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      /**Actions */
      login: (token, user) =>
        set(() => ({
          token,
          user,
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => ({
          token: null,
          user: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const isRecruiter = () => {
  const { user } = useAuthStore.getState();
  return user?.role === "recruiter";
};
