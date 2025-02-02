import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  auth: null,

  setUser: (userData) => {
    localStorage.setItem("user_data", JSON.stringify(userData));
    set({ user: userData });
  },

  setAuth: (authData) => {
    localStorage.setItem("auth_token", JSON.stringify(authData));
    set({ auth: authData });
  },

  clearUser: () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("auth_token");
    set({ user: null, auth: null });
  },

  isLoggedIn: () => !!get().user, // Check if the user is logged in

  login: () => {
    set({ user: get().user, auth: get().auth }); // Ensure user and auth are in the state
  },

  logout: () => {
    // Clears user data from store and localStorage
    localStorage.removeItem("user_data");
    localStorage.removeItem("auth_token");
    set({ user: null, auth: null });
  },
}));

export default useAuthStore;
