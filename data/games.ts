import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    id: "g1",
    title: "Mount & Blade II: Bannerlord",
    platform: "PC",
    estimatedHours: 80,
    status: "กำลังเล่น",
  },
  {
    id: "g2",
    title: "Valorant",
    platform: "PC",
    estimatedHours: 150,
    status: "กำลังเล่น",
  },
  {
    id: "g3",
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    estimatedHours: 90,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "g4",
    title: "Elden Ring",
    platform: "PC",
    estimatedHours: 100,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "g5",
    title: "God of War Ragnarök",
    platform: "PlayStation",
    estimatedHours: 40,
    status: "เล่นจบแล้ว",
  },
];