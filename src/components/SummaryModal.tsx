"use client";

import { Button } from "@/components/ui/Button";

interface SummaryModalProps {
  data: {
    person: {
      type: string;
      firstName: string;
      lastName: string;
      orgName: string;
      phone: string;
      email: string;
      details: string; // Branş, Sınıf vb.
    };
    project: {
      category: string;
      name: string;
      description: string;
    };
    materials: Array<{ id: string; name: string; quantity: number; unit: string }>;
  };
  onClose: () => void;
  onConfirm: () => void;
}

export function SummaryModal({ data, onClose, onConfirm }: SummaryModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm print:p-0 print:bg-white">
      <div className="w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden print:max-h-none print:shadow-none print:border-none print:w-full">
        
        {/* Header - Print'te gizlenebilir veya sadeleşebilir */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4 print:hidden">
          <h2 className="text-base font-semibold text-black">Kayıt Özeti ve Onay</h2>
          <button onClick={onClose} className="text-black/50 hover:text-black">✕</button>
        </div>

        {/* Content - Print alanı burası */}
        <div id="printable-area" className="p-8 flex flex-col gap-8 overflow-y-auto">
          
          {/* Resmi Başlık (Sadece Print'te şık durur) */}
          <div className="text-center flex flex-col gap-2 border-b-2 border-slate-900 pb-4">
            <h1 className="text-xl font-bold text-black uppercase tracking-tight">TÜBİTAK PROJE LABORATUVARI</h1>
            <h2 className="text-sm font-semibold text-slate-600 uppercase">GÜNLÜK KULLANIM VE KAYIT FORMU</h2>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            {/* Kişisel Bilgiler */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-black border-b border-slate-200 pb-1 uppercase text-xs tracking-wider">Ziyaretçi Bilgileri</h3>
              <div className="grid grid-cols-[100px_1fr] gap-y-1">
                <span className="text-slate-500 font-medium">Ad Soyad:</span>
                <span className="text-black font-semibold">{data.person.firstName} {data.person.lastName}</span>
                
                <span className="text-slate-500 font-medium">Statü:</span>
                <span className="text-black capitalize">{data.person.type.toLowerCase()}</span>
                
                <span className="text-slate-500 font-medium">Kurum:</span>
                <span className="text-black">{data.person.orgName}</span>
                
                <span className="text-slate-500 font-medium">Detay:</span>
                <span className="text-black">{data.person.details}</span>

                <span className="text-slate-500 font-medium">İletişim:</span>
                <span className="text-black">{data.person.phone} / {data.person.email}</span>
              </div>
            </div>

            {/* Proje Bilgileri */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-black border-b border-slate-200 pb-1 uppercase text-xs tracking-wider">Proje Bilgileri</h3>
              <div className="grid grid-cols-[100px_1fr] gap-y-1">
                <span className="text-slate-500 font-medium">Kategori:</span>
                <span className="text-black font-semibold">{data.project.category}</span>
                
                <span className="text-slate-500 font-medium">Proje Adı:</span>
                <span className="text-black">{data.project.name || "Belirtilmedi"}</span>
                
                <span className="text-slate-500 font-medium">Açıklama:</span>
                <span className="text-black text-xs leading-relaxed italic line-clamp-3">{data.project.description || "Girilmedi..."}</span>
              </div>
            </div>
          </div>

          {/* Malzeme Tablosu */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-black border-b border-slate-200 pb-1 uppercase text-xs tracking-wider">Kullanılan Malzemeler</h3>
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold text-black">Malzeme Adı</th>
                  <th className="border border-slate-300 px-3 py-2 text-center text-xs font-bold text-black w-32">Miktar</th>
                </tr>
              </thead>
              <tbody>
                {data.materials.map((m, idx) => (
                  <tr key={idx}>
                    <td className="border border-slate-300 px-3 py-2 text-sm text-black">{m.name}</td>
                    <td className="border border-slate-300 px-3 py-2 text-sm text-black text-center font-medium">{m.quantity} {m.unit}</td>
                  </tr>
                ))}
                {data.materials.length === 0 && (
                  <tr>
                    <td colSpan={2} className="border border-slate-300 px-3 py-6 text-center text-slate-400 italic">Malzeme kullanılmadı.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* İmza Alanı (Sadece Print'te Önemli) */}
          <div className="mt-8 grid grid-cols-2 gap-10">
            <div className="flex flex-col items-center gap-16">
              <span className="text-xs font-bold text-black uppercase tracking-widest">Teslim Eden / Kullanıcı</span>
              <div className="w-32 border-b border-slate-900" />
            </div>
            <div className="flex flex-col items-center gap-16">
              <span className="text-xs font-bold text-black uppercase tracking-widest">Laboratuvar Sorumlusu</span>
              <div className="w-32 border-b border-slate-900" />
            </div>
          </div>

          {/* Tarih Damgası */}
          <div className="text-[10px] text-slate-400 text-right italic">
            Bu belge {new Date().toLocaleString('tr-TR')} tarihinde sistem üzerinden oluşturulmuştur.
          </div>
        </div>

        {/* Footer Butonları */}
        <div className="border-t border-[var(--border)] px-6 py-4 flex justify-between items-center print:hidden">
          <Button variant="secondary" onClick={onClose}>Geri Dön ve Düzenle</Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <span className="text-lg">🖨️</span> Yazdır
            </Button>
            <Button onClick={onConfirm} className="bg-slate-900">Kaydı Tamamla & Stoktan Düş</Button>
          </div>
        </div>
      </div>

      {/* Yazdırma Stilleri */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-area, #printable-area * {
            visibility: visible;
          }
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
