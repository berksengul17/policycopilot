"use client";

import { useLogin } from "@/hooks/useLogin";
import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, err } = useLogin();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login({ email, password });
  }

  return (
    <>
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
            <a href="#" className="text-sm text-gray-500 hover:text-violet-600">
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
    </>
  );
}
