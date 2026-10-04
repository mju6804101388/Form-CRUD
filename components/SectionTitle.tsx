// src/components/SectionTitle.tsx
"use client";

import { useAppSettings } from "@/context/AppSettingsContext";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const { theme } = useAppSettings();

  return (
    <header className="mb-10 text-center space-y-3">
      <h1
        className={`text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={`text-sm sm:text-base max-w-xl mx-auto transition-colors ${
            theme === "dark" ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}