import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
