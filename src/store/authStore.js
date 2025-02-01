import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  setUser: (userData) => {
    console.log("Storing User Data:", userData); // Debugging line
    set({ user: userData });
  },
}));

export default useAuthStore;
