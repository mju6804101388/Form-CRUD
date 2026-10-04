import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* ดวงไฟ Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-16 right-10 w-[350px] h-[250px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10 my-auto">
        <div className="max-w-3xl space-y-8">

          {/* Badge แสดงหัวข้อใบงาน */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            10301231 • Web Technology Lab Hub
          </div>

          {/* หัวข้อหลัก */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              ระบบจัดการข้อมูลและ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Next.js Application Hub
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
              รวบรวมระบบจัดการรายวิชา (Form & Dynamic Route), ทำเนียบวงดนตรีโปรด (State & Events) และคลังบันทึกเกม (Game Backlog)
            </p>
          </div>

          {/* ปุ่ม CTA ไปทั้ง 3 ส่วน */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-2xl mx-auto w-full">
            <Link
              href="/courses"
              className="px-5 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 transition-all text-center"
            >
              📚 จัดการรายวิชา
            </Link>
            <Link
              href="/bands"
              className="px-5 py-3.5 rounded-2xl font-bold text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 hover:-translate-y-0.5 transition-all text-center"
            >
              🎸 วงดนตรีโปรด
            </Link>
            <Link
              href="/games"
              className="px-5 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/25 hover:-translate-y-0.5 transition-all text-center"
            >
              🎮 คลังเกม Backlog
            </Link>
          </div>

          {/* การ์ดสรุปฟีเจอร์ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-indigo-400 text-lg">✦</span>
              <h3 className="font-semibold text-xs text-slate-200 mt-1">Form & Validation</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">ตรวจสอบความถูกต้องรายฟิลด์และจัดการ Error State</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-purple-400 text-lg">✦</span>
              <h3 className="font-semibold text-xs text-slate-200 mt-1">Immutable Updates</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">เพิ่ม ลบ แก้ไขสมาชิก Array ใน State ด้วย map และ filter</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-pink-400 text-lg">✦</span>
              <h3 className="font-semibold text-xs text-slate-200 mt-1">Dynamic Routes</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">อ่านค่า Promise params พร้อมจัดการ Metadata และ 404 notFound</p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-900/80 text-center text-xs text-slate-500">
        <p>พัฒนาโดย <span className="text-slate-400 font-medium">นาย ธนโชติ รักชาติ</span> • รหัสนักศึกษา 6804101337</p>
      </footer>
    </div>
  );
}