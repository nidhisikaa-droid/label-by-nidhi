import Link from "next/link";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  count,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  count?: number;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white grain">
      <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-hot/35 blur-[110px]" />
      <div className="absolute -bottom-32 -right-10 w-96 h-96 rounded-full bg-volt/35 blur-[120px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <nav className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-6">
          <Link href="/" className="hover:text-hot">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">{title}</span>
        </nav>

        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-4">
            {eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.88]">
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-gradient-brand">{accent}</span>
              </>
            )}
          </h1>
          <p className="mt-5 text-white/65 max-w-2xl leading-relaxed text-sm sm:text-base">
            {description}
          </p>
          {typeof count === "number" && (
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/45">
              {count} pieces
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
