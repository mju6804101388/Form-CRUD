// src/app/layout.tsx
import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "./globals.css";

// โหลดฟอนต์ Mitr สไตล์เว็บไอที/เกมมิ่งแบบ planariashop
const mitr = Mitr({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-mitr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ระบบแสดงรายวิชาและวงดนตรีโปรด",
  description: "Next.js Reusable Components & TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={mitr.variable}>
      <body className={mitr.className}>
        {children}
      </body>
    </html>
  );
}