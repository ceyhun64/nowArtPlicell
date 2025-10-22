import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Mevcut diğer config seçenekleriniz varsa buraya bırakın */
  images: {
    domains: ["res.cloudinary.com"], // Bu satırı ekleyin
  },
};

export default nextConfig;
