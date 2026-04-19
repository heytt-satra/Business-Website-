export interface Project {
    slug: string;
    title: string;
    category: string;
    tags: string[];
    thumbnail: string;
    shortDescription: string;
    techStack: string[];
    challenge: string;
    solution: string;
    highlights: string[];
    results: string[];
    year: string;
    role: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        slug: "peerclub",
        title: "PeerClub",
        category: "Full-Stack Web App",
        tags: ["SaaS / MVP", "Web", "App"],
        thumbnail: "/projects/peerclub.jpg",
        shortDescription:
            "A private membership platform for startup founders. Verification, curated events, expert sessions, and realtime messaging in one gated product.",
        techStack: [
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Supabase",
            "PostgreSQL",
            "Tailwind CSS 4",
            "Framer Motion",
            "Three.js",
        ],
        challenge:
            "Founders had no trusted, gated space to meet other founders, book curated events, and access vetted experts. Public communities are noisy. Private WhatsApp groups are closed. Nothing in the middle was built for how founders actually operate, and no existing platform tied together verification, bookings, messaging, and moderation in a single product.",
        solution:
            "A full-stack membership platform built on Next.js and Supabase. Founders apply through a multi-step verification flow. Supabase Auth and middleware gate every route by account status (pending, approved, banned). Approved members get curated events, an expert marketplace with credit-based bookings, agency discovery, realtime messaging, and a profile with wallet and reviews. An internal admin console handles moderation, audit logs, credits, and events.",
        highlights: [
            "Multi-step founder verification with pending, approved, banned states",
            "Event discovery, booking, and waitlist handling",
            "Expert marketplace with credit-backed sessions and reviews",
            "Agency directory with categories and portfolio links",
            "Realtime member to member messaging",
            "Admin dashboard with moderation and audit support",
            "PWA with manifest, service worker, and installable assets",
        ],
        results: [
            "Multi-step founder verification flow",
            "Realtime messaging with credit-based bookings",
            "PWA ready with admin moderation console",
        ],
        year: "2025",
        role: "Full-Stack Build",
        featured: true,
    },
    {
        slug: "swarna-palace",
        title: "Swarna Palace",
        category: "Luxury E-commerce",
        tags: ["Web", "E-commerce"],
        thumbnail: "/projects/swarna-palace.jpg",
        shortDescription:
            "A custom Shopify storefront for a luxury jewelry brand. Editorial storytelling, recipient based shopping flows, and premium product pages.",
        techStack: [
            "Shopify",
            "Liquid",
            "JavaScript",
            "CSS",
            "GSAP",
            "ScrollTrigger",
            "Flip",
            "Lenis",
        ],
        challenge:
            "The brand needed a storefront that felt editorial and cinematic, not a stock theme. Existing Shopify themes gave them catalog pages and a generic cart. What they wanted was a premium merchandising experience, relationship based shopping flows (shop by recipient, shop by bond), and a cart and checkout that felt as considered as the jewelry itself.",
        solution:
            "A heavily customised Shopify Atelier theme rebuilt around editorial storytelling. Custom Liquid sections, JSON templates, animated collection filters, recipient and relationship based audience pages, and a premium product detail page with gallery, variants, and style-it-with cross-sell. Cart and checkout were rebuilt as custom pre-landing pages before handing off to Shopify's secure checkout.",
        highlights: [
            "Cinematic homepage with editorial storytelling modules",
            "Dynamic collections nav built from Shopify data",
            "Shop by recipient and shop by bond audience pages",
            "Animated filtering with async load-more",
            "Premium PDP with style-it-with cross-sell",
            "Custom cart review and checkout review pages",
            "Theme-editor-aware section init and rehydration",
        ],
        results: [
            "Shop by recipient and shop by bond flows",
            "Animated collection filters with load more",
            "Premium PDP with style-it-with cross-sell",
        ],
        year: "2025",
        role: "Theme Development",
        featured: true,
    },
    {
        slug: "profitpulse",
        title: "ProfitPulse",
        category: "AI SaaS Analytics",
        tags: ["SaaS / MVP", "AI", "Web"],
        thumbnail: "/projects/profitpulse.jpg",
        shortDescription:
            "An AI CFO for founders. Unifies data from Stripe, Shopify, Meta Ads, and Google Ads into a single profit dashboard with natural language analytics.",
        techStack: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS 4",
            "FastAPI",
            "PostgreSQL",
            "Supabase",
            "Celery",
            "Redis",
            "OpenAI",
            "Vanna.ai",
        ],
        challenge:
            "Founders were stitching together spreadsheets from Stripe, Shopify, and ad platforms to understand profit. There was no single place to see revenue, ROAS, and expenses together, and no way to ask a plain English question like 'which product had the best margin last month' without writing SQL or building a report.",
        solution:
            "A full-stack SaaS platform. Next.js frontend. FastAPI backend with Celery workers and Redis for async sync jobs. Supabase Auth with a workspace based multi-tenant model so data is scoped per business. OAuth flows for Stripe, Shopify, Meta Ads, and Google Ads, each with sync jobs and webhook triggered refreshes. An AI analyst powered by Vanna and OpenAI converts natural language into validated read only SQL, then returns charts and plain English summaries.",
        highlights: [
            "AI financial chat that compiles validated read-only SQL",
            "Unified dashboard for revenue, profit, expenses, and ROAS",
            "OAuth and sync architecture for Stripe, Shopify, Meta, Google",
            "Multi-workspace session handling with role-based access",
            "Onboarding for currency and Morning Pulse preferences",
            "Saved queries and custom dashboards on the backend",
            "Waitlist-enabled landing page for early access",
        ],
        results: [
            "Unified dashboard for revenue, profit, ROAS",
            "Natural language AI financial analyst",
            "OAuth sync for Stripe, Shopify, Meta, Google Ads",
        ],
        year: "2025",
        role: "Full-Stack SaaS Build",
        featured: true,
    },
    {
        slug: "teraindustries",
        title: "TeraIndustries",
        category: "Website Design & Development",
        tags: ["Web"],
        thumbnail: "/projects/teraindustries.jpg",
        shortDescription:
            "The site you are on right now. A custom agency website focused on brand positioning, service storytelling, and lead generation.",
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "GSAP",
            "Lenis",
            "Three.js",
            "Matter.js",
        ],
        challenge:
            "Agency websites tend to look the same. Generic hero, services list, case studies, contact form. We wanted a site that matched the quality of the work itself: motion rich, interactive, content dense, and engineered to feel premium on both desktop and mobile without relying on stock templates or themes.",
        solution:
            "A Next.js site built from scratch with a motion-rich frontend. A WebGL hills hero. A Matter.js physics canvas for the featured work tiles that drops the tiles into position as the section scrolls into view. A structured case study system powered by the same data model, a blog publishing workflow, and an SEO ready content architecture across every page.",
        highlights: [
            "GLSL hills hero with custom vertex shaders",
            "Matter.js physics drop for the featured work tiles",
            "Structured case study system from a shared data model",
            "Blog publishing workflow with admin editor",
            "Motion-rich interactions across every section",
            "Fluid typography and mobile optimised throughout",
        ],
        results: [
            "Interactive featured work section",
            "Blog CMS and lead capture flow",
            "Premium UI with SEO ready structure",
        ],
        year: "2026",
        role: "Design and Development",
        featured: true,
    },
    {
        slug: "scale-your-dreams",
        title: "Scale Your Dreams",
        category: "Website Design & Development",
        tags: ["Web"],
        thumbnail: "/projects/scale-your-dreams.jpg",
        shortDescription:
            "A premium personal branding agency site. Built around a social feed inspired interface instead of a traditional agency layout.",
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
        ],
        challenge:
            "The agency works on personal branding, so the site had to feel personal. Template agency layouts (hero, services, testimonials, contact) would have contradicted the brand story the team tells its clients, which is that personal identity beats corporate polish.",
        solution:
            "A social feed inspired interface. Responsive sidebars that frame the content the way a social app would. Interactive service cards, testimonial threads that mimic the rhythm of social posts, and booking and contact flows integrated into the feed experience instead of siloed on contact pages.",
        highlights: [
            "Social feed inspired UI with responsive sidebars",
            "Interactive service carousel",
            "Testimonial thread component",
            "Booking widget and contact integrations",
            "Premium brand identity with strong visual system",
        ],
        results: [
            "Social feed inspired UI",
            "Testimonial thread and booking widget",
            "Fully responsive premium branding",
        ],
        year: "2025",
        role: "Design and Development",
        featured: true,
    },
    {
        slug: "advocate-prateek",
        title: "Advocate Prateek",
        category: "Website Design & Development",
        tags: ["Web"],
        thumbnail: "/projects/advocate-prateek.jpg",
        shortDescription:
            "A premium multi page law firm site with motion rich UI, 3D visuals, and dedicated NRI services storytelling.",
        techStack: [
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "Framer Motion",
            "Three.js",
            "React Three Fiber",
            "Drei",
        ],
        challenge:
            "A high end law firm needed a site that communicated authority and international reach, with a dedicated experience for NRI clients who rely entirely on remote legal representation. Standard legal templates would have undercut the positioning the firm was trying to build.",
        solution:
            "A cinematic multi page experience with a gold and navy brand system, serif typography, and Three.js animated backgrounds. A dedicated NRI services page with a globe based visual section, and structured pages for practice areas, team, office locations, careers, and grievance support. Every page was built as a considered brand surface.",
        highlights: [
            "Cinematic multi page architecture",
            "Three.js animated 3D backgrounds",
            "Globe based NRI services experience",
            "Practice area, team, offices, careers pages",
            "Grievance and consultation request flows",
            "Premium gold and navy brand system",
        ],
        results: [
            "Cinematic multi page architecture",
            "Three.js animated 3D backgrounds",
            "Dedicated NRI services experience",
        ],
        year: "2025",
        role: "Design and Development",
        featured: true,
    },
    {
        slug: "blackboard-communications",
        title: "Blackboard Communications",
        category: "Website Design & Development",
        tags: ["Web"],
        thumbnail: "/projects/blackboard.jpg",
        shortDescription:
            "A one page agency site for a brand experience company. WebGL visuals, interactive service sections, and a circular portfolio gallery.",
        techStack: [
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Tailwind CSS 4",
            "GSAP",
            "Motion",
            "Three.js",
            "OGL",
        ],
        challenge:
            "An experiential marketing agency needed a site as immersive as its events. Conventional agency templates would have undersold what the team actually builds in the real world. Activations, installations, live brand experiences.",
        solution:
            "A dark theme Next.js site with a custom WebGL beam hero background, interactive card swap services section, a circular portfolio gallery instead of a standard grid, tilted 3D team profile cards, a responsive header with mobile menu, and a lead generation contact flow. The visual system leans on deep black with an orange accent to feel high impact.",
        highlights: [
            "Custom WebGL beam hero background",
            "Card swap services section",
            "Circular portfolio gallery",
            "Tilted 3D team profile cards",
            "Responsive header and mobile menu",
            "Lead generation contact section",
        ],
        results: [
            "Custom WebGL beam hero",
            "Interactive circular portfolio gallery",
            "3D style team section",
        ],
        year: "2025",
        role: "Design and Development",
        featured: true,
    },
    {
        slug: "ssbe",
        title: "SS Business Enablers",
        category: "Corporate Website",
        tags: ["Web"],
        thumbnail: "/projects/ssbe.jpg",
        shortDescription:
            "A corporate site for a document digitization and business process services company. Service presentation, trust building content, validated lead capture.",
        techStack: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS 4",
            "Framer Motion",
            "React Hook Form",
            "Zod",
            "EmailJS",
        ],
        challenge:
            "SSBE needed a business ready web presence that communicated trust to enterprise and government clients while capturing qualified inbound enquiries. Existing template sites undersold the scale of work the company does (document scanning, DMS, data processing, health claims, manpower, government solutions).",
        solution:
            "A professional multi page corporate site with strong service storytelling and trust building sections for leadership, certifications, testimonials, and sectors served. A validated contact flow powered by React Hook Form, Zod, and EmailJS. Privacy policy and terms pages round out a complete business ready presence.",
        highlights: [
            "Multi page corporate architecture",
            "Service presentation for 6 service lines",
            "Leadership, certifications, and testimonials sections",
            "Sectors served and client logo wall",
            "Validated contact form with EmailJS",
            "Privacy policy and terms pages",
        ],
        results: [
            "Multi page corporate architecture",
            "Trust building credential sections",
            "Validated EmailJS powered contact form",
        ],
        year: "2025",
        role: "Design and Development",
        featured: true,
    },
];
