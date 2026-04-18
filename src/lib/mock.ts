export type InventoryCategory =
  | "Ölçüm ve Test"
  | "Güç Kayn."
  | "3B Yazıcı."
  | "Elektronik ve Bileşenler"
  | "Robotik Parçalar"
  | "Lehimleme"
  | "El Aletleri"
  | "İş Güvenliği"
  | "Mobilya/Donanım";

export const inventoryCategories: InventoryCategory[] = [
  "Ölçüm ve Test",
  "Güç Kayn.",
  "3B Yazıcı.",
  "Elektronik ve Bileşenler",
  "Robotik Parçalar",
  "Lehimleme",
  "El Aletleri",
  "İş Güvenliği",
  "Mobilya/Donanım",
];

export type ProductUnit = "Adet" | "Litre" | "Kg" | "Metre";

export type Product = {
  id: string;
  name: string;
  brand?: string;
  category: InventoryCategory;
  quantity: number;
  unit: ProductUnit;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Akım Probu Makine Teçhizat",
    brand: "Bosch",
    category: "Ölçüm ve Test",
    quantity: 12,
    unit: "Adet",
  },
  {
    id: "p2",
    name: "Potansiyometre Seti",
    brand: "Generic",
    category: "Elektronik ve Bileşenler",
    quantity: 40,
    unit: "Adet",
  },
  {
    id: "p3",
    name: "3B Filament (Kırmızı)",
    brand: "PLA",
    category: "3B Yazıcı.",
    quantity: 15,
    unit: "Adet",
  },
  {
    id: "p4",
    name: "Lazer Metre",
    brand: "GW Instek",
    category: "Ölçüm ve Test",
    quantity: 8,
    unit: "Adet",
  },
  {
    id: "p5",
    name: "Arduino Seti",
    brand: "Arduino",
    category: "Elektronik ve Bileşenler",
    quantity: 9,
    unit: "Adet",
  },
  {
    id: "p6",
    name: "Osiloskop",
    brand: "Fluke",
    category: "Ölçüm ve Test",
    quantity: 3,
    unit: "Adet",
  },
  {
    id: "p7",
    name: "Havya İstasyonu",
    brand: "TS100",
    category: "Lehimleme",
    quantity: 6,
    unit: "Adet",
  },
  {
    id: "p8",
    name: "Mekanik Alet Seti",
    brand: "Generic",
    category: "El Aletleri",
    quantity: 4,
    unit: "Adet",
  },
];

export type ReportRow = {
  code: number;
  name: string;
  usage: number;
  unit: ProductUnit;
};

export const juneReport: ReportRow[] = [
  { code: 101, name: "3B Filament (Kırmızı)", usage: 15, unit: "Adet" },
  { code: 102, name: "3B Filament (Mavi)", usage: 8, unit: "Adet" },
  { code: 110, name: "Arduino Uno", usage: 3, unit: "Adet" },
  { code: 215, name: "İzopropil Alkol", usage: 2.5, unit: "Litre" },
];

export const monthlyStats = [
  { month: "Nisan", a: 42, b: 55 },
  { month: "Mayıs", a: 60, b: 52 },
  { month: "Haziran", a: 75, b: 68 },
];

export type HistoryUser = {
  id: string;
  firstName: string;
  lastName: string;
  type: "ÖĞRENCİ" | "ÖĞRETMEN" | "AKADEMİSYEN" | "SİVİL";
  orgName: string;
  schoolLevel?: "İlkokul" | "Ortaokul" | "Lise" | "Üniversite";
  className?: string;
  faculty?: string;
  department?: string;
  phone: string;
  email: string;
  branch?: string;
  academicTitle?: string;
  companyName?: string;
  position?: string;
  workArea?: string;
};

export type HistoryProject = {
  id: string;
  userId: string;
  name: string;
  category: string;
  description: string;
};

export const mockHistoryUsers: HistoryUser[] = [
  {
    id: "u1",
    firstName: "Ahmet",
    lastName: "Yılmaz",
    type: "ÖĞRENCİ",
    orgName: "Atatürk Fen Lisesi",
    schoolLevel: "Lise",
    className: "11-A",
    phone: "0555 111 22 33",
    email: "ahmet@mail.com",
  },
  {
    id: "u2",
    firstName: "Ayşe",
    lastName: "Kaya",
    type: "ÖĞRETMEN",
    orgName: "Cumhuriyet Ortaokulu",
    branch: "Matematik",
    phone: "0555 222 33 44",
    email: "ayse@mail.com",
  },
  {
    id: "u3",
    firstName: "Ahmet",
    lastName: "Yılmaz",
    type: "AKADEMİSYEN",
    orgName: "İstanbul Teknik Üniversitesi",
    faculty: "Mühendislik",
    department: "Bilgisayar",
    academicTitle: "Dr. Öğr. Üyesi",
    phone: "0555 999 88 77",
    email: "ayilmaz@itu.edu.tr",
  },
];

export const mockHistoryProjects: HistoryProject[] = [
  {
    id: "pr1",
    userId: "u1",
    name: "Otonom İHA Projesi",
    category: "Teknofest",
    description: "Yapay zeka tabanlı otonom uçuş kontrol sistemi.",
  },
  {
    id: "pr2",
    userId: "u1",
    name: "Akıllı Sera Sistemi",
    category: "TUBİTAK",
    description: "Otomatik sulama ve iklimlendirme sistemi.",
  },
  {
    id: "pr3",
    userId: "u2",
    name: "Matematik Atölyesi",
    category: "Okul Projesi",
    description: "Öğrencilere yönelik eğlenceli matematik etkinlikleri.",
  },
];

