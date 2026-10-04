import type { Band } from "@/types/band";

export const bandsData: Band[] = [
  {
    id: 1,
    name: "Bodyslam",
    genre: "Rock",
    formedYear: 2002,
    isActive: true,
    image: "/images/body-slam.jpg",
    description: "วงร็อกระดับตำนานของไทย เจ้าของบทเพลงสร้างแรงบันดาลใจมากมาย",
    members: [
      { id: 101, name: "ตูน (อาทิวราห์)", role: "ร้องนำ", image: "/images/1.png" },
      { id: 102, name: "ปิ๊ด (ธนดล)", role: "เบส", image: "/images/2.jpg" },
      { id: 103, name: "ยอด (ธนชัย)", role: "กีตาร์", image: "/images/3.jpg" },
      { id: 104, name: "ชัช (สุชัฒติ)", role: "กลอง", image: "/images/4.jpg" },
      { id: 105, name: "โอม (โอมเปล่ง)", role: "คีย์บอร์ด", image: "/images/5.jpg" },
    ],
  },
  {
    id: 2,
    name: "Cocktail",
    genre: "Classic Rock",
    formedYear: 2002,
    isActive: false,
    image: "/images/cock-tail.jpg",
    description: "วงดนตรีร็อกผสมผสานเครื่องสายออร์เคสตราที่ถ่ายทอดบทกวีผ่านเสียงเพลง",
    members: [
      { id: 201, name: "โอม (ปัณฑพล)", role: "ร้องนำ", image: "/images/11.jpg" },
      { id: 202, name: "เชา (ชวรัตน์)", role: "กีตาร์", image: "/images/12.jpg" },
      { id: 203, name: "ปาร์ค (เกริกเกียรติ)", role: "เบส", image: "/images/13.jpg" },
      { id: 204, name: "ฟิลิปส์ (ฟิลิปส์)", role: "กลอง", image: "/images/14.jpg" },
    ],
  },
  {
    id: 3,
    name: "Only Monday",
    genre: "Indie Rock",
    formedYear: 2020,
    isActive: true,
    image: "/images/Only-Monday.avif",
    description: "วงร็อกรุ่นใหม่ไฟแรง เจ้าของเพลงฮิตติดหู 'ได้แต่นึกถึง'",
    members: [
      { id: 301, name: "ธีร์ (ทีปกร)", role: "ร้องนำ/กีตาร์", image: "/images/21.jpg" },
      { id: 302, name: "โปรด (วริศ)", role: "เบส", image: "/images/22.jpg" },
      { id: 303, name: "เฟรม (คฑาวุธ)", role: "กลอง", image: "/images/23.jpg" },
    ],
  },
];