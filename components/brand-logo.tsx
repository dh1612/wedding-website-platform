import Link from "next/link";

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
      <path
        d="M30 24.5V58.5M30 42.5C36.2 42.5 40.9 39.1 44.6 34.1C48.7 28.6 52 25.5 59.2 25.5C65.7 25.5 69.4 29.8 69.4 35.6C69.4 41.9 65 46.7 58.9 46.7C52.5 46.7 49.6 42.8 45.8 37.9C42.2 33.2 38.3 29.9 31.4 29.9"
        stroke={fill}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.5 24.5H22.5M33.5 41.5L21.5 58.5M33.5 58.5H22.5"
        stroke={fill}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43 55L50.8 83L58.6 55L66.4 83L74.2 55"
        stroke={fill}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        <p className="text-[11px] uppercase tracking-[0.34em] text-[#8b6e56]">
          knotlesswed.ie
        </p>
        <p className="mt-1 text-base font-semibold leading-tight text-[#1f1d1a] sm:text-lg">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
