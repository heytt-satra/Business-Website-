import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/blog/AdminLoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/blog");
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(91,192,235,0.22),transparent_35%),linear-gradient(180deg,#F4F8FB_0%,#EAF2F8_100%)] px-4 py-10">
      <div className="w-full max-w-xl rounded-[36px] border border-white/70 bg-white/88 p-6 shadow-[0_30px_80px_rgba(12,35,64,0.12)] backdrop-blur-xl sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Team only</p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-primary sm:text-4xl">
          Sign in to write and publish
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          This is the internal blog admin for your team. It saves content into the site itself, so you get a
          Medium-like writing flow without paying for a CMS.
        </p>
        <div className="mt-8 rounded-[30px] border border-border bg-[#F8FBFE] p-5 sm:p-6">
          <AdminLoginForm />
        </div>
      </div>
    </section>
  );
}
