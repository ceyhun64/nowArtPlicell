"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, User } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Mesajınız gönderildi!");
    setFormData({ name: "", email: "", subject: "", message: "" });
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
              Küçükbakkallı Mah. Küçükbakkallı Cad. No:55/3 <br />{" "}
              Osmangazi/BURSA
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-[#92e676]" />
            <p className="text-gray-700">+90 552 555 10 25</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-[#92e676]" />
            <p className="text-gray-700">info@NowArt.com</p>
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
          </div>
          <Input
            name="subject"
            placeholder="Konu"
            value={formData.subject}
            onChange={handleChange}
            required
            className=" border border-blue-200"
          />
          <Textarea
            name="message"
            placeholder="Mesajınız"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className=" border border-blue-200"
          />
          <Button
            type="submit"
            className="w-full bg-[#92e676] hover:bg-green-400 text-white shadow-md transition-all transform hover:-translate-y-1 hover:shadow-xl"
          >
            Gönder
          </Button>
        </form>
      </div>
    </div>
  );
}
