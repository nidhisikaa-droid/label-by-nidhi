"use client";

import Link from "next/link";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="relative overflow-hidden bg-ink text-white grain">
      {/* Glow blobs */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-hot/30 blur-[110px]" />
      <div className="absolute -bottom-40 right-0 w-[28rem] h-[28rem] rounded-full bg-volt/30 blur-[130px]" />
      <div className="absolute top-1/3 left-1/2 w-72 h-72 rounded-full bg-grape/25 blur-[100px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-hot font-semibold mb-5">
            The Inner Circle
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.9]">
            GET <span className="text-gradient-warm">15% OFF</span>
            <br />
            YOUR FIRST DROP
          </h2>
          <p className="mt-5 text-white/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Early access to drops, private sale previews and outfit inspiration
            straight from the studio. No spam — just the good stuff.
          </p>

          {done ? (
            <div className="mt-9 mx-auto max-w-md rounded-2xl border border-white/15 bg-white/5 p-6">
              <div className="text-3xl mb-2">🎉</div>
              <p className="font-display text-2xl text-hot">YOU’RE IN!</p>
              <p className="text-sm text-white/70 mt-2">
                Check your inbox — your 15% code is waiting.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
              className="mt-9 mx-auto max-w-md"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-hot focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="px-7 py-4 rounded-full bg-hot text-white font-bold text-xs tracking-[0.16em] uppercase hover:bg-white hover:text-ink transition-colors duration-300"
                >
                  Join
                </button>
              </div>
              <p className="text-[11px] text-white/40 mt-3">
                By subscribing you agree to our{" "}
                <Link href="/about" className="underline hover:text-hot">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
