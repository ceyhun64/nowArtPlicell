import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Client component'i dynamic import ile yükle, ssr kapalı
const AdminBlogs = dynamic(() => import("@/components/admin/blogs/blogs"), {
  ssr: false,
});

export default async function AdminBlogsPage() {
  const session = await getServerSession(authOptions);

  // Eğer giriş yoksa veya role ADMIN değilse login sayfasına yönlendir
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  return <AdminBlogs />;
}
 