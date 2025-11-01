"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status < 200 || res.status >= 300) {
        const msg =
          typeof res.data === "string"
            ? res.data
            : res.data?.message ?? "Login failed";
        throw new Error(msg);
      }

      router.push("/home");
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-violet-500 to-fuchsia-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm shadow-2xl border border-white/50">
          <div className="px-8 py-10">
            <h1 className="text-3xl font-semibold text-center tracking-tight text-gray-900">
              Login
            </h1>

            {/* Form */}
            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* user icon */}
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Type your email"
                    className="w-full rounded-xl border border-gray-300 bg-white/70 pl-10 pr-3 py-3 text-gray-900 placeholder-gray-400 outline-none ring-0 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* lock icon */}
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V7.875a4.5 4.5 0 10-9 0V10.5m-.75 0h10.5A1.5 1.5 0 0118.75 12v6a1.5 1.5 0 01-1.5 1.5H6.75A1.5 1.5 0 015.25 18v-6a1.5 1.5 0 011.5-1.5z"
                      />
                    </svg>
                  </span>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password"
                    className="w-full rounded-xl border border-gray-300 bg-white/70 pl-10 pr-3 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
                  />
                </div>
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-violet-600"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="w-full rounded-full py-3 font-semibold text-white shadow-md
                  bg-gradient-to-r from-teal-400 to-violet-500 hover:opacity-95 active:scale-[.99] transition"
              >
                {loading ? "Signing in..." : "LOGIN"}
              </button>

              {err && <p className="text-sm text-red-600 text-center">{err}</p>}
            </form>

            {/* Social sign-in */}
            <div className="mt-8">
              <p className="text-center text-sm text-gray-500">
                Or Sign In Using
              </p>
              <div className="mt-4 flex items-center justify-center gap-4">
                {/* Social buttons (placeholders) */}
                <a
                  href="#"
                  aria-label="Sign in with Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  {/* F */}
                  <span className="font-semibold text-gray-700">f</span>
                </a>
                <a
                  href="#"
                  aria-label="Sign in with Twitter"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  {/* t */}
                  <span className="font-semibold text-gray-700">t</span>
                </a>
                <a
                  href="#"
                  aria-label="Sign in with Google"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  {/* g */}
                  <span className="font-semibold text-gray-700">g</span>
                </a>
              </div>
            </div>

            {/* Sign up */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">Or Sign Up Using</p>
              <a
                href="#"
                className="mt-2 inline-block text-sm font-semibold tracking-wide text-violet-600 hover:text-violet-700"
              >
                SIGN UP
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* subtle foreground shapes for depth (optional) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-10 h-80 w-80 rotate-12 rounded-3xl bg-white/10" />
        <div className="absolute -bottom-20 -left-10 h-96 w-96 -rotate-6 rounded-3xl bg-white/10" />
      </div>
    </div>
  );
}
