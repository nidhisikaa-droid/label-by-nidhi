import Rating from "./Rating";
import Reveal from "./Reveal";

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  product: string;
  date: string;
  verified?: boolean;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Aanya Sharma",
    location: "Mumbai",
    rating: 5,
    title: "The blazer everyone asks about",
    body: "I've never received this many compliments on a single piece. The Neon Riot Blazer fits like it was made for me — structured but not stiff. Worth every rupee.",
    product: "Neon Riot Blazer",
    date: "2026-09-14",
    verified: true,
  },
  {
    id: "r2",
    name: "Riya Kapoor",
    location: "Delhi",
    rating: 5,
    title: "Confidence in a dress",
    body: "The Confidence Slip Dress is unreal. The satin drapes beautifully and the color is even richer in person. Wore it to a wedding after-party and danced all night.",
    product: "Confidence Slip Dress",
    date: "2026-09-02",
    verified: true,
  },
  {
    id: "r3",
    name: "Dev Malhotra",
    location: "Bengaluru",
    rating: 5,
    title: "Best hoodie I own",
    body: "The Static Graphic Hoodie is heavy, soft and the print hasn't cracked after 10 washes. Sizing runs slightly oversized — took my usual M and it's perfect.",
    product: "Static Graphic Hoodie",
    date: "2026-08-27",
    verified: true,
  },
  {
    id: "r4",
    name: "Sara Khan",
    location: "Hyderabad",
    rating: 4,
    title: "Fast shipping, stunning packaging",
    body: "Everything arrived in two days with a handwritten note. The corset top is gorgeous. Only wish the size chart was more accurate — I sized up and it fits great.",
    product: "Electric Bloom Corset Top",
    date: "2026-08-19",
    verified: true,
  },
  {
    id: "r5",
    name: "Meher Gill",
    location: "Chandigarh",
    rating: 5,
    title: "My go-to for statement pieces",
    body: "Third order from LABEL BY NIDHI and the quality is consistently excellent. The Pink Panther Puffer is bold in the best way — warm, light and a total head-turner.",
    product: "Pink Panther Puffer",
    date: "2026-08-05",
    verified: true,
  },
  {
    id: "r6",
    name: "Arjun Nair",
    location: "Kochi",
    rating: 5,
    title: "Streetwear that actually fits",
    body: "Finally a brand that gets the oversized fit right. The Chrome Wave Denim Jacket layers over everything. Compliments every single time.",
    product: "Chrome Wave Denim Jacket",
    date: "2026-07-30",
    verified: true,
  },
  {
    id: "r7",
    name: "Tanya Bose",
    location: "Kolkata",
    rating: 5,
    title: "Runway energy, everyday comfort",
    body: "The Ultra Violet Cargo Pants are so comfortable I nearly slept in them. The color is vivid and hasn't faded. Already ordering the orange pair.",
    product: "Ultra Violet Cargo Pants",
    date: "2026-07-21",
    verified: true,
  },
  {
    id: "r8",
    name: "Kabir Sethi",
    location: "Pune",
    rating: 4,
    title: "Sneakers exceeded expectations",
    body: "The Stereo Statement Sneakers are even bolder in real life. Super cushioned — walked 20k steps in them on day one with zero break-in pain.",
    product: "Stereo Statement Sneakers",
    date: "2026-07-12",
    verified: true,
  },
  {
    id: "r9",
    name: "Ishita Verma",
    location: "Jaipur",
    rating: 5,
    title: "Wear your confidence — mean it",
    body: "This brand lives up to its slogan. The Afterglow Wrap Dress made me stand differently. Customer service was lovely when I needed a size exchange.",
    product: "Afterglow Wrap Dress",
    date: "2026-06-28",
    verified: true,
  },
];

const STAT_CARDS = [
  { value: "4.8/5", label: "Average rating", accent: "text-hot" },
  { value: "12,000+", label: "Verified reviews", accent: "text-grape" },
  { value: "96%", label: "Would buy again", accent: "text-volt" },
  { value: "48hr", label: "Avg. delivery", accent: "text-tango" },
];

export default function ReviewsSection() {
  const featured = reviews.slice(0, 6);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-hot font-semibold mb-4">
              ★ Verified Reviews
            </p>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.9]">
              LOVED BY
              <br />
              <span className="text-gradient-warm">THOUSANDS</span>
            </h2>
          </div>
          <a href="/reviews" className="btn-outline shrink-0">
            Read All Reviews →
          </a>
        </Reveal>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STAT_CARDS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-ink/10 p-5 sm:p-6 bg-cream/50 hover:border-ink/30 transition-colors">
                <p className={`font-display text-3xl sm:text-4xl ${s.accent}`}>
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm text-ink/60 mt-1.5">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Review cards */}
        <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.07}>
              <figure className="h-full rounded-2xl border border-ink/10 p-6 flex flex-col bg-white hover:shadow-[0_16px_50px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-400">
                <div className="flex items-center justify-between">
                  <Rating value={r.rating} className="text-tango" />
                  {r.verified && (
                    <span className="text-[10px] uppercase tracking-widest font-bold text-volt">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <blockquote className="mt-4 flex-1">
                  <p className="font-semibold text-[15px] mb-2">{r.title}</p>
                  <p className="text-sm text-ink/65 leading-relaxed">{r.body}</p>
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-ink/10 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-hot to-grape text-white grid place-items-center font-bold text-xs">
                    {r.name.charAt(0)}
                  </span>
                  <div className="text-xs">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-ink/50">
                      {r.location} · {r.product}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
