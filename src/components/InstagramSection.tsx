import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const POSTS = [
  { id: "photo-1483985988355-763728e1935b", likes: "12.4k", caption: "Studio day in the Neon Riot" },
  { id: "photo-1469334031218-e382a71b716b", likes: "9.8k", caption: "Resort Heat lookbook" },
  { id: "photo-1515886657613-9f3515b0c78f", likes: "15.2k", caption: "Confidence, styled" },
  { id: "photo-1487222477894-8943e31ef7b2", likes: "8.1k", caption: "Power Dressing diaries" },
  { id: "photo-1490481651871-ab68de25d43d", likes: "18.6k", caption: "Neon Nights campaign" },
  { id: "photo-1445205170230-053b83016050", likes: "11.3k", caption: "Everyday Icons" },
];

export default function InstagramSection() {
  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.35em] text-grape font-semibold mb-4">
            @labelbynidhi
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.9]">
            SEEN ON <span className="text-gradient-brand">THE FEED</span>
          </h2>
          <p className="mt-4 text-ink/60 text-sm sm:text-base">
            Tag us in your fits for a chance to be featured. 240k+ strong and
            counting.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {POSTS.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square rounded-xl overflow-hidden bg-smoke"
              >
                <Image
                  src={`https://images.unsplash.com/${post.id}?auto=format&fit=crop&w=600&q=80`}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p className="text-white text-[11px] font-semibold leading-snug">
                    ♥ {post.likes}
                  </p>
                  <p className="text-white/80 text-[10px] mt-0.5 leading-snug">
                    {post.caption}
                  </p>
                </div>
                <span className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5z" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Follow @labelbynidhi
          </Link>
        </div>
      </div>
    </section>
  );
}
