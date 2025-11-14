import React from "react";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
