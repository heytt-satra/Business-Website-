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
    results: string[];
    featured: boolean;
}

export const projects: Project[] = [
    {
        slug: "finflow-saas",
        title: "FinFlow — SaaS Dashboard",
        category: "SaaS / MVP",
        tags: ["SaaS / MVP", "Web", "AI"],
        thumbnail: "/projects/finflow.jpg",
        shortDescription:
            "A real-time financial analytics dashboard for SMEs to track cash flow, invoices, and forecasts.",
        techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Chart.js"],
        challenge:
            "The client needed a way for small businesses to visualise their finances without enterprise-level complexity.",
        solution:
            "We built a clean, intuitive SaaS dashboard with real-time data syncing, automated invoice tracking, and AI-powered cash flow forecasting.",
        results: [
            "Launched in 6 weeks",
            "500+ users in first month",
            "30% reduction in late payments for users",
        ],
        featured: true,
    },
    {
        slug: "greenleaf-ecommerce",
        title: "GreenLeaf — E-commerce Platform",
        category: "Web",
        tags: ["Web"],
        thumbnail: "/projects/greenleaf.jpg",
        shortDescription:
            "A high-conversion e-commerce platform for an organic skincare brand with subscription capabilities.",
        techStack: ["Next.js", "Shopify API", "Tailwind CSS", "Stripe"],
        challenge:
            "The brand was losing customers due to a slow, outdated website with poor mobile experience.",
        solution:
            "We rebuilt from scratch with a mobile-first, performance-optimised storefront with one-click subscriptions and personalised recommendations.",
        results: [
            "65% increase in mobile conversions",
            "2.1s average page load",
            "40% subscription uptake",
        ],
        featured: true,
    },
    {
        slug: "taskpilot-app",
        title: "TaskPilot — Team Productivity App",
        category: "App",
        tags: ["App", "SaaS / MVP"],
        thumbnail: "/projects/taskpilot.jpg",
        shortDescription:
            "A project management tool with AI-powered task prioritisation and automated status updates.",
        techStack: ["React Native", "Node.js", "PostgreSQL", "OpenAI API"],
        challenge:
            "Remote teams were drowning in manual status updates and missed deadlines across multiple tools.",
        solution:
            "We built a unified task management app that uses AI to auto-prioritise work and sends intelligent status updates to stakeholders.",
        results: [
            "Adopted by 3 enterprise clients",
            "25% improvement in on-time delivery",
            "Built and launched in 8 weeks",
        ],
        featured: true,
    },
    {
        slug: "automail-automation",
        title: "AutoMail — Email Workflow Automation",
        category: "Automation",
        tags: ["Automation", "AI"],
        thumbnail: "/projects/automail.jpg",
        shortDescription:
            "End-to-end email automation system replacing 15 hours of weekly manual work for a logistics company.",
        techStack: ["n8n", "Airtable", "Gmail API", "OpenAI"],
        challenge:
            "The logistics team manually processed 200+ emails daily for order confirmations, tracking updates, and exceptions.",
        solution:
            "We designed an n8n pipeline that reads, classifies, and auto-responds to emails, escalating only edge cases to humans.",
        results: [
            "15 hours/week saved",
            "95% auto-response accuracy",
            "ROI positive in 2 weeks",
        ],
        featured: false,
    },
    {
        slug: "mediscan-ai",
        title: "MediScan — AI Document Processor",
        category: "AI",
        tags: ["AI", "App"],
        thumbnail: "/projects/mediscan.jpg",
        shortDescription:
            "An AI-powered medical document scanner that extracts, validates, and files patient records automatically.",
        techStack: ["Python", "LangChain", "Supabase", "React", "Gemini API"],
        challenge:
            "A healthcare startup needed to process thousands of handwritten prescriptions and lab reports daily.",
        solution:
            "We built a Gemini-powered OCR pipeline with intelligent validation, auto-filing, and exception flagging for human review.",
        results: [
            "10x processing speed improvement",
            "98.5% extraction accuracy",
            "Scaled to 5,000 documents/day",
        ],
        featured: false,
    },
    {
        slug: "brightpath-website",
        title: "BrightPath — EdTech Website",
        category: "Web",
        tags: ["Web"],
        thumbnail: "/projects/brightpath.jpg",
        shortDescription:
            "A stunning marketing website for an EdTech startup with integrated course booking and CMS.",
        techStack: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
        challenge:
            "The startup had no online presence and needed to launch fast before their funding round.",
        solution:
            "We designed and developed a conversion-optimised website with CMS-powered content, course booking, and SEO-friendly architecture.",
        results: [
            "Launched in 3 weeks",
            "Featured in TechCrunch India",
            "200% increase in demo bookings",
        ],
        featured: false,
    },
];
