"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Sidebar from "@/components/admin/sideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DefaultPagination from "@/components/layout/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface Address {
  id: number;
  title: string;
  address: string;
  city: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  addresses?: Address[];
}

export default function Users(): React.JSX.Element {
  const isMobile = useIsMobile();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 🔹 Örnek kullanıcılar
  useEffect(() => {
    const sampleUsers: User[] = [
      {
        id: 1,
        name: "Ahmet",
        surname: "Yılmaz",
        email: "ahmet@example.com",
        phone: "05551234567",
        addresses: [
          {
            id: 1,
            title: "Ev",
            address: "Cumhuriyet Cd. No:5",
            city: "İstanbul",
          },
          { id: 2, title: "İş", address: "Atatürk Cd. No:12", city: "Ankara" },
        ],
      },
      {
        id: 2,
        name: "Ayşe",
        surname: "Demir",
        email: "ayse@example.com",
        phone: "05559876543",
        addresses: [
          { id: 1, title: "Ev", address: "Bahçelievler Mah.", city: "İzmir" },
        ],
      },
    ];
    setUsers(sampleUsers);
    setTimeout(() => setLoading(false), 300);
  }, []);

  if (loading)
    return (
      <div className="text-gray-700 p-4 flex justify-center items-center min-h-screen">
        Yükleniyor...
      </div>
    );

  // 🔍 Filtreleme
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.surname.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Sayfalama
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * 15,
    currentPage * 15
  );

  // ❌ Tek kullanıcı silme
  const handleDelete = (id: number) => {
    if (!confirm("Bu kullanıcıyı silmek istediğine emin misin?")) return;
    setUsers(users.filter((u) => u.id !== id));
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  // ❌ Seçilenleri sil
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (
      !confirm(
        `Seçilen ${selectedIds.length} kullanıcıyı silmek istediğine emin misin?`
      )
    )
      return;
    setUsers(users.filter((u) => !selectedIds.includes(u.id)));
    setSelectedIds([]);
  };

  // ✅ Checkbox işlemleri
  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={`flex-1 p-4 md:p-8 transition-all ${
          isMobile ? "" : "md:ml-64"
        }`}
      >
        {/* Başlık */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#001e59] ms-12">
            Kullanıcılar
          </h1>
        </div>

        {/* Araç Çubuğu */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Button
              variant="default"
              className={`w-full sm:w-auto rounded-xl shadow-sm transition-all ${
                selectedIds.length > 0
                  ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              Seçilenleri Sil ({selectedIds.length})
            </Button>

            <Input
              type="text"
              placeholder="Ad, soyad veya email ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-[#001e59]/30"
            />
          </div>
        </div>

        {/* Kullanıcı Tablosu */}
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-md">
          <table className="min-w-full text-left text-gray-800">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length > 0 &&
                      selectedIds.length === paginatedUsers.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                  ID
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                  Ad
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                  Soyad
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden sm:table-cell">
                  Telefon
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden md:table-cell">
                  Email
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden lg:table-cell">
                  Adresler
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 text-center">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Kullanıcı bulunamadı.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <td className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user.id)}
                        onChange={() => handleSelectOne(user.id)}
                      />
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                      {user.id}
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                      {user.name}
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                      {user.surname}
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden sm:table-cell">
                      {user.phone || "-"}
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden md:table-cell">
                      {user.email}
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden lg:table-cell">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-[#001e59] hover:bg-[#003080] text-white rounded-lg shadow-sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            Adresleri Gör
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white text-gray-800 border border-gray-200 rounded-2xl shadow-lg">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-semibold text-[#001e59]">
                              {user.name} {user.surname} - Adresleri
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                              Kullanıcıya kayıtlı adresler
                            </DialogDescription>
                          </DialogHeader>
                          <ul className="mt-4 space-y-3">
                            {user.addresses?.map((addr) => (
                              <li
                                key={addr.id}
                                className="p-3 bg-gray-100 border border-gray-200 rounded-xl"
                              >
                                <p className="text-gray-700">
                                  <strong>{addr.title}:</strong> {addr.address},{" "}
                                  {addr.city}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 text-center">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm"
                      >
                        Sil
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Sayfalama */}
        <div className="mt-6 flex justify-center">
          <DefaultPagination
            totalItems={filteredUsers.length}
            itemsPerPage={15}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
