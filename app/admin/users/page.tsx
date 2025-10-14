import React from "react";
import AdminUsers from "@/components/admin/users/users";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  // const session = await getServerSession(authOptions);

  // // Eğer giriş yoksa veya role ADMIN değilse login sayfasına yönlendir
  // if (!session || session.user.role !== "ADMIN") {
  //   redirect("/admin");
  // }

  return (
    <div>
      <AdminUsers />
    </div>
  );
}
