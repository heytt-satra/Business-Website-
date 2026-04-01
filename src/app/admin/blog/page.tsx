import AdminBlogConsole from "@/components/blog/AdminBlogConsole";
import { requireAdminSession } from "@/lib/admin-auth";
import { getAllBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const session = await requireAdminSession();
  const posts = await getAllBlogPosts({ includeDrafts: true });

  return <AdminBlogConsole initialPosts={posts} adminEmail={session.email} />;
}
