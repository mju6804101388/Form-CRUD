import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import Navbar from "@/components/Navbar";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  return {
    title: course ? `${course.name} | รายละเอียด` : "ไม่พบรายวิชา",
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-2xl w-full mx-auto p-6 flex items-center justify-center">
        <article className="w-full p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
              {course.code}
            </span>
            <h1 className="text-3xl font-black text-white pt-2">{course.name}</h1>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-slate-400">หน่วยกิต:</strong> {course.credit} หน่วยกิต
            </p>
            <p>
              <strong className="text-slate-400">ผู้สอน:</strong> {course.instructor || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-slate-400">รหัสอ้างอิง:</strong>{" "}
              <span className="font-mono text-xs text-slate-500">{course.id}</span>
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              ← กลับไปหน้ารายวิชาทั้งหมด
            </Link>
          </div>
        </article>
      </main>

      <footer className="py-6 border-t border-slate-900/80 text-center text-xs text-slate-500 mt-auto">
        <p>พัฒนาโดย <span className="text-slate-400 font-medium">นาย ธนโชติ รักชาติ</span> • รหัสนักศึกษา 6804101337</p>
      </footer>
    </div>
  );
}