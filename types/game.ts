export type GameStatus = "ยังไม่เริ่ม" | "กำลังเล่น" | "เล่นจบแล้ว";

export type GamePlatform = "PC" | "PlayStation" | "Xbox" | "Nintendo Switch" | "Mobile";

export type Game = {
  id: string;
  title: string;
  platform: GamePlatform;
  estimatedHours: number;
  status: GameStatus;
};