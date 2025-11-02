"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-violet-500 to-fuchsia-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm shadow-2xl border border-white/50">
          <div className="px-8 py-10">
            <h1 className="text-3xl font-semibold text-center tracking-tight text-gray-900">
              Login
            </h1>

            <LoginForm />
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
