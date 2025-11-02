import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export const server = axios.create({
  baseURL: `${process.env.API_URL}/${process.env.API_VERSION}`,
  headers: { "Content-Type": "application/json" },
});
