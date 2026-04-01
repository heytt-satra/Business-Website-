import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const SUPPORTED_EXTENSIONS = [".mdx", ".md"];
const DEFAULT_AUTHOR = "Tera Industries";
const DEFAULT_CATEGORY = "Business Tech";

export type BlogStatus = "draft" | "published";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  tags: string[];
  status: BlogStatus;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  metaTitle: string;
  metaDescription: string;
  readingMinutes: number;
  readTime: string;
  content: string;
  plainText: string;
}

export interface SaveBlogPostInput {
  sourceSlug?: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  author?: string;
  coverImage?: string;
  tags?: string[];
  status?: BlogStatus;
  featured?: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
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

function normalizeDate(value: unknown, fallback = todayIsoDate()) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return trimmed;
    }

    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
  }

  return fallback;
}

function parseStringList(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function coerceBoolean(value: unknown) {
  return value === true || value === "true";
}

function stripHtml(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadingMinutes(plainText: string) {
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function createExcerpt(plainText: string) {
  if (plainText.length <= 165) {
    return plainText;
  }

  return `${plainText.slice(0, 162).trimEnd()}...`;
}

function normalizeContent(html: string) {
  const trimmed = html.trim();
  return trimmed.length > 0 ? trimmed : "<p></p>";
}

async function ensureBlogDirectory() {
  await fs.mkdir(BLOG_DIRECTORY, { recursive: true });
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolvePostPath(slug: string) {
  const normalizedSlug = slugify(slug);

  for (const extension of SUPPORTED_EXTENSIONS) {
    const candidate = path.join(BLOG_DIRECTORY, `${normalizedSlug}${extension}`);
    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  return null;
}

async function readPostFile(filePath: string): Promise<BlogPost> {
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const fallbackSlug = path.basename(filePath, path.extname(filePath));
  const slug = slugify(String(data.slug || fallbackSlug));
  const body = normalizeContent(content);
  const plainText = stripHtml(body);
  const excerpt = String(data.excerpt || createExcerpt(plainText));
  const readingMinutes = estimateReadingMinutes(plainText);
  const publishedAt = normalizeDate(data.publishedAt, todayIsoDate());

  return {
    slug,
    title: String(data.title || slug),
    excerpt,
    category: String(data.category || DEFAULT_CATEGORY),
    author: String(data.author || DEFAULT_AUTHOR),
    coverImage: String(data.coverImage || ""),
    tags: parseStringList(data.tags),
    status: data.status === "draft" ? "draft" : "published",
    featured: coerceBoolean(data.featured),
    publishedAt,
    updatedAt: normalizeDate(data.updatedAt, publishedAt),
    metaTitle: String(data.metaTitle || data.title || slug),
    metaDescription: String(data.metaDescription || excerpt),
    readingMinutes,
    readTime: `${readingMinutes} min read`,
    content: body,
    plainText,
  };
}

function sortPosts(posts: BlogPost[]) {
  return posts.sort((left, right) => {
    const leftTime = new Date(left.publishedAt).getTime();
    const rightTime = new Date(right.publishedAt).getTime();

    if (rightTime !== leftTime) {
      return rightTime - leftTime;
    }

    return right.updatedAt.localeCompare(left.updatedAt);
  });
}

export async function getAllBlogPosts(options: { includeDrafts?: boolean } = {}) {
  await ensureBlogDirectory();
  const entries = await fs.readdir(BLOG_DIRECTORY, { withFileTypes: true });
  const filePaths = entries
    .filter((entry) => entry.isFile() && SUPPORTED_EXTENSIONS.includes(path.extname(entry.name)))
    .map((entry) => path.join(BLOG_DIRECTORY, entry.name));

  const posts = await Promise.all(filePaths.map((filePath) => readPostFile(filePath)));
  const filteredPosts = options.includeDrafts ? posts : posts.filter((post) => post.status === "published");
  return sortPosts(filteredPosts);
}

export async function getBlogPostBySlug(slug: string, options: { includeDrafts?: boolean } = {}) {
  const postPath = await resolvePostPath(slug);
  if (!postPath) {
    return null;
  }

  const post = await readPostFile(postPath);
  if (!options.includeDrafts && post.status !== "published") {
    return null;
  }

  return post;
}

async function deleteStalePostFiles(sourceSlug: string, targetSlug: string) {
  if (!sourceSlug || sourceSlug === targetSlug) {
    return;
  }

  for (const extension of SUPPORTED_EXTENSIONS) {
    const candidate = path.join(BLOG_DIRECTORY, `${sourceSlug}${extension}`);
    if (await fileExists(candidate)) {
      await fs.unlink(candidate);
    }
  }
}

export async function saveBlogPost(input: SaveBlogPostInput) {
  await ensureBlogDirectory();

  const title = input.title.trim();
  const slug = slugify(input.slug || title);
  const sourceSlug = slugify(input.sourceSlug || slug);

  if (!title) {
    throw new Error("A post title is required.");
  }

  if (!slug) {
    throw new Error("A post slug is required.");
  }

  const existingTarget = await getBlogPostBySlug(slug, { includeDrafts: true });
  if (existingTarget && existingTarget.slug !== sourceSlug) {
    throw new Error("Another post already uses this slug.");
  }

  const content = normalizeContent(input.content);
  const excerptSource = stripHtml(content);
  const excerpt = input.excerpt?.trim() || createExcerpt(excerptSource);
  const publishedAt = normalizeDate(input.publishedAt, todayIsoDate());
  const targetPath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
  const frontmatter = {
    title,
    slug,
    excerpt,
    category: input.category?.trim() || DEFAULT_CATEGORY,
    author: input.author?.trim() || DEFAULT_AUTHOR,
    coverImage: input.coverImage?.trim() || "",
    tags: (input.tags || []).map((tag) => tag.trim()).filter(Boolean),
    status: input.status === "draft" ? "draft" : "published",
    featured: Boolean(input.featured),
    publishedAt,
    updatedAt: todayIsoDate(),
    metaTitle: input.metaTitle?.trim() || title,
    metaDescription: input.metaDescription?.trim() || excerpt,
  };

  const fileContents = matter.stringify(content, frontmatter);
  await fs.writeFile(targetPath, fileContents, "utf8");
  await deleteStalePostFiles(sourceSlug, slug);

  const savedPost = await getBlogPostBySlug(slug, { includeDrafts: true });
  if (!savedPost) {
    throw new Error("The post was saved but could not be reloaded.");
  }

  return savedPost;
}

export async function deleteBlogPost(slug: string) {
  const normalizedSlug = slugify(slug);
  const postPath = await resolvePostPath(normalizedSlug);
  if (!postPath) {
    return false;
  }

  await fs.unlink(postPath);
  return true;
}

export function getBlogCategories(posts: BlogPost[]) {
  return ["All", ...Array.from(new Set(posts.map((post) => post.category)))];
}

export function getRelatedBlogPosts(posts: BlogPost[], slug: string, limit = 3) {
  const currentPost = posts.find((post) => post.slug === slug);
  if (!currentPost) {
    return posts.slice(0, limit);
  }

  return posts
    .filter((post) => post.slug !== slug)
    .sort((left, right) => {
      const leftScore = left.category === currentPost.category ? 1 : 0;
      const rightScore = right.category === currentPost.category ? 1 : 0;
      return rightScore - leftScore;
    })
    .slice(0, limit);
}
