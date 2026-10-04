import Link from "next/link";
import type { Game, GameStatus } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
  onQuickStatusChange: (nextStatus: GameStatus) => void;
};

export default function GameCard({
  game,
  onEdit,
  onDelete,
  onQuickStatusChange,
}: GameCardProps) {
  const statusColors: Record<GameStatus, string> = {
    "ยังไม่เริ่ม": "bg-slate-800 text-slate-300 border-slate-700",
    "กำลังเล่น": "bg-amber-500/10 text-amber-400 border-amber-500/30",
    "เล่นจบแล้ว": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };

  const nextStatusMap: Record<GameStatus, GameStatus> = {
    "ยังไม่เริ่ม": "กำลังเล่น",
    "กำลังเล่น": "เล่นจบแล้ว",
    "เล่นจบแล้ว": "ยังไม่เริ่ม",
  };

  return (
    <article className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/games/${game.id}`}
            className="text-lg font-bold text-white hover:text-purple-400 transition-colors"
          >
            {game.title}
          </Link>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            {game.platform}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              statusColors[game.status]
            }`}
          >
            {game.status}
          </span>
        </div>
        <p className="text-xs text-slate-400">
          เวลาที่คาดว่าจะใช้:{" "}
          <span className="text-slate-200 font-semibold">
            {game.estimatedHours} ชั่วโมง
          </span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => onQuickStatusChange(nextStatusMap[game.status])}
          className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          title="คลิกเพื่อสลับสถานะถัดไป"
        >
          สถานะ ↻
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
        >
          แก้ไข
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
        >
          ลบ
        </button>
      </div>
    </article>
  );
}