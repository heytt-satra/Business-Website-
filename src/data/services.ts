import { Layers, Globe, Smartphone, Cpu, Zap, Rocket } from "lucide-react";

export const services = [
    {
        id: "saas_mvp",
        title: "SaaS MVP Design",
        icon: Layers,
        shortDescription: "From idea to working product in weeks",
        proofPoint: "Launched 15+ MVPs that raised funding",
        description:
            "We take your idea and craft a fully designed, investor-ready SaaS product — fast. UI/UX, prototyping, and handoff included.",
        features: [
            "User flow mapping",
            "Figma prototype",
            "Design system",
            "Developer-ready specs",
        ],
        cta: "Start Your MVP",
    },
    {
        id: "website_development",
        title: "Website Development",
        icon: Globe,
        shortDescription: "Fast, beautiful, conversion-optimised",
        proofPoint: "Average 40% increase in client conversions",
        description:
            "Performance-first, beautifully crafted websites that rank, convert, and impress.",
        features: [
            "Next.js / React",
            "SEO optimised",
            "Mobile-first",
            "CMS integration",
        ],
        cta: "Build My Website",
    },
    {
        id: "business_apps",
        title: "Business Apps",
        icon: Smartphone,
        shortDescription: "Custom tools built for how you work",
        proofPoint: "Saved teams 20+ hours per week on average",
        description:
            "Custom web and mobile applications tailored precisely to your business workflows.",
        features: [
            "Web apps",
            "Mobile apps",
            "Admin dashboards",
            "API integrations",
        ],
        cta: "Build My App",
    },
    {
        id: "ai_implementation",
        title: "AI Implementation",
        icon: Cpu,
        shortDescription: "Smart features powered by modern AI",
        proofPoint: "Integrated AI into 10+ production products",
        description:
            "Embed AI into your product or operations — chatbots, recommendation engines, document processing, and more.",
        features: [
            "OpenAI / Gemini APIs",
            "Custom AI pipelines",
            "RAG systems",
            "AI chatbots",
        ],
        cta: "Add AI to My Product",
    },
    {
        id: "business_automation",
        title: "Business Automation",
        icon: Zap,
        shortDescription: "Eliminate repetitive work permanently",
        proofPoint: "Automated 10,000+ hours of manual work",
        description:
            "We map, design, and implement automations that save your team hours every week.",
        features: [
            "n8n / Make / Zapier",
            "CRM automation",
            "Email workflows",
            "Data sync",
        ],
        cta: "Automate My Business",
    },
    {
        id: "mvps",
        title: "MVPs",
        icon: Rocket,
        shortDescription: "Validate your idea before you scale",
        proofPoint: "4-8 week average build time, launch-ready",
        description:
            "Full-stack MVPs built in 4-8 weeks. Enough to validate, demo, and raise funding.",
        features: [
            "Full-stack build",
            "Auth + payments",
            "Analytics",
            "Launch-ready",
        ],
        cta: "Launch My MVP",
    },
];
