import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About TeraIndustries. The Team Behind the Products",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
