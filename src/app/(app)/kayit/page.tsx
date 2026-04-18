"use client";

import { useMemo, useState } from "react";

import { Page } from "@/components/Page";
import { ProductFormModal } from "@/components/ProductFormModal";
import { UserSearchModal } from "@/components/UserSearchModal";
import { SummaryModal } from "@/components/SummaryModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { 
  inventoryCategories, 
  products, 
  type InventoryCategory, 
  type HistoryUser, 
  type HistoryProject 
} from "@/lib/mock";

type MaterialTab =
  | "Ölçüm ve Test Cihazları"
  | "Güç Kaynakları ve Enerji"
  | "3B Yazıcı ve Üretim Teknolojileri"
  | "Elektronik Bileşen";

type PersonTab = "ÖĞRENCİ" | "ÖĞRETMEN" | "AKADEMİSYEN" | "SİVİL";
type SchoolLevel = "İlkokul" | "Ortaokul" | "Lise" | "Üniversite";

type TeamMember = { firstName: string; lastName: string; role: string };
type TeamRow = TeamMember & { committed: boolean };

const materialTabs: MaterialTab[] = [
  "Ölçüm ve Test Cihazları",
  "Güç Kaynakları ve Enerji",
  "3B Yazıcı ve Üretim Teknolojileri",
  "Elektronik Bileşen",
];

const materials: Array<{ tab: MaterialTab; name: string }> = [
  { tab: "Ölçüm ve Test Cihazları", name: "Akım Probu Makine Teçhizat" },
  {
    tab: "Ölçüm ve Test Cihazları",
    name: "Bosch Professional Su Terazisi Seti Terazi",
  },
  {
    tab: "Ölçüm ve Test Cihazları",
    name: "Fluke 115 - True Rms Multimetre Dijital Multimetre",
  },
  {
    tab: "Ölçüm ve Test Cihazları",
    name: "GW Instek GOM-804 - Miliohmmetre Miliohmmetre",
  },
];

export default function KayitPage() {
  const [purpose, setPurpose] = useState<"Proje" | "Gezi" | "Eğitim" | "Seminer">("Proje");
  const [participation, setParticipation] = useState<"Bireysel" | "Ekip">(
    "Bireysel",
  );

  const [personTab, setPersonTab] = useState<PersonTab>("ÖĞRENCİ");
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>("Lise");
  const [teacherLevel, setTeacherLevel] = useState<"İlkokul" | "Ortaokul" | "Lise">("Lise");

  const [orgName, setOrgName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [className, setClassName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [academicTitle, setAcademicTitle] = useState("");
  const [position, setPosition] = useState("");
  const [workArea, setWorkArea] = useState("");
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [teamCount, setTeamCount] = useState(1);
  const [team, setTeam] = useState<TeamRow[]>([
    { firstName: "", lastName: "", role: "", committed: false },
  ]);

  /* Ekip sayısı değişince satır sayısını senkron tut */
  const handleTeamCountChange = (newCount: number) => {
    const count = Math.max(1, newCount);
    setTeamCount(count);
    setTeam((prev) => {
      if (count > prev.length) {
        // Eksik satırları sonuna boş olarak ekle
        const extra = Array.from({ length: count - prev.length }, () => ({
          firstName: "",
          lastName: "",
          role: "",
          committed: false,
        }));
        return [...prev, ...extra];
      }
      // Fazlalık satırları sondan kes
      return prev.slice(0, count);
    });
  };

  const updateTeamField = (
    idx: number,
    field: keyof TeamMember,
    value: string,
  ) => {
    setTeam((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r)),
    );
  };

  const removeRow = (idx: number) => {
    setTeam((prev) => prev.filter((_, i) => i !== idx));
    setTeamCount((c) => Math.max(1, c - 1));
  };

  const [projectCategory, setProjectCategory] = useState("TUBİTAK");
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState(
    "Lütfen projenizden ve hedeflerinizden detaylıca bahsediniz...",
  );

  const [materialTab, setMaterialTab] = useState<MaterialTab>(
    materialTabs[0],
  );
  const [materialQuery, setMaterialQuery] = useState("");

  /* Modal ve Sepet State'leri */
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<Array<{ id: string; name: string; quantity: number; unit: string }>>([]);

  const resetForm = () => {
    // Tüm state'leri varsayılan hallerine dönder
    setPurpose("Proje");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setOrgName("");
    setProjectName("");
    setProjectDesc("");
    setSelectedMaterials([]);
    // İhtiyaca göre diğer state'ler de sıfırlanabilir
    // Örneğin: setTeam([...]) vb.
  };

  const handleConfirm = () => {
    // Burada stoktan düşme mantığı (mock) çalıştırılabilir
    console.log("Kayıt veritabanına işlendi:", {
      user: firstName + " " + lastName,
      materials: selectedMaterials
    });
    
    alert("Kayıt başarıyla tamamlandı, stok verileri güncellendi!");
    resetForm();
    setIsSummaryModalOpen(false);
  };

  const getPersonDetails = () => {
    switch (personTab) {
      case "ÖĞRENCİ": return `${schoolLevel} - ${className}`;
      case "ÖĞRETMEN": return `Branş: ${branch}`;
      case "AKADEMİSYEN": return `${academicTitle} - ${faculty}/${department}`;
      case "SİVİL": return `${companyName} - ${position}`;
      default: return "";
    }
  };

  const summaryData = {
    person: {
      type: personTab,
      firstName,
      lastName,
      orgName,
      phone,
      email,
      details: getPersonDetails()
    },
    project: {
      category: projectCategory,
      name: projectName,
      description: projectDesc
    },
    materials: selectedMaterials
  };

  const handleSearchSelect = (user: HistoryUser, project: HistoryProject | null) => {
    // Kişisel Bilgileri Doldur
    setPersonTab(user.type);
    if (user.schoolLevel) setSchoolLevel(user.schoolLevel);
    setOrgName(user.orgName);
    if (user.className) setClassName(user.className);
    if (user.faculty) setFaculty(user.faculty);
    if (user.department) setDepartment(user.department);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    setEmail(user.email);
    if (user.branch) setBranch(user.branch || "");
    if (user.academicTitle) setAcademicTitle(user.academicTitle || "");
    if (user.companyName) setCompanyName(user.companyName || "");
    if (user.position) setPosition(user.position || "");
    if (user.workArea) setWorkArea(user.workArea || "");

    // Proje Bilgilerini Doldur (Eğer proje seçildiyse)
    if (project) {
      setProjectName(project.name);
      setProjectCategory(project.category);
      setProjectDesc(project.description);
    } else {
      // Yeni proje seçildiyse proje alanlarını temiz tutalım
      setProjectName("");
      setProjectDesc("");
    }

    setIsSearchModalOpen(false);
  };

  const addMaterialToCart = (product: any, qty: number) => {
    setSelectedMaterials(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { id: product.id || Math.random().toString(), name: product.name, quantity: qty, unit: product.unit || "Adet" }];
    });
  };

  const removeMaterialFromCart = (id: string) => {
    setSelectedMaterials(prev => prev.filter(item => item.id !== id));
  };

  const visibleMaterials = useMemo(() => {
    const q = materialQuery.trim().toLowerCase();
    return materials
      .filter((m) => m.tab === materialTab)
      .filter((m) => (q ? m.name.toLowerCase().includes(q) : true));
  }, [materialQuery, materialTab]);

  return (
    <Page title="TEKNOLOJİ LABORATUVARI KAYIT FORMU">
      <div className="flex flex-col gap-8">
        {/* Arama Bölümü */}
        <section className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-slate-900 p-5 text-white shadow-lg">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Kayıtlı mısınız?</h3>
            <p className="text-sm text-slate-400">Önceden geldiyseniz isim ile bilgilerinizi hızlıca getirebilirsiniz.</p>
          </div>
          <Button 
            variant="secondary" 
            className="bg-white text-slate-900 hover:bg-slate-200"
            onClick={() => setIsSearchModalOpen(true)}
          >
            Sistemde Ara
          </Button>
        </section>
        <section className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-white p-5">
          <div className="text-sm font-semibold text-black">Katılım Amacı</div>
          <div className="flex flex-wrap gap-6 text-sm">
            {(["Proje", "Gezi", "Eğitim", "Seminer"] as const).map((k) => (
              <label
                key={k}
                className="flex cursor-pointer items-center gap-2 font-medium text-black"
              >
                <input
                  type="radio"
                  name="purpose"
                  checked={purpose === k}
                  onChange={() => setPurpose(k)}
                  className="size-4 accent-slate-900"
                />
                <span>{k}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-white p-5">
          <div className="text-sm font-semibold text-black">Katılım Türü</div>
          <div className="flex flex-wrap gap-6 text-sm">
            <label className="flex cursor-pointer items-center gap-2 font-medium text-black">
              <input
                type="radio"
                name="participation"
                checked={participation === "Bireysel"}
                onChange={() => setParticipation("Bireysel")}
                className="size-4 accent-slate-900"
              />
              <span>Bireysel Katılım</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 font-medium text-black">
              <input
                type="radio"
                name="participation"
                checked={participation === "Ekip"}
                onChange={() => setParticipation("Ekip")}
                className="size-4 accent-slate-900"
              />
              <span>Ekip Katılım</span>
            </label>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-5">
          <div className="text-sm font-semibold text-black">
            2. Kişisel / Ekip Sorumlusu Bilgileri
          </div>

          <Tabs
            value={personTab}
            onChange={setPersonTab}
            options={[
              { value: "ÖĞRENCİ", label: "ÖĞRENCİ" },
              { value: "ÖĞRETMEN", label: "ÖĞRETMEN" },
              { value: "AKADEMİSYEN", label: "AKADEMİSYEN" },
              { value: "SİVİL", label: "SİVİL" },
            ]}
          />

          {personTab === "ÖĞRENCİ" && (
            <div className="flex flex-wrap gap-6 text-sm">
              {(["İlkokul", "Ortaokul", "Lise", "Üniversite"] as SchoolLevel[]).map(
                (lvl) => (
                  <label
                    key={lvl}
                    className="flex cursor-pointer items-center gap-2 font-medium text-black"
                  >
                    <input
                      type="radio"
                      name="schoolLevel"
                      checked={schoolLevel === lvl}
                      onChange={() => setSchoolLevel(lvl)}
                      className="size-4 accent-slate-900"
                    />
                    <span>{lvl}</span>
                  </label>
                ),
              )}
            </div>
          )}

          {personTab === "ÖĞRETMEN" && (
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-black">
              <span>Görev Yeri:</span>
              {(["İlkokul", "Ortaokul", "Lise"] as const).map((lvl) => (
                <label
                  key={lvl}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="teacherLevel"
                    checked={teacherLevel === lvl}
                    onChange={() => setTeacherLevel(lvl)}
                    className="size-4 accent-slate-900"
                  />
                  <span>{lvl}</span>
                </label>
              ))}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {personTab === "ÖĞRENCİ" && (
              <>
                <Input
                  label="Okul / Üniversite Adı"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <Input
                  label="Sınıf"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
                <Input
                  label="Fakülte Adı (Sadece Üni.)"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
                <Input
                  label="Bölüm (Sadece Üni.)"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </>
            )}

            {personTab === "ÖĞRETMEN" && (
              <>
                <Input
                  label="Okul İsimi"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <Input
                  label="Branş"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </>
            )}

            {personTab === "AKADEMİSYEN" && (
              <>
                <Input
                  label="Üniversite Adı"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <Input
                  label="Fakülte"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
                <Input
                  label="Bölüm"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
                <Input
                  label="Akademisyen Derecesi / Unvanı"
                  value={academicTitle}
                  onChange={(e) => setAcademicTitle(e.target.value)}
                />
              </>
            )}

            {personTab === "SİVİL" && (
              <>
                <div className="md:col-span-2">
                  <Input
                    label="Şirket/Kurum Adı"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <Input
                  label="Pozisyon"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
                <Input
                  label="Çalışma Alanı"
                  value={workArea}
                  onChange={(e) => setWorkArea(e.target.value)}
                />
              </>
            )}

            {/* Ortak Alanlar */}
            <Input label="Ad" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Input label="Soyad" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Input label="Tel" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-5">
          <div className="text-sm font-semibold text-black">EKİP ÜYE BİLGİLERİ</div>

          <div className="max-w-xs">
            <Input
              label="Ekip Kişi Sayısı"
              type="number"
              min={1}
              value={teamCount}
              onChange={(e) => handleTeamCountChange(Number(e.target.value))}
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[var(--surface-muted)]">
                <tr>
                  <th className="border-b border-[var(--border)] px-3 py-2 text-left text-sm font-semibold text-black">
                    Ad
                  </th>
                  <th className="border-b border-[var(--border)] px-3 py-2 text-left text-sm font-semibold text-black">
                    Soyad
                  </th>
                  <th className="border-b border-[var(--border)] px-3 py-2 text-left text-sm font-semibold text-black">
                    Rol
                  </th>
                  <th className="border-b border-[var(--border)] px-3 py-2 text-left text-sm font-semibold text-black">
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody>
                {team.map((m, idx) => (
                  <tr key={idx} className={idx % 2 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="border-b border-[var(--border)] px-2 py-2">
                      <input
                        className="h-9 w-full rounded-md border border-[var(--border)] bg-white px-2 text-sm text-black"
                        value={m.firstName}
                        onChange={(e) =>
                          updateTeamField(idx, "firstName", e.target.value)
                        }
                        placeholder="Ad"
                      />
                    </td>
                    <td className="border-b border-[var(--border)] px-2 py-2">
                      <input
                        className="h-9 w-full rounded-md border border-[var(--border)] bg-white px-2 text-sm text-black"
                        value={m.lastName}
                        onChange={(e) =>
                          updateTeamField(idx, "lastName", e.target.value)
                        }
                        placeholder="Soyad"
                      />
                    </td>
                    <td className="border-b border-[var(--border)] px-2 py-2">
                      <input
                        className="h-9 w-full rounded-md border border-[var(--border)] bg-white px-2 text-sm text-black"
                        value={m.role}
                        onChange={(e) =>
                          updateTeamField(idx, "role", e.target.value)
                        }
                        placeholder="Rol"
                      />
                    </td>
                    <td className="border-b border-[var(--border)] px-2 py-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeRow(idx)}
                        disabled={team.length <= 1}
                      >
                        Sil
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-5">
          <div className="text-sm font-semibold text-black">PROJE KATEGORİSİ</div>
          <div className="max-w-sm">
            <Select
              label="Proje Kategorisini Seçiniz"
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
            >
              {["TUBİTAK", "Teknofest", "Okul Projesi", "Diğer"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-5">
          <div className="text-sm font-semibold text-black">PROJE BİLGİLENDİRME</div>
          <div className="grid gap-4">
            <Input
              label="Proje/Eğitim/Seminer Adı"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Textarea
              label="Proje/Eğitim/Seminer Açıklaması"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
            />
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-5">
          <div className="text-sm font-semibold text-black">
            LABORATUVARDA KULLANILAN MALZEMELER
          </div>

          <div className="flex flex-col gap-3">
            <Tabs
              value={materialTab}
              onChange={setMaterialTab}
              options={materialTabs.map((t) => ({ value: t, label: t }))}
            />

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  value={materialQuery}
                  onChange={(e) => setMaterialQuery(e.target.value)}
                  placeholder="search"
                />
              </div>
              <Button type="button" variant="secondary">
                Ara
              </Button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
              <div className="max-h-[280px] overflow-auto">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {visibleMaterials.map((m, idx) => (
                      <MaterialRow 
                        key={idx} 
                        material={m} 
                        alternate={idx % 2 === 0} 
                        onAdd={(qty) => addMaterialToCart(m, qty)} 
                      />
                    ))}
                    {visibleMaterials.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-3 py-10 text-center text-black/70"
                        >
                          Malzeme bulunamadı.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seçilen Malzemeler (Sepet) */}
            {selectedMaterials.length > 0 && (
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-bold text-black uppercase tracking-wider">Bugün Kullanılacaklar:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedMaterials.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-1 text-sm shadow-sm group">
                      <span className="font-semibold text-black">{item.name}</span>
                      <span className="text-slate-500">x {item.quantity} {item.unit}</span>
                      <button 
                        onClick={() => removeMaterialFromCart(item.id)}
                        className="ml-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 pt-4 border-t border-[var(--border)]">
            <Button 
              variant="secondary" 
              type="button" 
              className="min-w-40 border-slate-300"
              onClick={() => setIsSummaryModalOpen(true)}
              disabled={!firstName || !lastName}
            >
              Genel Bilgileri Getir
            </Button>
            <Button 
              type="button" 
              className="min-w-40 bg-slate-900"
              onClick={handleConfirm}
              disabled={!firstName || !lastName}
            >
              Kaydet
            </Button>
          </div>
        </section>
      </div>

      {/* Arama Modalı */}
      {isSearchModalOpen && (
        <UserSearchModal 
          onClose={() => setIsSearchModalOpen(false)}
          onSelect={handleSearchSelect}
        />
      )}

      {/* Özet ve Yazdırma Modalı */}
      {isSummaryModalOpen && (
        <SummaryModal 
          data={summaryData}
          onClose={() => setIsSummaryModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </Page>
  );
}

// Yardımcı Bileşen: Malzeme Satırı
function MaterialRow({ material, alternate, onAdd }: { material: any, alternate: boolean, onAdd: (qty: number) => void }) {
  const [qty, setQty] = useState(1);
  return (
    <tr className={alternate ? "bg-slate-50/60" : "bg-white"}>
      <td className="border-b border-[var(--border)] px-3 py-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-black">
          <span>{material.name}</span>
        </label>
      </td>
      <td className="border-b border-[var(--border)] px-3 py-2 w-36">
        <Input 
          value={qty} 
          type="number" 
          min={1} 
          onChange={(e) => setQty(Number(e.target.value))}
          aria-label="Adet" 
        />
      </td>
      <td className="border-b border-[var(--border)] px-3 py-2 w-28">
        <Button 
          type="button" 
          variant="secondary"
          onClick={() => onAdd(qty)}
        >
          Ekle
        </Button>
      </td>
    </tr>
  );
}
