import { api } from "@/lib/axios";
import type { LoginBody, LoginResponse } from "@/types/auth";

export async function login(payload: LoginBody): Promise<LoginResponse> {
  const { data, status } = await api.post<LoginResponse>(
    "/auth/login",
    payload
  );
  if (status < 200 || status >= 300) throw new Error("Login failed");
  return data; // cookie is set by the BFF response
}
