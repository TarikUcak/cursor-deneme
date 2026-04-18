"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  mockHistoryUsers, 
  mockHistoryProjects, 
  type HistoryUser, 
  type HistoryProject 
} from "@/lib/mock";

interface UserSearchModalProps {
  onClose: () => void;
  onSelect: (user: HistoryUser, project: HistoryProject | null) => void;
}

export function UserSearchModal({ onClose, onSelect }: UserSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HistoryUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    
    // İsim veya Soyisim içinde arama yap
    const found = mockHistoryUsers.filter(u => 
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q)
    );
    setResults(found);
    setSelectedUserId(null); // Aramada seçim sıfırlansın
  };

  const selectedUserProjects = useMemo(() => {
    if (!selectedUserId) return [];
    return mockHistoryProjects.filter(p => p.userId === selectedUserId);
  }, [selectedUserId]);

  const selectedUser = useMemo(() => {
    return results.find(u => u.id === selectedUserId);
  }, [results, selectedUserId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <h2 className="text-base font-semibold text-black">Kayıt Ara</h2>
          <button onClick={onClose} className="text-black/50 hover:text-black">✕</button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Input 
                placeholder="İsim veya Soyisim yazın..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Ara</Button>
          </div>

          {/* Results List */}
          <div className="flex flex-col gap-4">
            {results.length > 0 && (
              <div className="text-sm font-semibold text-black">Bulunan Kişiler</div>
            )}
            
            <div className="grid gap-3">
              {results.map((user) => (
                <div 
                  key={user.id}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedUserId === user.id 
                      ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900" 
                      : "border-[var(--border)] hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-black">{user.firstName} {user.lastName}</div>
                      <div className="text-xs text-black/60">{user.type} - {user.orgName}</div>
                    </div>
                    {selectedUserId === user.id && (
                      <span className="text-xs font-bold text-slate-900 bg-slate-200 px-2 py-1 rounded">Seçildi</span>
                    )}
                  </div>

                  {/* If this user is selected, show their projects */}
                  {selectedUserId === user.id && (
                    <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col gap-3">
                      <div className="text-xs font-bold text-black uppercase tracking-wider">İlgili Projeyi Seçin:</div>
                      
                      {/* New Project Option */}
                      <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-white cursor-pointer group">
                        <input 
                          type="radio" 
                          name="project-select" 
                          className="size-4 accent-slate-900"
                          onChange={() => {}} // Controlled by button usually but radio for UI
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(user, null);
                          }}
                        />
                        <div className="text-sm font-medium text-black group-hover:text-slate-900">+ Yeni Proje Başlat (Sadece Kişisel Bilgiler)</div>
                      </label>

                      {/* Past Projects */}
                      {selectedUserProjects.map((project) => (
                        <label key={project.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white cursor-pointer group">
                          <input 
                            type="radio" 
                            name="project-select" 
                            className="size-4 accent-slate-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelect(user, project);
                            }}
                          />
                          <div>
                            <div className="text-sm font-medium text-black">{project.name}</div>
                            <div className="text-xs text-black/60">{project.category}</div>
                          </div>
                        </label>
                      ))}
                      
                      {selectedUserProjects.length === 0 && (
                        <div className="text-xs text-black/40 italic pl-2">Bu kullanıcıya ait geçmiş proje bulunamadı.</div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {query && results.length === 0 && (
                <div className="text-center py-10 text-sm text-black/50">
                  Kayıt bulunamadı. Lütfen yeni kayıt oluşturun.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] px-6 py-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>İptal</Button>
          <Button variant="ghost" onClick={() => { setQuery(""); setResults([]); setSelectedUserId(null); }}>Temizle</Button>
        </div>
      </div>
    </div>
  );
}
