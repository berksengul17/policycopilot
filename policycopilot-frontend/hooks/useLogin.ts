import { api } from "@/lib/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type LoginBody = { email: string; password: string };
type LoginResponse = { accessToken: string; userEmail: string };

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const login = async ({ email, password }: LoginBody) => {
    setErr(null);
    setLoading(true);
    try {
      const res = await api.post<LoginResponse>(
        "/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status < 200 || res.status >= 300) {
        const msg =
          typeof res.data === "string"
            ? res.data
            : (res.data as any)?.message ?? "Login failed";
        throw new Error(msg);
      }

      router.push("/");
    } catch (e: unknown) {
      const msg = (
        axios.isAxiosError(e)
          ? e?.response?.data?.message || e.response?.data || e.message
          : "Login failed"
      ) as string;

      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, err };
}
