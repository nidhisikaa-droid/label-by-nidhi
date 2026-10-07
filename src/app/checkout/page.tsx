"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/store";
import { getProduct, formatPrice } from "@/data/products";

type Step = 1 | 2 | 3;
type Form = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  payment: "card" | "upi" | "cod";
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  upiId: string;
};

const EMPTY: Form = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pin: "",
  payment: "card",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvv: "",
  upiId: "",
};

const FREE_SHIP = 2999;
const STEPS = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const { cart, hydrated, cartSubtotal, clearCart } = useStore();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [placing, setPlacing] = useState(false);
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const shipping = cartSubtotal >= FREE_SHIP ? 0 : 149;
  const total = cartSubtotal + shipping;

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validateStep = (s: Step): boolean => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (s === 1) {
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim()) e.lastName = "Required";
      if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
        e.phone = "10-digit mobile number";
      if (!form.address.trim()) e.address = "Required";
      if (!form.city.trim()) e.city = "Required";
      if (!form.state.trim()) e.state = "Required";
      if (!/^\d{6}$/.test(form.pin.trim())) e.pin = "6-digit PIN";
    }
    if (s === 2) {
      if (form.payment === "card") {
        if (form.cardNumber.replace(/\s/g, "").length !== 16)
          e.cardNumber = "16 digits";
        if (!form.cardName.trim()) e.cardName = "Required";
        if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) e.cardExpiry = "MM/YY";
        if (!/^\d{3,4}$/.test(form.cardCvv)) e.cardCvv = "3 digits";
      }
      if (form.payment === "upi" && !/^[\w.\-]+@[\w]+$/.test(form.upiId))
        e.upiId = "e.g. name@upi";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => (s + 1) as Step);
  };

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setOrderNo("LBN" + Date.now().toString().slice(-8));
      clearCart();
      setPlacing(false);
      window.scrollTo({ top: 0 });
    }, 1600);
  };

  /* ── Success ── */
  if (orderNo) {
    return (
      <section className="min-h-[70vh] grid place-items-center bg-cream py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg w-full text-center bg-white rounded-3xl border border-ink/10 p-8 sm:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-hot to-grape text-white grid place-items-center mx-auto text-4xl"
          >
            ✓
          </motion.div>
          <h1 className="font-display text-4xl sm:text-5xl mt-6 leading-[0.92]">
            ORDER
            <br />
            <span className="text-gradient-brand">CONFIRMED</span>
          </h1>
          <p className="text-ink/65 mt-4 text-sm leading-relaxed">
            Thank you, {form.firstName || "friend"}! Your confidence is on the
            way. A confirmation has been sent to{" "}
            <span className="font-semibold text-ink">{form.email}</span>.
          </p>

          <div className="mt-6 rounded-2xl bg-cream border border-ink/10 p-5 text-left space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-ink/55">Order number</span>
              <span className="font-bold">{orderNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/55">Estimated delivery</span>
              <span className="font-semibold">2–4 business days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/55">Shipping to</span>
              <span className="font-semibold text-right">
                {form.city}
                {form.pin ? ` – ${form.pin}` : ""}
              </span>
            </div>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/new-arrivals"
              className="px-7 py-3.5 rounded-full bg-hot text-white font-bold text-xs tracking-[0.16em] uppercase hover:bg-ink transition-colors"
            >
              Continue Shopping
            </Link>
            <Link href="/" className="btn-outline">
              Back To Home
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  /* ── Empty cart guard ── */
  if (hydrated && cart.length === 0) {
    return (
      <section className="min-h-[60vh] grid place-items-center bg-white py-16 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-5">🛍️</div>
          <h1 className="font-display text-4xl leading-tight">
            NOTHING TO
            <br />
            <span className="text-gradient-brand">CHECK OUT</span>
          </h1>
          <p className="text-ink/60 mt-4 text-sm">
            Your bag is empty — let’s change that.
          </p>
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            <Link
              href="/new-arrivals"
              className="px-7 py-3.5 rounded-full bg-hot text-white font-bold text-xs tracking-[0.16em] uppercase hover:bg-ink transition-colors"
            >
              Shop New Arrivals
            </Link>
            <Link href="/wishlist" className="btn-outline">
              View Wishlist
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl border border-ink/15 bg-white text-sm focus:outline-none focus:border-hot focus:ring-2 focus:ring-hot/15 transition-all";
  const errCls = "text-[11px] text-cherry mt-1 font-semibold";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white grain">
        <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-volt/35 blur-[110px]" />
        <div className="absolute -bottom-32 -left-10 w-96 h-96 rounded-full bg-hot/30 blur-[120px]" />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          <nav className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-5">
            <Link href="/" className="hover:text-hot">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/cart" className="hover:text-hot">
              Bag
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Checkout</span>
          </nav>

          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9]">
            SECURE
            <span className="text-gradient-brand"> CHECKOUT</span>
          </h1>

          {/* Step indicator */}
          <div className="mt-8 flex items-center gap-2 sm:gap-4 max-w-xl">
            {STEPS.map((s, i) => {
              const n = (i + 1) as Step;
              const active = step === n;
              const done = step > n;
              return (
                <div key={s} className="flex-1 flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`w-8 h-8 rounded-full grid place-items-center text-xs font-bold transition-all duration-300 ${
                        done
                          ? "bg-volt text-white"
                          : active
                            ? "bg-hot text-white"
                            : "bg-white/10 text-white/50"
                      }`}
                    >
                      {done ? "✓" : n}
                    </span>
                    <span
                      className={`text-[11px] uppercase tracking-widest font-semibold hidden sm:block ${
                        active ? "text-white" : "text-white/45"
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 bg-white/15 rounded overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-hot to-volt"
                        initial={{ width: 0 }}
                        animate={{ width: done ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
            {/* ── Form steps ── */}
            <div>
              <AnimatePresence mode="wait">
                {/* STEP 1 — Shipping */}
                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h2 className="font-display text-2xl sm:text-3xl mb-5">
                      01 — SHIPPING DETAILS
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          type="email"
                          className={`${inputCls} mt-1.5 ${errors.email ? "border-cherry" : ""}`}
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="you@email.com"
                        />
                        {errors.email && <p className={errCls}>{errors.email}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider">
                          First name
                        </label>
                        <input
                          className={`${inputCls} mt-1.5 ${errors.firstName ? "border-cherry" : ""}`}
                          value={form.firstName}
                          onChange={(e) => set("firstName", e.target.value)}
                        />
                        {errors.firstName && (
                          <p className={errCls}>{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider">
                          Last name
                        </label>
                        <input
                          className={`${inputCls} mt-1.5 ${errors.lastName ? "border-cherry" : ""}`}
                          value={form.lastName}
                          onChange={(e) => set("lastName", e.target.value)}
                        />
                        {errors.lastName && (
                          <p className={errCls}>{errors.lastName}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider">
                          Mobile number
                        </label>
                        <input
                          type="tel"
                          className={`${inputCls} mt-1.5 ${errors.phone ? "border-cherry" : ""}`}
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder="98765 43210"
                        />
                        {errors.phone && <p className={errCls}>{errors.phone}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider">
                          Address
                        </label>
                        <input
                          className={`${inputCls} mt-1.5 ${errors.address ? "border-cherry" : ""}`}
                          value={form.address}
                          onChange={(e) => set("address", e.target.value)}
                          placeholder="Flat, street, area"
                        />
                        {errors.address && (
                          <p className={errCls}>{errors.address}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider">
                          City
                        </label>
                        <input
                          className={`${inputCls} mt-1.5 ${errors.city ? "border-cherry" : ""}`}
                          value={form.city}
                          onChange={(e) => set("city", e.target.value)}
                        />
                        {errors.city && <p className={errCls}>{errors.city}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider">
                          State
                        </label>
                        <input
                          className={`${inputCls} mt-1.5 ${errors.state ? "border-cherry" : ""}`}
                          value={form.state}
                          onChange={(e) => set("state", e.target.value)}
                        />
                        {errors.state && <p className={errCls}>{errors.state}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider">
                          PIN code
                        </label>
                        <input
                          inputMode="numeric"
                          className={`${inputCls} mt-1.5 ${errors.pin ? "border-cherry" : ""}`}
                          value={form.pin}
                          onChange={(e) => set("pin", e.target.value)}
                          placeholder="400001"
                        />
                        {errors.pin && <p className={errCls}>{errors.pin}</p>}
                      </div>
                    </div>

                    <button
                      onClick={next}
                      className="mt-7 w-full sm:w-auto px-10 py-4 rounded-full bg-hot text-white font-bold text-xs tracking-[0.18em] uppercase hover:bg-ink transition-colors duration-300"
                    >
                      Continue to Payment →
                    </button>
                  </motion.div>
                )}

                {/* STEP 2 — Payment */}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h2 className="font-display text-2xl sm:text-3xl mb-5">
                      02 — PAYMENT
                    </h2>

                    {/* Method picker */}
                    <div className="grid sm:grid-cols-3 gap-3">
                      {(
                        [
                          { k: "card", t: "💳 Card", d: "Visa, Mastercard, Amex" },
                          { k: "upi", t: "📱 UPI", d: "GPay, PhonePe, Paytm" },
                          { k: "cod", t: "💵 Cash on Delivery", d: "Pay at your door" },
                        ] as const
                      ).map((m) => (
                        <button
                          key={m.k}
                          onClick={() => set("payment", m.k)}
                          className={`text-left rounded-2xl border-2 p-4 transition-all duration-300 ${
                            form.payment === m.k
                              ? "border-hot bg-hot/5 shadow-[0_8px_24px_rgba(255,46,147,0.15)]"
                              : "border-ink/10 hover:border-ink/30"
                          }`}
                        >
                          <p className="font-bold text-sm">{m.t}</p>
                          <p className="text-[11px] text-ink/55 mt-1">{m.d}</p>
                        </button>
                      ))}
                    </div>

                    {/* Fields */}
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      {form.payment === "card" && (
                        <>
                          <div className="sm:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider">
                              Card number
                            </label>
                            <input
                              inputMode="numeric"
                              className={`${inputCls} mt-1.5 ${errors.cardNumber ? "border-cherry" : ""}`}
                              value={form.cardNumber}
                              onChange={(e) =>
                                set(
                                  "cardNumber",
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 16)
                                    .replace(/(\d{4})(?=\d)/g, "$1 "),
                                )
                              }
                              placeholder="4242 4242 4242 4242"
                            />
                            {errors.cardNumber && (
                              <p className={errCls}>{errors.cardNumber}</p>
                            )}
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider">
                              Name on card
                            </label>
                            <input
                              className={`${inputCls} mt-1.5 ${errors.cardName ? "border-cherry" : ""}`}
                              value={form.cardName}
                              onChange={(e) => set("cardName", e.target.value)}
                            />
                            {errors.cardName && (
                              <p className={errCls}>{errors.cardName}</p>
                            )}
                          </div>
                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider">
                              Expiry
                            </label>
                            <input
                              className={`${inputCls} mt-1.5 ${errors.cardExpiry ? "border-cherry" : ""}`}
                              value={form.cardExpiry}
                              onChange={(e) => {
                                let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                                set("cardExpiry", v);
                              }}
                              placeholder="MM/YY"
                            />
                            {errors.cardExpiry && (
                              <p className={errCls}>{errors.cardExpiry}</p>
                            )}
                          </div>
                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider">
                              CVV
                            </label>
                            <input
                              type="password"
                              inputMode="numeric"
                              className={`${inputCls} mt-1.5 ${errors.cardCvv ? "border-cherry" : ""}`}
                              value={form.cardCvv}
                              onChange={(e) =>
                                set(
                                  "cardCvv",
                                  e.target.value.replace(/\D/g, "").slice(0, 4),
                                )
                              }
                              placeholder="•••"
                            />
                            {errors.cardCvv && (
                              <p className={errCls}>{errors.cardCvv}</p>
                            )}
                          </div>
                        </>
                      )}

                      {form.payment === "upi" && (
                        <div className="sm:col-span-2">
                          <label className="text-xs font-bold uppercase tracking-wider">
                            UPI ID
                          </label>
                          <input
                            className={`${inputCls} mt-1.5 ${errors.upiId ? "border-cherry" : ""}`}
                            value={form.upiId}
                            onChange={(e) => set("upiId", e.target.value)}
                            placeholder="yourname@okhdfc"
                          />
                          {errors.upiId && <p className={errCls}>{errors.upiId}</p>}
                          <p className="text-[11px] text-ink/50 mt-2">
                            A payment request will be sent to your UPI app.
                          </p>
                        </div>
                      )}

                      {form.payment === "cod" && (
                        <div className="sm:col-span-2 rounded-2xl bg-cream border border-ink/10 p-5">
                          <p className="font-semibold text-sm">
                            💵 Cash on Delivery
                          </p>
                          <p className="text-sm text-ink/60 mt-1.5 leading-relaxed">
                            Pay in cash or by UPI when your order arrives. A
                            small handling fee of ₹49 applies to COD orders.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="px-7 py-4 rounded-full border-2 border-ink/15 font-bold text-xs tracking-[0.16em] uppercase hover:border-ink transition-colors"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={next}
                        className="px-10 py-4 rounded-full bg-hot text-white font-bold text-xs tracking-[0.18em] uppercase hover:bg-ink transition-colors duration-300"
                      >
                        Review Order →
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 — Review */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h2 className="font-display text-2xl sm:text-3xl mb-5">
                      03 — REVIEW & PLACE
                    </h2>

                    {/* Shipping summary */}
                    <div className="rounded-2xl border border-ink/10 p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-wider">
                          Shipping to
                        </p>
                        <button
                          onClick={() => setStep(1)}
                          className="text-[11px] uppercase tracking-widest text-hot hover:underline underline-offset-4 font-semibold"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-sm mt-2.5 leading-relaxed">
                        {form.firstName} {form.lastName}
                        <br />
                        {form.address}, {form.city}, {form.state} – {form.pin}
                        <br />
                        {form.phone} · {form.email}
                      </p>
                    </div>

                    {/* Payment summary */}
                    <div className="rounded-2xl border border-ink/10 p-5 mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-wider">
                          Payment
                        </p>
                        <button
                          onClick={() => setStep(2)}
                          className="text-[11px] uppercase tracking-widest text-hot hover:underline underline-offset-4 font-semibold"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-sm mt-2.5">
                        {form.payment === "card" &&
                          `💳 Card ending ${form.cardNumber.slice(-4) || "••••"}`}
                        {form.payment === "upi" && `📱 ${form.upiId}`}
                        {form.payment === "cod" && "💵 Cash on Delivery (+₹49)"}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="rounded-2xl border border-ink/10 p-5 mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider mb-4">
                        Your items ({cart.length})
                      </p>
                      <ul className="space-y-4">
                        {cart.map((item) => {
                          const p = getProduct(item.id);
                          if (!p) return null;
                          return (
                            <li key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3.5">
                              <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-smoke shrink-0">
                                <Image
                                  src={p.images[0]}
                                  alt={p.name}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex justify-between gap-3">
                                <div>
                                  <p className="font-semibold text-sm truncate">
                                    {p.name}
                                  </p>
                                  <p className="text-[11px] text-ink/50 mt-0.5">
                                    {item.color} · {item.size} · ×{item.qty}
                                  </p>
                                </div>
                                <p className="font-bold text-sm shrink-0">
                                  {formatPrice(p.price * item.qty)}
                                </p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Consent */}
                    <label className="flex gap-3 mt-5 text-xs text-ink/60 leading-relaxed cursor-pointer">
                      <input type="checkbox" defaultChecked className="mt-0.5 accent-hot" />
                      <span>
                        I agree to the Terms of Sale and understand this is a
                        demo checkout — no real payment will be processed.
                      </span>
                    </label>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => setStep(2)}
                        className="px-7 py-4 rounded-full border-2 border-ink/15 font-bold text-xs tracking-[0.16em] uppercase hover:border-ink transition-colors"
                      >
                        ← Back
                      </button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={placeOrder}
                        disabled={placing}
                        className="px-10 py-4 rounded-full bg-hot text-white font-bold text-xs tracking-[0.18em] uppercase hover:bg-ink transition-colors duration-300 disabled:opacity-70 shadow-[0_10px_30px_rgba(255,46,147,0.35)]"
                      >
                        {placing ? "Placing order…" : `Place Order · ${formatPrice(total + (form.payment === "cod" ? 49 : 0))}`}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Order summary sidebar ── */}
            <aside className="lg:sticky lg:top-28 rounded-3xl border border-ink/10 bg-cream p-6">
              <h2 className="font-display text-2xl">YOUR ORDER</h2>

              <ul className="mt-5 space-y-3.5 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const p = getProduct(item.id);
                  if (!p) return null;
                  return (
                    <li
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex gap-3 items-center"
                    >
                      <div className="relative w-12 h-15 rounded-lg overflow-hidden bg-smoke shrink-0">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{p.name}</p>
                        <p className="text-[11px] text-ink/50">
                          {item.color} · {item.size} · ×{item.qty}
                        </p>
                      </div>
                      <p className="text-sm font-bold shrink-0">
                        {formatPrice(p.price * item.qty)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 pt-4 border-t border-ink/10 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink/60">Subtotal</span>
                  <span className="font-semibold">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/60">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                {form.payment === "cod" && (
                  <div className="flex justify-between">
                    <span className="text-ink/60">COD handling</span>
                    <span className="font-semibold">₹49</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-ink/10">
                  <span className="font-display text-xl">TOTAL</span>
                  <span className="font-display text-2xl text-gradient-brand">
                    {formatPrice(total + (form.payment === "cod" ? 49 : 0))}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-[11px] text-ink/55">
                <p>✓ Free returns within 14 days</p>
                <p>✓ Ships in 24–48 hours</p>
                <p>✓ 100% secure payment</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
