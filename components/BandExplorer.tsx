"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/types/band";
import BandCard from "@/components/BandCard";

type BandExplorerProps = {
  bands?: Band[]; // ใส่ ? กันกรณีลืมส่งค่าเข้ามา
};

export default function BandExplorer({ bands = [] }: BandExplorerProps) {
  // 1. State
  const [keyword, setKeyword] = useState<string>("");
  const [followedIds, setFollowedIds] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [onlyFollowed, setOnlyFollowed] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"name" | "year">("name");

  // 2. Handlers
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFollow(id: number) {
    setFollowedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((bandId) => bandId !== id)
        : [...prevIds, id]
    );
  }

  function handleLike(id: number) {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));
  }

  function handleReset() {
    setKeyword("");
    setFollowedIds([]);
    setOnlyFollowed(false);
    setSortBy("name");
  }

  // 3. ป้องกันปัญหาค้นหา: ตัดช่องว่าง แปลงพิมพ์เล็ก และเช็คค่าว่างก่อนเสมอ
  const search = (keyword || "").trim().toLowerCase();

  const visibleBands = (bands || [])
    .filter((band) => {
      if (!band) return false;

      // ค้นหาแบบปลอดภัย (Safe Navigation)
      const nameMatch = (band.name || "").toLowerCase().includes(search);
      const genreMatch = (band.genre || "").toLowerCase().includes(search);
      const descMatch = (band.description || "").toLowerCase().includes(search);
      
      // ค้นหาในสมาชิก
      const memberMatch = Array.isArray(band.members)
        ? band.members.some((m) => (m.name || "").toLowerCase().includes(search))
        : false;

      const matchesKeyword = nameMatch || genreMatch || descMatch || memberMatch;
      const matchesFollowed = onlyFollowed ? followedIds.includes(band.id) : true;

      return matchesKeyword && matchesFollowed;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }
      return (a.formedYear || 0) - (b.formedYear || 0);
    });

  return (
    <div className="space-y-6">
      {/* กล่องค้นหาและตัวกรอง */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
        {/* ช่อง Input สำคัญมาก: ต้องมี value และ onChange */}
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="พิมพ์ค้นหาชื่อวง, แนวเพลง, หรือสมาชิก..."
            value={keyword}
            onChange={handleKeywordChange}
            className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "year")}
            className="px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="name">เรียงตามชื่อวง (A-Z)</option>
            <option value="year">เรียงตามปีก่อตั้ง</option>
          </select>

          <button
            type="button"
            onClick={() => setOnlyFollowed((prev) => !prev)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              onlyFollowed
                ? "bg-indigo-600 text-white border-indigo-500"
                : "bg-slate-950 text-slate-300 border-slate-800"
            }`}
          >
            {onlyFollowed ? "✓ แสดงเฉพาะที่ติดตาม" : "แสดงเฉพาะที่ติดตาม"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 text-xs font-semibold rounded-xl text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20"
          >
            ล้างตัวกรอง
          </button>
        </div>
      </div>

      {/* สรุปจำนวน */}
      <div className="flex justify-between items-center text-xs text-slate-400 px-1">
        <p>
          ค้นพบ: <strong className="text-white">{visibleBands.length}</strong> วง{" "}
          {keyword && <span>(จากคำค้น "{keyword}")</span>}
        </p>
        <p>
          กำลังติดตาม: <strong className="text-emerald-400">{followedIds.length}</strong> วง
        </p>
      </div>

      {/* การแสดงผล: ถ้าไม่พบให้ขึ้นกล่องเตือน ถ้าพบให้วนลูป render Card */}
      {visibleBands.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-slate-300 font-semibold text-sm">ไม่พบวงดนตรีที่ตรงกับ "{keyword}"</p>
          <button
            type="button"
            onClick={() => setKeyword("")}
            className="mt-3 text-xs text-indigo-400 underline hover:text-indigo-300"
          >
            ล้างคำค้นหา
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowed={followedIds.includes(band.id)}
              likeCount={likes[band.id] || 0}
              onToggleFollow={handleToggleFollow}
              onLike={handleLike}
            />
          ))}
        </section>
      )}
    </div>
  );
}