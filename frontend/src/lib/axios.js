import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://api.oxemed.live/api"
      : "/api",
  withCredentials: true,
});
