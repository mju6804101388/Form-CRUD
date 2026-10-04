import Image from "next/image";
import type { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
  isFollowed: boolean;
  likeCount: number;
  onToggleFollow: (id: number) => void;
  onLike: (id: number) => void;
};

export default function BandCard({
  band,
  isFollowed,
  likeCount,
  onToggleFollow,
  onLike,
}: BandCardProps) {
  return (
    <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col transition-all hover:border-slate-700">
      {/* รูปภาพหลักของวง */}
      <div className="relative w-full h-52 bg-slate-800">
        <Image
          src={band.image}
          alt={band.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={band.id === 1}
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
            band.isActive ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
          }`}
        >
          {band.isActive ? "กำลังมีผลงาน" : "พักวง"}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-2xl font-bold text-white mb-1">{band.name}</h2>
        <p className="text-xs text-indigo-400 font-medium mb-3">
          แนวเพลง: {band.genre} • ก่อตั้งปี ค.ศ. {band.formedYear}
        </p>

        {band.description && (
          <p className="text-sm text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-800 italic mb-4">
            "{band.description}"
          </p>
        )}

        {/* ปุ่ม Action: สลับสถานะติดตาม และ กด Like */}
        <div className="flex gap-2.5 mb-5">
          <button
            type="button"
            aria-pressed={isFollowed}
            onClick={() => onToggleFollow(band.id)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              isFollowed
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
            }`}
          >
            {isFollowed ? "✓ กำลังติดตาม" : "+ ติดตาม"}
          </button>

          <button
            type="button"
            onClick={() => onLike(band.id)}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-semibold bg-slate-800/90 text-rose-400 border border-slate-700/80 hover:bg-slate-800 hover:border-rose-500/40 transition-all"
          >
            <span>❤️ Like</span>
            <span className="bg-rose-500/10 text-rose-300 px-1.5 py-0.5 rounded text-[11px] font-bold">
              {likeCount}
            </span>
          </button>
        </div>

        {/* ส่วนรายชื่อสมาชิก */}
        <div className="mt-auto pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              สมาชิกในวง
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {band.members.length} คน
            </span>
          </div>

          <div className="space-y-2.5">
            {band.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800/80 hover:bg-slate-800/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/40 bg-slate-700 shrink-0 shadow-md">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-indigo-300 font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-200">
                    {member.name}
                  </span>
                </div>

                <span className="text-xs text-slate-400 font-light px-2.5 py-1 rounded bg-slate-900/70 border border-slate-800">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}