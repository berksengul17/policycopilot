import { login, logout } from "@/services/authService";
import { LoginBody } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.replace("/");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login");
    },
  });

  const e = loginMutation.error;
  const err =
    e && axios.isAxiosError(e)
      ? ((e.response?.data?.message ?? e.response?.data ?? e.message) as string)
      : e
      ? "Login failed"
      : null;

  return {
    login: (loginBody: LoginBody) => loginMutation.mutate(loginBody),
    logout: () => logoutMutation.mutate(),
    loading: loginMutation.isPending,
    err,
  };
}
