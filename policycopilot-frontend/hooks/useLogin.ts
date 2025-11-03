import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginBody } from "@/types/auth";
import { login } from "@/services/authService";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (loginBody: LoginBody) => {
    setErr(null);
    setLoading(true);
    try {
      await login(loginBody);
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

  return { submit, loading, err };
}
