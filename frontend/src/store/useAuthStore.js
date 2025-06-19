import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import io from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "https://api.oxemed.live" : "/";

export const useAuthStore = create((set, get) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ user: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ user: res.data.user });
      toast.success("Akun berhasil dibuat");
      get().connectSocket();
    } catch (error) {
      console.log("🚀 ~ signup: ~ error:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ user: res.data.user });
      toast.success("Berhasil masuk");

      get().connectSocket();
    } catch (error) {
      console.log("🚀 ~ login: ~ error:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ user: null });
      toast.success("Berhasil keluar");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ user: res.data.user });
      toast.success("Profil berhasil diperbarui");
    } catch (error) {
      console.log("Kesalahan dalam memperbarui profil: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: user.id,
      },
    });
    socket.connect();
    set({ socket: socket });

    // socket.on("getOnlineUsers", (userIds) => {
    //   set({ onlineUsers: userIds });
    // });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
