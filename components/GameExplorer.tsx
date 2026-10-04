"use client";

import { useState } from "react";
import type { Game, GamePlatform, GameStatus } from "@/types/game";
import GameCard from "@/components/GameCard";
import GameForm, { type GameDraft } from "@/components/GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames = [] }: GameExplorerProps) {
  const [gamesList, setGamesList] = useState<Game[]>(initialGames ?? []);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ทั้งหมด");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Derived State: คำนวณชั่วโมงรวมของเกมที่ยังไม่เริ่มเล่น
  const unstartedHours = gamesList
    .filter((game) => game.status === "ยังไม่เริ่ม")
    .reduce((sum, game) => sum + game.estimatedHours, 0);

  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      platform: draft.platform as GamePlatform,
      estimatedHours: Number(draft.estimatedHours),
      status: draft.status,
    };
    setGamesList([...gamesList, newGame]);
  }

  function handleDelete(id: string) {
    setGamesList(gamesList.filter((game) => game.id !== id));
  }

  function handleUpdate(id: string, draft: GameDraft) {
    setGamesList(
      gamesList.map((game) =>
        game.id === id
          ? {
              ...game,
              title: draft.title.trim(),
              platform: draft.platform as GamePlatform,
              estimatedHours: Number(draft.estimatedHours),
              status: draft.status,
            }
          : game
      )
    );
    setEditingId(null);
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  function handleQuickStatusChange(id: string, nextStatus: GameStatus) {
    setGamesList(
      gamesList.map((game) =>
        game.id === id ? { ...game, status: nextStatus } : game
      )
    );
  }

  const editingGame = gamesList?.find((game) => game.id === editingId);

  // กรองทั้งจากคำค้นหาและสถานะพร้อมกัน
  const visibleGames = gamesList?.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesFilter =
      filterStatus === "ทั้งหมด" || game.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* การ์ดแสดงชั่วโมงรวมของเกมที่ยังไม่เริ่ม (Derived State) */}
      <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-center justify-between">
        <span className="text-xs sm:text-sm text-purple-200">
          ⏳ เวลารวมของเกมที่อยู่ในสถานะ <strong>"ยังไม่เริ่ม"</strong>:
        </span>
        <span className="text-lg font-black text-purple-400">
          {unstartedHours} ชั่วโมง
        </span>
      </div>

      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {/* แถบค้นหาและตัวกรองสถานะ */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="🔍 ค้นหาชื่อเกม..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm outline-none focus:border-purple-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm outline-none focus:border-purple-500"
        >
          <option value="ทั้งหมด">ทั้งหมดทุกสถานะ</option>
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>
      </div>

      <div className="space-y-3">
        {visibleGames?.length === 0 ? (
          <p className="text-center py-8 text-slate-500 text-sm">ไม่พบเกมตามเงื่อนไข</p>
        ) : (
          visibleGames?.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={() => setEditingId(game.id)}
              onDelete={() => handleDelete(game.id)}
              onQuickStatusChange={(nextStatus) =>
                handleQuickStatusChange(game.id, nextStatus)
              }
            />
          ))
        )}
      </div>
    </div>
  );
}