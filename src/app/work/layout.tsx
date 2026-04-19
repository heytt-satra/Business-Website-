import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Work. Products Built by TeraIndustries",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
