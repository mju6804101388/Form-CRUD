import type { Metadata } from "next";
import { games } from "@/data/games";
import GameExplorer from "@/components/GameExplorer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "คลังเกม (Game Backlog)",
};

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
        <div className="text-center space-y-2 pt-4">
          <h1 className="text-3xl font-black text-white tracking-tight">
            🎮 คลังเกม (Game Backlog)
          </h1>
          <p className="text-slate-400 text-sm">
            จัดการรายการเกมที่ตั้งใจจะเล่น ตรวจสอบความถูกต้อง และคำนวณ Derived State
          </p>
        </div>

        <GameExplorer initialGames={games} />
      </main>

      <footer className="py-6 border-t border-slate-900/80 text-center text-xs text-slate-500 mt-auto">
        <p>พัฒนาโดย <span className="text-slate-400 font-medium">นาย ธนโชติ รักชาติ</span> • รหัสนักศึกษา 6804101337</p>
      </footer>
    </div>
  );
}