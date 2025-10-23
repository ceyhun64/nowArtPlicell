"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, User } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [messageStatus, setMessageStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessageStatus(null);

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: ["info@nowartplicell.com"], // sabit alıcı
          subject: "Web Sitesi İletişim Formu",
          message: `
Ad Soyad: ${formData.name}
Telefon: ${formData.phone}
Email: ${formData.email}
Mesaj: ${formData.message}
          `,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessageStatus(data.error || "Bir hata oluştu, tekrar deneyin.");
      } else {
        setMessageStatus("Mesajınız başarıyla gönderildi!");
        setFormData({ name: "", phone: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Mail gönderim hatası:", err);
      setMessageStatus("Sunucu hatası, tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Sol: Bilgiler */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">İletişim</h2>
        <p className="text-gray-600">
          Bize ulaşmak için aşağıdaki bilgileri kullanabilir veya formu
          doldurabilirsiniz.
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#92e676] mt-1" />
            <p className="text-gray-700">
              BAMYASUYU MAH. KÖSEOĞLU SK. NO: 6B <br />
              HALİLİYE / ŞANLIURFA
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-[#92e676]" />
            <p className="text-gray-700">+90 530 130 30 84</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-[#92e676]" />
            <p className="text-gray-700">info@nowartplicell.com</p>
          </div>
        </div>
      </div>

      {/* Sağ: Form */}
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-blue-50 p-8 rounded-xl shadow-md space-y-4 border border-blue-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                name="name"
                placeholder="Adınız Soyadınız"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10 border border-blue-200"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                name="phone"
                type="tel"
                placeholder="Telefon Numaranız"
                value={formData.phone}
                onChange={handleChange}
                required
                className="pl-10 border border-blue-200"
              />
            </div>
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              name="email"
              type="email"
              placeholder="E-posta Adresiniz"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 border border-blue-200"
            />
          </div>

          <Textarea
            name="message"
            placeholder="Mesajınız"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="border border-blue-200"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#92e676] hover:bg-green-400 text-white shadow-md transition-all transform hover:-translate-y-1 hover:shadow-xl ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Gönderiliyor..." : "Gönder"}
          </Button>

          {messageStatus && (
            <p
              className={`text-center mt-2 text-sm ${
                messageStatus.toLowerCase().includes("başarı")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {messageStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
