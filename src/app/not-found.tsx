import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-items-center bg-ink text-white grain relative overflow-hidden px-4 py-20">
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-hot/30 blur-[130px]" />
      <div className="absolute -bottom-40 -right-10 w-[28rem] h-[28rem] rounded-full bg-volt/30 blur-[130px]" />

      <div className="relative text-center max-w-xl">
        <p className="font-display text-[clamp(5rem,20vw,12rem)] leading-none text-gradient-brand">
          404
        </p>
        <h1 className="font-display text-3xl sm:text-5xl mt-2 leading-[0.92]">
          PAGE NOT
          <br />
          <span className="text-gradient-warm">FOUND</span>
        </h1>
        <p className="text-white/65 mt-5 text-sm sm:text-base leading-relaxed">
          This link went out of style. Let’s get you back to something worth
          wearing.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-4 rounded-full bg-hot text-white font-bold text-xs tracking-[0.16em] uppercase hover:bg-white hover:text-ink transition-colors"
          >
            Back Home
          </Link>
          <Link
            href="/new-arrivals"
            className="inline-flex items-center px-8 py-4 rounded-full border-2 border-white/30 font-bold text-xs tracking-[0.16em] uppercase hover:border-white hover:bg-white hover:text-ink transition-all"
          >
            Shop New In
          </Link>
        </div>
      </div>
    </section>
  );
}
