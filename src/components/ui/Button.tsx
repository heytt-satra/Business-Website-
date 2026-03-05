import Link from "next/link";

interface ButtonProps {
    label: string;
    href?: string;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit";
    glow?: boolean;
}

export default function Button({
    label,
    href,
    variant = "primary",
    className = "",
    onClick,
    type = "button",
    glow = false,
}: ButtonProps) {
    const baseClasses =
        "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105";

    const variantClasses =
        variant === "primary"
            ? `bg-cyan text-navy hover:shadow-lg hover:shadow-cyan/25 ${glow ? "glow-pulse" : ""}`
            : "border-2 border-navy text-navy hover:bg-navy hover:text-white";

    const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {label}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedClasses}>
            {label}
        </button>
    );
}
