# NowArt Plicell - Online Perde Mağazası

![NowArt Plicell Logo](https://www.nowartplicell.com/og-image.webp)

NowArt Plicell, kaliteli ve şık perde modelleri sunan Türkiye'nin önde gelen online perde mağazasıdır. Plicell, Zebra, Stor ve Ahşap Jaluzi perde çeşitleriyle evlerinize zarafet ve konfor katın. Modern web teknolojileriyle geliştirilmiş, kullanıcı dostu bir e-ticaret platformu.

## 🚀 Özellikler

- **Kullanıcı Yönetimi**: NextAuth ile güvenli giriş/çıkış, profil yönetimi
- **Ürün Kataloğu**: Kategorilere göre organize edilmiş perde ürünleri (Plicell, Zebra, Stor, Ahşap Jaluzi)
- **Sepet ve Ödeme**: Iyzico entegrasyonu ile güvenli ödeme sistemi
- **Favoriler**: Kullanıcıların favori ürünleri kaydetmesi
- **Sipariş Takibi**: Sipariş durumu ve geçmiş siparişler
- **Blog Sistemi**: Perde ile ilgili blog yazıları
- **Admin Paneli**: Ürün, sipariş, kullanıcı ve blog yönetimi
- **Responsive Tasarım**: Mobil uyumlu, modern UI (Tailwind CSS + Radix UI)
- **Görsel Yönetimi**: Cloudinary ile resim yükleme ve optimizasyonu
- **E-posta Gönderimi**: Nodemailer ile bildirim e-postaları
- **Çoklu Dil Desteği**: Türkçe odaklı

## 🛠️ Teknolojiler

### Frontend

- **Next.js 15** - React framework
- **React 19** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Tailwind CSS 4** - Stil kütüphanesi
- **Radix UI** - Erişilebilir UI bileşenleri
- **Framer Motion** - Animasyonlar
- **React Hook Form + Zod** - Form yönetimi ve validasyon

### Backend

- **Next.js API Routes** - Serverless API
- **Prisma** - ORM ve veritabanı yönetimi
- **MySQL** - Veritabanı
- **NextAuth** - Kimlik doğrulama
- **bcrypt** - Şifre hashleme

### Entegrasyonlar

- **Iyzico** - Ödeme sistemi
- **Cloudinary** - Görsel yönetimi
- **Nodemailer** - E-posta gönderimi

### Geliştirme Araçları

- **Turbo** - Build optimizasyonu
- **ESLint** - Kod kalitesi
- **Prettier** - Kod formatı

## 📋 Gereksinimler

- Node.js 18+
- MySQL 8.0+
- npm, yarn veya pnpm

## 🚀 Kurulum

1. **Depoyu klonlayın:**

   ```bash
   git clone <repository-url>
   cd NowArt
   ```

2. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   # veya
   yarn install
   # veya
   pnpm install
   ```

3. **Environment değişkenlerini ayarlayın:**
   `.env.local` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/nowart_db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ADMIN_EMAIL="admin@nowartplicell.com"
   ADMIN_PASSWORD="admin-password"
   ADMIN_NAME="Admin"
   ADMIN_SURNAME="User"
   IYZICO_API_KEY="your-iyzico-api-key"
   IYZICO_SECRET_KEY="your-iyzico-secret-key"
   CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
   CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-email-password"
   ```

4. **Veritabanını hazırlayın:**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Seed verilerini yükleyin:**

   ```bash
   npm run seed
   ```

6. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📖 Kullanım

### Kullanıcı İşlemleri

- Ana sayfada ürünleri görüntüleyin
- Ürün detaylarına bakın ve sepete ekleyin
- Profil sayfasından adres ve siparişlerinizi yönetin
- Favori ürünleri kaydedin

### Admin İşlemleri

- `/admin` yolundan admin paneline erişin
- Ürün, kategori, sipariş ve blog yönetimini yapın
- Kullanıcıları yönetin

## 🏗️ Proje Yapısı

```
NowArt/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin sayfaları
│   ├── api/               # API endpoint'leri
│   ├── blog/              # Blog sayfaları
│   ├── cart/              # Sepet sayfası
│   ├── checkout/          # Ödeme süreci
│   ├── products/          # Ürün sayfaları
│   └── ...
├── components/            # React bileşenleri
│   ├── admin/            # Admin bileşenleri
│   ├── home/             # Ana sayfa bileşenleri
│   ├── ui/               # Yeniden kullanılabilir UI
│   └── ...
├── lib/                  # Yardımcı kütüphaneler
│   ├── auth.ts           # Kimlik doğrulama
│   ├── db.ts             # Veritabanı bağlantısı
│   └── ...
├── prisma/               # Veritabanı şeması ve migrasyonlar
│   ├── schema.prisma     # Prisma şeması
│   ├── seed.ts           # Seed verileri
│   └── migrations/       # Migrasyonlar
├── public/               # Statik dosyalar
├── types/                # TypeScript tür tanımları
└── utils/                # Yardımcı fonksiyonlar
```

## 🔧 API Dokümantasyonu

### Ana API Endpoint'leri

- `GET /api/products` - Ürünleri listele
- `POST /api/auth/signin` - Giriş yap
- `POST /api/cart` - Sepete ürün ekle
- `POST /api/order` - Sipariş oluştur
- `GET /api/user/profile` - Kullanıcı profili
- `POST /api/upload` - Dosya yükleme

Detaylı API dokümantasyonu için kod içindeki JSDoc yorumlarına bakın.

## 🧪 Test

```bash
npm run build
npm start
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- Website: [https://www.nowartplicell.com](https://www.nowartplicell.com)
- E-posta: info@nowartplicell.com

---

Geliştirici: NowArt Ekibi 🚀
