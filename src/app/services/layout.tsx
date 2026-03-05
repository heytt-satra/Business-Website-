import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services — MVP, SaaS, AI, Web & App Development",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
