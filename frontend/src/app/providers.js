"use client";

const { ThemeProvider } = require("next-themes");

export default function Providers({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}