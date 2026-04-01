"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { clearAdminSession, requireAdminSession } from "@/lib/admin-auth";
import { deleteBlogPost, saveBlogPost } from "@/lib/blog";

const optionalString = (max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z.string().max(max).optional()
  );

const savePostSchema = z.object({
  sourceSlug: optionalString(140),
  title: z.string().trim().min(3).max(120),
  slug: z.string().trim().min(3).max(140),
  excerpt: optionalString(220),
  category: optionalString(60),
  author: optionalString(80),
  coverImage: optionalString(240),
  tags: z.array(z.string().trim().min(1).max(24)).max(10).optional(),
  publishedAt: optionalString(20),
  metaTitle: optionalString(120),
  metaDescription: optionalString(220),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
  content: z.string().trim().min(7),
});

export async function saveBlogPostAction(input: unknown) {
  try {
    await requireAdminSession();
    const parsed = savePostSchema.safeParse(input);

    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message || "The post data is invalid.",
      };
    }

    const post = await saveBlogPost(parsed.data);
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    if (parsed.data.sourceSlug && parsed.data.sourceSlug !== post.slug) {
      revalidatePath(`/blog/${parsed.data.sourceSlug}`);
    }
    revalidatePath("/sitemap.xml");

    return { ok: true, post };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "The post could not be saved.",
    };
  }
}

export async function deleteBlogPostAction(slug: string) {
  try {
    await requireAdminSession();
    const normalizedSlug = String(slug || "").trim();

    if (!normalizedSlug) {
      return { ok: false, error: "A post slug is required." };
    }

    await deleteBlogPost(normalizedSlug);
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${normalizedSlug}`);
    revalidatePath("/sitemap.xml");

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "The post could not be deleted.",
    };
  }
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
