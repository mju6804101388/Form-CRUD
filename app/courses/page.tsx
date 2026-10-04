import type { Metadata } from "next";
import { courses } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer"; // ตรวจสอบว่าไม่ได้ import BandExplorer
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-black text-white text-center">📚 ระบบจัดการรายวิชา</h1>
        <CourseExplorer initialCourses={courses} />
      </main>
    </div>
  );
}