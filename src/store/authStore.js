import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  auth: null,
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  setUser: (userData) => {
    console.log("Storing User Data:", userData); // Debugging line
    set({ user: userData });
  },
  setAuth: (AuthData) => {
    console.log("Storing Auth Data:", AuthData); // Debugging line
    set({ auth: AuthData });
  },
}));

export default useAuthStore;
