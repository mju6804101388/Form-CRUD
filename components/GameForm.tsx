"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Game, GamePlatform, GameStatus } from "@/types/game";

export type GameDraft = {
  title: string;
  platform: string;
  estimatedHours: string;
  status: GameStatus;
};

const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  estimatedHours: "",
  status: "ยังไม่เริ่ม",
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

function toDraft(game?: Game): GameDraft {
  if (!game) return emptyDraft;
  return {
    title: game.title,
    platform: game.platform,
    estimatedHours: String(game.estimatedHours),
    status: game.status,
  };
}

function validate(value: GameDraft): FormErrors {
  const nextErrors: FormErrors = {};

  if (value.title.trim() === "") {
    nextErrors.title = "กรุณาระบุชื่อเกม";
  }

  if (value.platform.trim() === "") {
    nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
  }

  const hours = Number(value.estimatedHours);
  if (!Number.isInteger(hours) || hours <= 0) {
    nextErrors.estimatedHours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก (มากกว่า 0)";
  }

  return nextErrors;
}

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
    >
      <h3 className="text-base font-bold text-white">
        {initialGame ? "✏️ แก้ไขเกม" : "➕ เพิ่มเกมเข้า Backlog"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="game-title" className="block text-xs font-semibold text-slate-400 mb-1">
            ชื่อเกม
          </label>
          <input
            id="game-title"
            name="title"
            type="text"
            placeholder="เช่น Elden Ring"
            value={draft.title}
            onChange={handleChange}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm outline-none focus:border-purple-500"
          />
          {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="game-platform" className="block text-xs font-semibold text-slate-400 mb-1">
            แพลตฟอร์ม
          </label>
          <select
            id="game-platform"
            name="platform"
            value={draft.platform}
            onChange={handleChange}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm outline-none focus:border-purple-500"
          >
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Mobile">Mobile</option>
          </select>
          {errors.platform && <p className="text-rose-400 text-xs mt-1">{errors.platform}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="game-hours" className="block text-xs font-semibold text-slate-400 mb-1">
            ชั่วโมงที่คาดว่าจะเล่น (ชั่วโมง)
          </label>
          <input
            id="game-hours"
            name="estimatedHours"
            type="number"
            min="1"
            placeholder="เช่น 50"
            value={draft.estimatedHours}
            onChange={handleChange}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm outline-none focus:border-purple-500"
          />
          {errors.estimatedHours && (
            <p className="text-rose-400 text-xs mt-1">{errors.estimatedHours}</p>
          )}
        </div>

        <div>
          <label htmlFor="game-status" className="block text-xs font-semibold text-slate-400 mb-1">
            สถานะ
          </label>
          <select
            id="game-status"
            name="status"
            value={draft.status}
            onChange={handleChange}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm outline-none focus:border-purple-500"
          >
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white transition-all"
        >
          {initialGame ? "บันทึกการแก้ไข" : "บันทึกเกม"}
        </button>
        {initialGame && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}