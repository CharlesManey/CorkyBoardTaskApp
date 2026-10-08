import axios from "axios";

const apiBaseUrl = import.meta.env.PROD
  ? (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "")
  : "";

export function apiUrl(path: string): string {
  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;