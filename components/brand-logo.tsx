import Link from "next/link";
import { BRAND_NAME } from "@/lib/brand";

type BrandLogoProps = {
  href?: string;
  subtitle?: string;
  className?: string;
  mono?: boolean;
};

function MonogramMark({ mono = false }: { mono?: boolean }) {
  const stroke = mono ? "#8b6e56" : "#c7a56a";
  const fill = mono ? "#8b6e56" : "#184b38";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 96"
      className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10.5" y="6.5" width="75" height="83" rx="30" stroke={stroke} strokeWidth="1.5" />
      <path d="M48 6L50 10L54 12L50 14L48 18L46 14L42 12L46 10L48 6Z" fill={stroke} />
      <path d="M11 48L13 52L17 54L13 56L11 60L9 56L5 54L9 52L11 48Z" fill={stroke} />
      <path d="M85 48L87 52L91 54L87 56L85 60L83 56L79 54L83 52L85 48Z" fill={stroke} />
      <text
        x="48"
        y="41"
        textAnchor="middle"
        fontSize="20"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="1.2"
        fill={fill}
      >
        CWS
      </text>
      <path
        d="M24 57C29 65.8 36.8 70 47.2 70C57.6 70 65.5 65.9 72 57"
        stroke={fill}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <path
        d="M25.5 57H70.5"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2.4 4"
      />
    </svg>
  );
}

export function BrandLogo({
  href = "/",
  subtitle = "Beautiful wedding websites, built for you",
  className = "",
  mono = false
}: BrandLogoProps) {
  return (
    <Link href={href} className={`flex items-center gap-3 ${className}`}>
      <MonogramMark mono={mono} />
      <div className="min-w-0">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#8b6e56]">
          {BRAND_NAME}
        </p>
        <p className="mt-1 text-sm leading-tight text-[#4f463f] sm:text-base">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
