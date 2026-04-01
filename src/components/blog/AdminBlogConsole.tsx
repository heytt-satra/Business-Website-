"use client";

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import { FilePlus2, LogOut, Search, Sparkles, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/blog/RichTextEditor";
import {
  deleteBlogPostAction,
  logoutAdminAction,
  saveBlogPostAction,
} from "@/app/admin/blog/actions";
import type { BlogPost, BlogStatus } from "@/lib/blog";

interface EditorDraft {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  tagsInput: string;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  featured: boolean;
  status: BlogStatus;
  content: string;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createEmptyDraft(): EditorDraft {
  return {
    title: "",
    slug: "",
    excerpt: "",
    category: "Business Tech",
    author: "Tera Industries",
    coverImage: "",
    tagsInput: "",
    publishedAt: todayIsoDate(),
    metaTitle: "",
    metaDescription: "",
    featured: false,
    status: "draft",
    content: "<h2>Start with the real angle</h2><p>Write the opening exactly like you would in Medium: direct, useful, and opinionated.</p>",
  };
}

function createDraftFromPost(post: BlogPost | null): EditorDraft {
  if (!post) {
    return createEmptyDraft();
  }

  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    coverImage: post.coverImage,
    tagsInput: post.tags.join(", "),
    publishedAt: post.publishedAt,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    featured: post.featured,
    status: post.status,
    content: post.content,
  };
}

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((left, right) => {
    const leftTime = new Date(left.publishedAt).getTime();
    const rightTime = new Date(right.publishedAt).getTime();
    return rightTime - leftTime || right.updatedAt.localeCompare(left.updatedAt);
  });
}

function countWords(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function StatusPill({ status }: { status: BlogStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
        status === "published" ? "bg-cyan/12 text-accent" : "bg-amber-100 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminBlogConsole({
  initialPosts,
  adminEmail,
}: {
  initialPosts: BlogPost[];
  adminEmail: string;
}) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(() => sortPosts(initialPosts));
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialPosts[0]?.slug ?? null);
  const [draft, setDraft] = useState<EditorDraft>(() => createDraftFromPost(initialPosts[0] ?? null));
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSlugDirty, setIsSlugDirty] = useState(Boolean(initialPosts[0]));
  const deferredSearch = useDeferredValue(search);
  const [isPending, startTransition] = useTransition();

  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === selectedSlug) ?? null,
    [posts, selectedSlug]
  );

  useEffect(() => {
    setPosts(sortPosts(initialPosts));
  }, [initialPosts]);

  useEffect(() => {
    setDraft(createDraftFromPost(selectedPost));
    setFeedback(null);
    setError(null);
    setIsSlugDirty(Boolean(selectedPost));
  }, [selectedPost]);

  const filteredPosts = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      return [post.title, post.excerpt, post.category, post.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [deferredSearch, posts]);

  const wordCount = useMemo(() => countWords(draft.content), [draft.content]);

  function updateDraft<K extends keyof EditorDraft>(key: K, value: EditorDraft[K]) {
    setDraft((currentDraft) => {
      const nextDraft = { ...currentDraft, [key]: value };

      if (key === "title" && !isSlugDirty) {
        nextDraft.slug = slugify(String(value));
      }

      return nextDraft;
    });
  }

  function handleNewPost() {
    setSelectedSlug(null);
    setDraft(createEmptyDraft());
    setFeedback(null);
    setError(null);
    setIsSlugDirty(false);
  }

  function persistPost(statusOverride?: BlogStatus) {
    const nextStatus = statusOverride ?? draft.status;

    setError(null);
    setFeedback(null);

    startTransition(async () => {
      const result = await saveBlogPostAction({
        sourceSlug: selectedPost?.slug,
        title: draft.title,
        slug: draft.slug,
        excerpt: draft.excerpt,
        category: draft.category,
        author: draft.author,
        coverImage: draft.coverImage,
        tags: draft.tagsInput
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        publishedAt: draft.publishedAt,
        metaTitle: draft.metaTitle,
        metaDescription: draft.metaDescription,
        featured: draft.featured,
        status: nextStatus,
        content: draft.content,
      });

      if (!result.ok || !result.post) {
        setError(result.error || "The post could not be saved.");
        return;
      }

      setPosts((currentPosts) => {
        const nextPosts = currentPosts.filter(
          (post) => post.slug !== selectedPost?.slug && post.slug !== result.post?.slug
        );
        nextPosts.push(result.post);
        return sortPosts(nextPosts);
      });
      setSelectedSlug(result.post.slug);
      setDraft(createDraftFromPost(result.post));
      setFeedback(nextStatus === "published" ? "Post published." : "Draft saved.");
      setIsSlugDirty(true);
      router.refresh();
    });
  }

  function handleDeletePost() {
    if (!selectedPost) {
      return;
    }

    if (!window.confirm(`Delete "${selectedPost.title}"? This removes the local content file.`)) {
      return;
    }

    setError(null);
    setFeedback(null);

    startTransition(async () => {
      const result = await deleteBlogPostAction(selectedPost.slug);

      if (!result.ok) {
        setError(result.error || "The post could not be deleted.");
        return;
      }

      const nextPosts = posts.filter((post) => post.slug !== selectedPost.slug);
      setPosts(sortPosts(nextPosts));
      setSelectedSlug(nextPosts[0]?.slug ?? null);
      setDraft(createDraftFromPost(nextPosts[0] ?? null));
      setFeedback("Post deleted.");
      router.refresh();
    });
  }

  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,#F4F8FB_0%,#EEF5FA_100%)] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="rounded-[36px] border border-white/70 bg-white/80 p-4 shadow-[0_24px_80px_rgba(12,35,64,0.08)] backdrop-blur-xl sm:p-6">
          <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Internal publishing</p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-primary sm:text-4xl">
                Team blog console
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                Write here like a normal article editor, then publish directly into the site&apos;s SEO pages.
                Everything saves to local content files so the setup stays free.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-border bg-white px-4 py-2 text-sm text-primary shadow-sm">
                Signed in as <span className="font-semibold">{adminEmail}</span>
              </div>
              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </form>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="overflow-hidden rounded-[30px] border border-border bg-[#F8FBFE]">
              <div className="border-b border-border px-4 py-4">
                <button
                  type="button"
                  onClick={handleNewPost}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
                >
                  <FilePlus2 size={16} />
                  New post
                </button>

                <label className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted">
                  <Search size={16} />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search posts"
                    className="w-full bg-transparent text-primary outline-none placeholder:text-muted"
                  />
                </label>
              </div>

              <div className="max-h-[70vh] overflow-y-auto px-2 py-2">
                {filteredPosts.map((post) => {
                  const isActive = post.slug === selectedSlug;

                  return (
                    <button
                      key={post.slug}
                      type="button"
                      onClick={() => setSelectedSlug(post.slug)}
                      className={`mb-2 w-full rounded-[24px] border px-4 py-4 text-left transition-all ${
                        isActive
                          ? "border-accent bg-white shadow-[0_16px_28px_rgba(12,35,64,0.08)]"
                          : "border-transparent bg-transparent hover:border-border hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <StatusPill status={post.status} />
                        {post.featured ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                            <Sparkles size={12} />
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <h2 className="mt-3 text-base font-semibold leading-6 text-primary">{post.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{post.excerpt}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted">
                        <span>{post.category}</span>
                        <span>{post.publishedAt}</span>
                      </div>
                    </button>
                  );
                })}

                {filteredPosts.length === 0 ? (
                  <div className="rounded-[24px] border border-dashed border-border bg-white/70 px-4 py-8 text-center text-sm text-muted">
                    No matching posts.
                  </div>
                ) : null}
              </div>
            </aside>

            <div className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-[30px] border border-border bg-white p-5 shadow-[0_18px_36px_rgba(12,35,64,0.05)]">
                  <div className="grid gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">Title</label>
                      <input
                        type="text"
                        value={draft.title}
                        onChange={(event) => updateDraft("title", event.target.value)}
                        placeholder="How to structure an MVP roadmap that actually ships"
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">Slug</label>
                      <input
                        type="text"
                        value={draft.slug}
                        onChange={(event) => {
                          setIsSlugDirty(true);
                          updateDraft("slug", slugify(event.target.value));
                        }}
                        placeholder="how-to-structure-an-mvp-roadmap"
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">Excerpt</label>
                      <textarea
                        value={draft.excerpt}
                        onChange={(event) => updateDraft("excerpt", event.target.value)}
                        rows={4}
                        placeholder="One concise summary for cards, search results, and social previews."
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] border border-border bg-white p-5 shadow-[0_18px_36px_rgba(12,35,64,0.05)]">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">Category</label>
                      <input
                        type="text"
                        value={draft.category}
                        onChange={(event) => updateDraft("category", event.target.value)}
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">Author</label>
                      <input
                        type="text"
                        value={draft.author}
                        onChange={(event) => updateDraft("author", event.target.value)}
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">Publish date</label>
                      <input
                        type="date"
                        value={draft.publishedAt}
                        onChange={(event) => updateDraft("publishedAt", event.target.value)}
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">Tags</label>
                      <input
                        type="text"
                        value={draft.tagsInput}
                        onChange={(event) => updateDraft("tagsInput", event.target.value)}
                        placeholder="MVP, SaaS, Launch"
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-primary">Cover image path</label>
                      <input
                        type="text"
                        value={draft.coverImage}
                        onChange={(event) => updateDraft("coverImage", event.target.value)}
                        placeholder="/blog/cover-image.jpg"
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>

                    <label className="sm:col-span-2 flex items-center gap-3 rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary">
                      <input
                        type="checkbox"
                        checked={draft.featured}
                        onChange={(event) => updateDraft("featured", event.target.checked)}
                        className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                      />
                      Mark as featured on the blog index
                    </label>
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-border bg-white p-5 shadow-[0_18px_36px_rgba(12,35,64,0.05)]">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary">Article body</p>
                    <p className="text-sm text-muted">
                      {wordCount} words. This content is rendered directly on the public blog page.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => persistPost("draft")}
                      disabled={isPending}
                      className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Save draft
                    </button>
                    <button
                      type="button"
                      onClick={() => persistPost("published")}
                      disabled={isPending}
                      className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isPending ? "Saving..." : "Publish"}
                    </button>
                    {selectedPost ? (
                      <button
                        type="button"
                        onClick={handleDeletePost}
                        disabled={isPending}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>

                <RichTextEditor
                  content={draft.content}
                  onChange={(nextContent) => updateDraft("content", nextContent)}
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-[30px] border border-border bg-white p-5 shadow-[0_18px_36px_rgba(12,35,64,0.05)]">
                  <p className="text-sm font-semibold text-primary">SEO</p>
                  <div className="mt-4 grid gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">SEO title</label>
                      <input
                        type="text"
                        value={draft.metaTitle}
                        onChange={(event) => updateDraft("metaTitle", event.target.value)}
                        placeholder="Optional override for search and social"
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">SEO description</label>
                      <textarea
                        value={draft.metaDescription}
                        onChange={(event) => updateDraft("metaDescription", event.target.value)}
                        rows={4}
                        placeholder="Optional override for search result copy"
                        className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] border border-border bg-white p-5 shadow-[0_18px_36px_rgba(12,35,64,0.05)]">
                  <p className="text-sm font-semibold text-primary">Publishing notes</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                    <li>The admin area is excluded from indexing in `robots.txt`.</li>
                    <li>Published posts appear in `sitemap.xml` automatically.</li>
                    <li>Content is stored in `content/blog` so it stays free and versioned with the site.</li>
                  </ul>

                  {feedback ? (
                    <p className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      {feedback}
                    </p>
                  ) : null}

                  {error ? (
                    <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
