import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  doctors: [],
  patients: [],
  consultations: [],
  summary: [],
  isSummaryLoading: false,
  selectedUser: null,
  selectedConsultation: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isUpdatingConsultation: false,

  getDoctors: async () => {
    const { getConsultations } = get();
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/users/doctors");
      set({ doctors: res.data });
      getConsultations();
    } catch (error) {
      console.log("Error in getUsers: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getConsultations: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/consultations");
      set({ consultations: res.data });
      console.log("🚀 ~ getConsultations: ~ data:", res.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in getConsultations: ", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedConsultation: async () => {
    const { selectedUser, consultations } = get();
    if (selectedUser && consultations.length > 0) {
      const consultation = consultations.find(
        (consultation) =>
          consultation.doctorId === selectedUser.id &&
          consultation.status === "Aktif"
      );
      set({
        selectedConsultation: consultation || null,
      });
    }
  },

  createConsultation: async () => {
    const { selectedUser, setSelectedConsultation } = get();
    if (!selectedUser) {
      toast.error("Please select a user first.");
      return;
    }

    set({ isUpdatingConsultation: true });

    try {
      const res = await axiosInstance.post("/consultations", {
        consultation: {
          doctorId: selectedUser.id,
          timeStart: new Date(),
        },
        doctorName: selectedUser.fullName,
      });
      console.log("🚀 ~ set ~ consultation:", res.data);
      setSelectedConsultation();
      set((state) => ({
        messages: [...state.messages, res.data.message],
        consultations: [...state.consultations, res.data.consultation],
      }));
      toast.success("Konsultasi berhasil dibuat");
    } catch (error) {
      console.log("🚀 ~ createConsultation: ~ error:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingConsultation: false });
    }
  },

  endConsultation: async () => {
    const { selectedConsultation, consultations, createSummary } = get();
    if (!selectedConsultation) {
      toast.error("No active consultation to end.");
      return;
    }
    set({ isUpdatingConsultation: true });
    try {
      await axiosInstance.put("/consultations", {
        ...selectedConsultation,
        status: "Selesai",
        timeEnd: new Date(),
      });

      createSummary();
      set({
        consultations: consultations.map((consultation) =>
          consultation.id === selectedConsultation.id
            ? { ...consultation, status: "Selesai" }
            : consultation
        ),
        selectedConsultation: null,
      });
      toast.success(
        "Konsultasi berhasil diakhiri, silakan cek rangkuman konsultasi di halaman riwayat"
      );
    } catch (error) {
      console.log("🚀 ~ endConsultation: ~ error:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingConsultation: false });
    }
  },

  createSummary: async () => {
    const { selectedConsultation } = get();
    set({ isSummaryLoading: true });
    try {
      await axiosInstance.post(
        `consultations/${selectedConsultation.id}/summarize`
      );
      toast.success("Konsultasi Berhasil Dirangkum");
    } catch (error) {
      console.log("error di createsummary: ", error),
        toast.error(error.response.data.message);
    } finally {
      set({ isSummaryLoading: false });
    }
  },

  getSummary: async () => {
    set({ isSummaryLoading: true });
    try {
      const res = await axiosInstance.get("/users/summaries");
      console.log("🚀 ~ getSummary: ~ data:", res.data);
      set({ summary: res.data });
    } catch (error) {
      console.log("error di getSummary: ", error),
        toast.error(error.response.data.message);
    } finally {
      set({ isSummaryLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages, selectedConsultation } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser.id}`,
        { ...messageData, consultationId: selectedConsultation.id }
      );
      set({ messages: [...messages, res.data.data] });
      toast.success("Pesan berhasil dikirim");
    } catch (error) {
      console.log("🚀 ~ sendMessage: ~ error:", error);
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageFromSelectedUser) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
