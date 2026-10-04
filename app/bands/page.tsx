// src/app/bands/page.tsx
import Navbar from "@/components/Navbar";
import BandExplorer from "@/components/BandExplorer"; // ต้อง import ตัวนี้
import { bandsData } from "@/data/bands";

export default function FavoriteBandsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        {/* จุดสำคัญ: ต้องเรียก <BandExplorer bands={bandsData} /> ห้าม .map BandCard เองที่นี่ */}
        <BandExplorer bands={bandsData} />
      </main>
    </div>
  );
}