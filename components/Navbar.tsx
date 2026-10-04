import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* โลโก้โปรเจกต์ */}
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-lg tracking-tight text-white hover:text-indigo-400 transition-colors"
        >
          <span className="w-3 h-3 rounded-md bg-linear-to-tr from-indigo-500 to-purple-500" />
          Webtech Hub
        </Link>

        {/* เมนูนำทางครบทุกหน้า */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            หน้าแรก
          </Link>
          <Link
            href="/courses"
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            รายวิชา
          </Link>
          <Link
            href="/bands"
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            วงดนตรี
          </Link>
          <Link
            href="/games"
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
          >
            คลังเกม
          </Link>
        </nav>
      </div>
    </header>
  );
}