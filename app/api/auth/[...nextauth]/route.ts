import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth"; // AuthOptions yerine NextAuthOptions kullanın

// authOptions değişkenini ARTIK DIŞA AKTARMIYORUZ (export yok)
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        // User nesnesi döndürmeden önce id'nin string olduğundan emin olun
        return {
          id: user.id.toString(),
          name: user.name,
          surname: user.surname,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // user'dan token'a özel alanları kopyala
        token.id = user.id;
        token.name = user.name;
        token.surname = user.surname;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // token'daki özel alanları session.user'a kopyala
      session.user = {
        ...session.user, // Mevcut alanları koru
        id: token.id as string, // veya token'daki tür hangisiyse
        name: token.name,
        surname: token.surname,
        email: token.email,
        role: token.role  // role'ün türünü uygun şekilde belirtin
      };
      return session;
    },
  },
};

// NextAuth'u yapılandırma seçenekleriyle çağırın ve sonuçlarını
// Next.js Route Handler'larının beklediği gibi dışa aktarın.
const handler = NextAuth(authOptions);

// Next.js'in beklediği HTTP metodları (GET ve POST) dışa aktarılıyor.
export { handler as GET, handler as POST };
