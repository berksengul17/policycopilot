import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export const server = axios.create({
  baseURL: `${process.env.API_URL}/${process.env.API_VERSION}`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    // if unauthorized redirect to login
    if (error.status == 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
