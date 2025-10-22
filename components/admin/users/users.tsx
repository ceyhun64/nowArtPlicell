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
  DialogFooter,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import Loading from "@/components/layout/loading";

interface Address {
  id: number;
  title: string;
  address: string;
  city: string;
  district: string;
  neighborhood?: string;
  firstName: string;
  lastName: string;
  zip: string;
  country: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  addresses?: Address[];
}

// 🔹 Silme dialogu reusable
interface DeleteDialogProps {
  onConfirm: () => void;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  onConfirm,
  trigger,
  title = "Silme İşlemi",
  description = "Bu işlemi yapmak istediğine emin misin?",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-white text-gray-800 rounded-2xl border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#001e59]">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            İptal
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Sil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function Users(): React.JSX.Element {
  const isMobile = useIsMobile();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 🔹 API’den kullanıcıları çek
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/all");
      if (!res.ok) throw new Error("Kullanıcılar alınamadı");
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error(err);
      alert("Kullanıcılar alınırken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />

      <main
        className={`flex-1 p-4 md:p-8 transition-all ${
          isMobile ? "" : "md:ml-64"
        }`}
      >
        {/* Başlık ve Araç Çubuğu */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#001e59] ms-12">
            Kullanıcılar
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Seçilenleri silme dialog */}
            <DeleteDialog
              onConfirm={() => {
                selectedIds.forEach((id) =>
                  setUsers((prev) => prev.filter((u) => u.id !== id))
                );
                setSelectedIds([]);
              }}
              trigger={
                <Button
                  variant="default"
                  className={`w-full sm:w-auto rounded-xl shadow-sm transition-all ${
                    selectedIds.length > 0
                      ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={selectedIds.length === 0}
                >
                  Seçilenleri Sil ({selectedIds.length})
                </Button>
              }
              title={`Seçilen ${selectedIds.length} kullanıcı silinecek!`}
              description="Bu kullanıcıları silmek istediğine emin misin?"
            />

            <Input
              type="text"
              placeholder="Ad, soyad veya email ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-[#001e59]/30"
            />
          </div>
        </div>

        {/* Masaüstü tablo */}
        <div className="hidden lg:block overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-md">
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
                        className="w-4 h-4 accent-[#001e59]"
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
                            className="bg-[#001e59] hover:bg-[#003080] text-white rounded-lg shadow-sm transition-transform hover:scale-105"
                            onClick={() => setSelectedUser(user)}
                          >
                            Adresleri Gör
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white text-gray-800 border border-gray-200 rounded-2xl shadow-lg max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-[#001e59]">
                              {user.name} {user.surname} - Adresleri
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                              Kullanıcıya kayıtlı tüm adresler
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                            {user.addresses && user.addresses.length > 0 ? (
                              user.addresses.map((addr) => {
                                const addressParts = [
                                  addr.title || addr.firstName || "Adres",
                                  addr.address,
                                  addr.city,
                                  addr.district,
                                  addr.zip,
                                  addr.country,
                                ].filter(Boolean);
                                return (
                                  <div
                                    key={addr.id}
                                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                  >
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                      {addr.title || addr.firstName || "Adres"}
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                      {addressParts.slice(1).join(", ")}
                                    </p>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-center text-gray-400 italic py-6">
                                Bu kullanıcıya kayıtlı adres bulunamadı.
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 text-center">
                      <DeleteDialog
                        onConfirm={() =>
                          setUsers(users.filter((u) => u.id !== user.id))
                        }
                        trigger={
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm"
                          >
                            Sil
                          </Button>
                        }
                        title={`${user.name} ${user.surname} silinecek!`}
                        description="Bu kullanıcıyı silmek istediğine emin misin?"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobil card görünümü */}
        <div className="lg:hidden flex flex-col gap-4 mt-4">
          {paginatedUsers.length === 0 ? (
            <div className="text-center py-6 text-gray-500 italic">
              Kullanıcı bulunamadı.
            </div>
          ) : (
            paginatedUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => handleSelectOne(user.id)}
                      className="w-4 h-4 accent-[#001e59]"
                    />
                    <h3 className="font-bold text-gray-800">
                      {user.name} {user.surname}
                    </h3>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-[#001e59] hover:bg-[#003080] text-white rounded-lg shadow-sm transition-transform hover:scale-105"
                        onClick={() => setSelectedUser(user)}
                      >
                        Adresleri Gör
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-gray-800 border border-gray-200 rounded-2xl shadow-lg max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-[#001e59]">
                          {user.name} {user.surname} - Adresleri
                        </DialogTitle>
                        <DialogDescription className="text-gray-500">
                          Kullanıcıya kayıtlı tüm adresler
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 space-y-4">
                        {user.addresses && user.addresses.length > 0 ? (
                          user.addresses.map((addr) => {
                            const addressParts = [
                              addr.title || addr.firstName || "Adres",
                              addr.address,
                              addr.city,
                              addr.district,
                              addr.zip,
                              addr.country,
                            ].filter(Boolean);

                            return (
                              <div
                                key={addr.id}
                                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                              >
                                <h4 className="font-semibold text-gray-800 mb-1">
                                  {addr.title || addr.firstName || "Adres"}
                                </h4>
                                <p className="text-gray-600 text-sm">
                                  {addressParts.slice(1).join(", ")}
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center text-gray-400 italic py-6">
                            Bu kullanıcıya kayıtlı adres bulunamadı.
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="text-gray-600 text-sm">
                  <p>Email: {user.email}</p>
                  <p>Telefon: {user.phone || "-"}</p>
                </div>

                <div className="flex justify-end mt-2">
                  <DeleteDialog
                    onConfirm={() =>
                      setUsers(users.filter((u) => u.id !== user.id))
                    }
                    trigger={
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm"
                      >
                        Sil
                      </Button>
                    }
                    title={`${user.name} ${user.surname} silinecek!`}
                    description="Bu kullanıcıyı silmek istediğine emin misin?"
                  />
                </div>
              </div>
            ))
          )}
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
