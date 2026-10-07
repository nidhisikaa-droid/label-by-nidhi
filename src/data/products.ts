export type ProductColor = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAt?: number;
  gender: "women" | "men" | "unisex";
  category: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  badge?: "new" | "hot" | "limited" | "sale";
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  collections: string[];
  isNew?: boolean;
  onSale?: boolean;
};

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const WOMEN_SIZES = ["XS", "S", "M", "L", "XL"];
const MEN_SIZES = ["S", "M", "L", "XL", "XXL"];
const ONE_SIZE = ["One Size"];

const PINK: ProductColor = { name: "Hot Pink", hex: "#ff2e93" };
const PURPLE: ProductColor = { name: "Grape", hex: "#7b2cff" };
const BLUE: ProductColor = { name: "Electric Blue", hex: "#1f3cff" };
const ORANGE: ProductColor = { name: "Tangerine", hex: "#ff6b00" };
const RED: ProductColor = { name: "Cherry", hex: "#ff1e3c" };
const BLACK: ProductColor = { name: "Black", hex: "#0a0a0a" };
const WHITE: ProductColor = { name: "White", hex: "#ffffff" };

export const products: Product[] = [
  {
    id: "p1",
    name: "Neon Riot Blazer",
    slug: "neon-riot-blazer",
    price: 8900,
    compareAt: 12500,
    gender: "women",
    category: "Blazers",
    images: [U("photo-1485462537746-965f33f7f6a7"), U("photo-1515886657613-9f3515b0c78f")],
    colors: [PINK, BLACK, PURPLE],
    sizes: WOMEN_SIZES,
    badge: "hot",
    rating: 4.9,
    reviewCount: 214,
    description:
      "A sharp, oversized blazer cut in vivid saturated hues. Power shoulders, satin lining and a silhouette built for entrances.",
    details: [
      "Tailored oversized fit",
      "Premium stretch crepe",
      "Satin-lined interior",
      "Concealed front buttons",
      "Dry clean only",
    ],
    collections: ["power-dressing", "neon-nights"],
    isNew: true,
    onSale: true,
  },
  {
    id: "p2",
    name: "Confidence Slip Dress",
    slug: "confidence-slip-dress",
    price: 6500,
    gender: "women",
    category: "Dresses",
    images: [U("photo-1595777457583-95e059d581b8"), U("photo-1566174053879-31528523f8ae")],
    colors: [RED, BLACK, WHITE],
    sizes: WOMEN_SIZES,
    badge: "new",
    rating: 4.8,
    reviewCount: 168,
    description:
      "Bias-cut satin slip that moves like liquid. Cowl neckline, adjustable straps and a hem that lands exactly right.",
    details: [
      "Bias-cut silhouette",
      "Adjustable straps",
      "Liquid satin finish",
      "Midi length",
      "Hand wash cold",
    ],
    collections: ["neon-nights", "everyday-icon"],
    isNew: true,
  },
  {
    id: "p3",
    name: "Electric Bloom Corset Top",
    slug: "electric-bloom-corset-top",
    price: 4200,
    compareAt: 5600,
    gender: "women",
    category: "Tops",
    images: [U("photo-1571945153237-4929e783af4a"), U("photo-1509631179647-0177331693ae")],
    colors: [PURPLE, PINK, BLUE],
    sizes: WOMEN_SIZES,
    badge: "sale",
    rating: 4.7,
    reviewCount: 97,
    description:
      "Structured corsetry meets street. Boned panels, statement color and a fit that sculpts without compromising.",
    details: [
      "Internal boning",
      "Hook-and-eye back",
      "Stretch satin blend",
      "Cropped length",
      "Spot clean only",
    ],
    collections: ["neon-nights"],
    onSale: true,
  },
  {
    id: "p4",
    name: "Ultra Violet Cargo Pants",
    slug: "ultra-violet-cargo-pants",
    price: 5400,
    gender: "women",
    category: "Bottoms",
    images: [U("photo-1581044777550-4cfa60707c03"), U("photo-1509319117193-57bab727e09d")],
    colors: [PURPLE, BLACK, ORANGE],
    sizes: WOMEN_SIZES,
    rating: 4.6,
    reviewCount: 132,
    description:
      "Utility cargo in head-turning violet. Relaxed through the leg, cinched at the ankle, pockets everywhere.",
    details: [
      "Relaxed wide leg",
      "Six functional pockets",
      "Adjustable ankle cuffs",
      "Mid-rise waist",
      "Machine wash cold",
    ],
    collections: ["street-statement"],
  },
  {
    id: "p5",
    name: "Sunset Highway Maxi Skirt",
    slug: "sunset-highway-maxi-skirt",
    price: 4900,
    gender: "women",
    category: "Bottoms",
    images: [U("photo-1554568218-0f1715e72254"), U("photo-1544022613-e87ca75a784a")],
    colors: [ORANGE, RED, BLACK],
    sizes: WOMEN_SIZES,
    badge: "new",
    rating: 4.8,
    reviewCount: 76,
    description:
      "A sweeping maxi in sunset ombré. High slit, fluid drape and enough drama for a main-character walk.",
    details: [
      "High side slit",
      "Elasticated waist",
      "Flowy chiffon blend",
      "Ankle length",
      "Hand wash cold",
    ],
    collections: ["resort-heat"],
    isNew: true,
  },
  {
    id: "p6",
    name: "Cherry Bomb Cropped Tee",
    slug: "cherry-bomb-cropped-tee",
    price: 2200,
    compareAt: 3100,
    gender: "women",
    category: "Tops",
    images: [U("photo-1521572163474-6864f9cf17ab"), U("photo-1576566588028-4147f3842f27")],
    colors: [RED, WHITE, BLACK],
    sizes: WOMEN_SIZES,
    badge: "sale",
    rating: 4.5,
    reviewCount: 241,
    description:
      "Boxy cropped tee in heavyweight cotton with a screaming cherry graphic. Runs relaxed.",
    details: [
      "240 GSM heavyweight cotton",
      "Boxy cropped fit",
      "Puff-print graphic",
      "Ribbed collar",
      "Machine wash",
    ],
    collections: ["everyday-icon"],
    onSale: true,
  },
  {
    id: "p7",
    name: "Pink Panther Puffer",
    slug: "pink-panther-puffer",
    price: 11200,
    gender: "women",
    category: "Outerwear",
    images: [U("photo-1548126032-079a0fb0099d"), U("photo-1483985988355-763728e1935b")],
    colors: [PINK, BLACK, BLUE],
    sizes: WOMEN_SIZES,
    badge: "limited",
    rating: 4.9,
    reviewCount: 88,
    description:
      "Glossy cropped puffer in electric pink. Cloud-warm down alternative, storm-ready and impossibly photogenic.",
    details: [
      "Glossy ripstop shell",
      "Vegan down fill",
      "Cropped silhouette",
      "Magnetic snap closure",
      "Water-resistant",
    ],
    collections: ["neon-nights", "street-statement"],
  },
  {
    id: "p8",
    name: "Daily Icon Wide Jeans",
    slug: "daily-icon-wide-jeans",
    price: 5800,
    gender: "women",
    category: "Denim",
    images: [U("photo-1541099649105-f69ad21f3246"), U("photo-1582418702059-97ebafb35d09")],
    colors: [BLUE, BLACK, WHITE],
    sizes: WOMEN_SIZES,
    rating: 4.7,
    reviewCount: 319,
    description:
      "The wide-leg jean you'll reach for daily. Rigid denim with a whisper of stretch, faded to a perfect vintage blue.",
    details: [
      "High-rise wide leg",
      "Vintage wash",
      "99% cotton / 1% stretch",
      "Five-pocket styling",
      "Machine wash cold",
    ],
    collections: ["everyday-icon"],
  },
  {
    id: "p9",
    name: "Voltage Mesh Top",
    slug: "voltage-mesh-top",
    price: 3400,
    gender: "women",
    category: "Tops",
    images: [U("photo-1503342217505-b0a15ec3261c"), U("photo-1515886657613-9f3515b0c78f")],
    colors: [BLUE, PURPLE, BLACK],
    sizes: WOMEN_SIZES,
    badge: "new",
    rating: 4.6,
    reviewCount: 64,
    description:
      "Sheer electric-blue mesh with long sleeves and attitude. Layer it over everything.",
    details: [
      "Sheer stretch mesh",
      "Thumbhole cuffs",
      "Relaxed fit",
      "Layering essential",
      "Hand wash",
    ],
    collections: ["neon-nights", "street-statement"],
    isNew: true,
  },
  {
    id: "p10",
    name: "Glamour Club Mini Skirt",
    slug: "glamour-club-mini-skirt",
    price: 3900,
    compareAt: 5200,
    gender: "women",
    category: "Bottoms",
    images: [U("photo-1594633312681-425c7b97ccd1"), U("photo-1496747611176-843222e1e57c")],
    colors: [BLACK, PINK, RED],
    sizes: WOMEN_SIZES,
    badge: "sale",
    rating: 4.4,
    reviewCount: 145,
    description:
      "High-shine mini with a sculpted waistband. Built for last calls and flash photography.",
    details: [
      "High-waisted fit",
      "Gloss coated finish",
      "Back zip closure",
      "Mini length",
      "Spot clean",
    ],
    collections: ["neon-nights"],
    onSale: true,
  },
  {
    id: "p11",
    name: "Midnight Run Bomber",
    slug: "midnight-run-bomber",
    price: 9800,
    gender: "men",
    category: "Outerwear",
    images: [U("photo-1551028719-00167b16eac5"), U("photo-1520975954732-35dd22299614")],
    colors: [BLACK, BLUE, ORANGE],
    sizes: MEN_SIZES,
    badge: "hot",
    rating: 4.9,
    reviewCount: 187,
    description:
      "Matte-black bomber with reflective piping. Ribbed cuffs, roomy pockets and a cut that layers clean.",
    details: [
      "Reflective piping detail",
      "Matte nylon shell",
      "Ribbed collar, cuffs, hem",
      "Two zip pockets",
      "Dry clean",
    ],
    collections: ["street-statement"],
  },
  {
    id: "p12",
    name: "Prism Knit Polo",
    slug: "prism-knit-polo",
    price: 4600,
    gender: "men",
    category: "Tops",
    images: [U("photo-1618354691373-d851c5c3a990"), U("photo-1620799140408-edc6dcb6d633")],
    colors: [PURPLE, ORANGE, WHITE],
    sizes: MEN_SIZES,
    badge: "new",
    rating: 4.7,
    reviewCount: 92,
    description:
      "Fine-gauge knit polo in saturated color. Collar that sits right, texture that reads expensive.",
    details: [
      "Fine-gauge knit",
      "Open collar",
      "Regular fit",
      "Ribbed hem",
      "Hand wash cold",
    ],
    collections: ["power-dressing", "resort-heat"],
    isNew: true,
  },
  {
    id: "p13",
    name: "Blaze Orange Overshirt",
    slug: "blaze-orange-overshirt",
    price: 6200,
    compareAt: 8400,
    gender: "men",
    category: "Shirts",
    images: [U("photo-1596755094514-f87e34085b2c"), U("photo-1603252109303-2751441dd157")],
    colors: [ORANGE, BLACK, BLUE],
    sizes: MEN_SIZES,
    badge: "sale",
    rating: 4.6,
    reviewCount: 118,
    description:
      "Heavyweight overshirt in blaze orange. Wear it open as a jacket, buttoned as a shirt — never boring.",
    details: [
      "Heavyweight twill",
      "Chest flap pockets",
      "Oversized fit",
      "Corozo buttons",
      "Machine wash",
    ],
    collections: ["street-statement"],
    onSale: true,
  },
  {
    id: "p14",
    name: "Signature Tailored Trousers",
    slug: "signature-tailored-trousers",
    price: 7100,
    gender: "men",
    category: "Bottoms",
    images: [U("photo-1473966968600-fa801b869a1a"), U("photo-1507003211169-0a1dd7228f2d")],
    colors: [BLACK, BLUE, WHITE],
    sizes: MEN_SIZES,
    rating: 4.8,
    reviewCount: 156,
    description:
      "Slim-straight tailored trousers with a clean break. Wool-blend with comfort stretch for all-day wear.",
    details: [
      "Wool-blend stretch fabric",
      "Slim-straight leg",
      "Side adjuster waistband",
      "Pressed crease",
      "Dry clean",
    ],
    collections: ["power-dressing"],
  },
  {
    id: "p15",
    name: "Static Graphic Hoodie",
    slug: "static-graphic-hoodie",
    price: 5200,
    gender: "men",
    category: "Tops",
    images: [U("photo-1556821840-3a63f95609a7"), U("photo-1578587018452-892bacefd3f2")],
    colors: [BLACK, PURPLE, RED],
    sizes: MEN_SIZES,
    badge: "hot",
    rating: 4.8,
    reviewCount: 274,
    description:
      "Heavyweight hoodie with a static-glitch back print. Double-lined hood, dropped shoulders, zero subtlety.",
    details: [
      "400 GSM loopback cotton",
      "Oversized fit",
      "Glitch back print",
      "Double-lined hood",
      "Machine wash cold",
    ],
    collections: ["street-statement", "everyday-icon"],
  },
  {
    id: "p16",
    name: "Chrome Wave Denim Jacket",
    slug: "chrome-wave-denim-jacket",
    price: 7600,
    gender: "men",
    category: "Denim",
    images: [U("photo-1544022613-e87ca75a784a"), U("photo-1543076447-215ad9ba6923")],
    colors: [BLUE, BLACK, WHITE],
    sizes: MEN_SIZES,
    badge: "new",
    rating: 4.7,
    reviewCount: 103,
    description:
      "Washed denim jacket with chrome hardware and a boxy shape. The layer that finishes everything.",
    details: [
      "Boxy fit",
      "Chrome hardware",
      "Washed rigid denim",
      "Adjustable waist tabs",
      "Machine wash cold",
    ],
    collections: ["everyday-icon", "street-statement"],
    isNew: true,
  },
  {
    id: "p17",
    name: "Ferocious Fleece Zip",
    slug: "ferocious-fleece-zip",
    price: 4800,
    compareAt: 6400,
    gender: "unisex",
    category: "Tops",
    images: [U("photo-1578587018452-892bacefd3f2"), U("photo-1556821840-3a63f95609a7")],
    colors: [ORANGE, PURPLE, BLACK],
    sizes: MEN_SIZES,
    badge: "sale",
    rating: 4.5,
    reviewCount: 167,
    description:
      "Sherpa-lined full-zip in tangerine. Ridiculously soft, unisex oversized fit, made for layering season.",
    details: [
      "Sherpa-lined interior",
      "Full zip with chin guard",
      "Unisex oversized fit",
      "Kangaroo pockets",
      "Machine wash",
    ],
    collections: ["everyday-icon"],
    onSale: true,
  },
  {
    id: "p18",
    name: "Stereo Statement Sneakers",
    slug: "stereo-statement-sneakers",
    price: 8900,
    gender: "unisex",
    category: "Footwear",
    images: [U("photo-1595950653106-6c9ebd614d3a"), U("photo-1549298916-b41d501d3772")],
    colors: [WHITE, PINK, BLUE],
    sizes: ["6", "7", "8", "9", "10", "11"],
    badge: "hot",
    rating: 4.9,
    reviewCount: 231,
    description:
      "Chunky platform sneaker with color-blocked panels and a pillow-soft sole. Tall, loud, comfortable.",
    details: [
      "Platform rubber sole",
      "Color-blocked leather",
      "Memory foam insole",
      "Lace-up closure",
      "True to size",
    ],
    collections: ["street-statement", "everyday-icon"],
  },
  {
    id: "p19",
    name: "Afterglow Wrap Dress",
    slug: "afterglow-wrap-dress",
    price: 7200,
    gender: "women",
    category: "Dresses",
    images: [U("photo-1515372039744-b8f02a3ae446"), U("photo-1496217590455-aa63a8350eea")],
    colors: [ORANGE, PINK, BLACK],
    sizes: WOMEN_SIZES,
    badge: "limited",
    rating: 4.8,
    reviewCount: 59,
    description:
      "A wrap dress engineered to flatter — defined waist, fluid skirt, engineered print in sunset tones.",
    details: [
      "True wrap construction",
      "Self-tie waist",
      "Floral-engineered print",
      "Midi length",
      "Hand wash cold",
    ],
    collections: ["resort-heat", "power-dressing"],
  },
  {
    id: "p20",
    name: "Royal Flush Satin Shirt",
    slug: "royal-flush-satin-shirt",
    price: 5500,
    gender: "men",
    category: "Shirts",
    images: [U("photo-1602810318383-e386cc2a3ccf"), U("photo-1596755094514-f87e34085b2c")],
    colors: [PURPLE, BLUE, WHITE],
    sizes: MEN_SIZES,
    rating: 4.6,
    reviewCount: 84,
    description:
      "Liquid satin shirt in royal purple. Camp collar, relaxed drape, made to be worn half-unbuttoned.",
    details: [
      "Liquid satin finish",
      "Camp collar",
      "Relaxed fit",
      "Mother-of-pearl buttons",
      "Dry clean",
    ],
    collections: ["neon-nights", "resort-heat"],
  },
  {
    id: "p21",
    name: "Turbo Track Pants",
    slug: "turbo-track-pants",
    price: 4300,
    compareAt: 5900,
    gender: "unisex",
    category: "Bottoms",
    images: [U("photo-1552902865-b72c031ac5ea"), U("photo-1517445312882-bc9910d016b7")],
    colors: [BLACK, RED, BLUE],
    sizes: MEN_SIZES,
    badge: "sale",
    rating: 4.5,
    reviewCount: 198,
    description:
      "Satin track pants with contrast piping and a tapered leg. Sporty enough for the gym, sharp enough for the street.",
    details: [
      "Satin tricot fabric",
      "Contrast side piping",
      "Elastic cuffs",
      "Zip pockets",
      "Machine wash",
    ],
    collections: ["street-statement"],
    onSale: true,
  },
  {
    id: "p22",
    name: "Aura Oversized Hoodie",
    slug: "aura-oversized-hoodie",
    price: 5600,
    gender: "women",
    category: "Tops",
    images: [U("photo-1620799140408-edc6dcb6d633"), U("photo-1556821840-3a63f95609a7")],
    colors: [PINK, PURPLE, WHITE],
    sizes: WOMEN_SIZES,
    badge: "new",
    rating: 4.7,
    reviewCount: 112,
    description:
      "Plush oversized hoodie with a tonal embroidered logo. Cocoon fit, dropped shoulders, cloud-soft.",
    details: [
      "450 GSM brushed fleece",
      "Cocoon oversized fit",
      "Tonal embroidery",
      "Ribbed trims",
      "Machine wash cold",
    ],
    collections: ["everyday-icon"],
    isNew: true,
  },
  {
    id: "p23",
    name: "Metropolis Tote Bag",
    slug: "metropolis-tote-bag",
    price: 3800,
    gender: "unisex",
    category: "Accessories",
    images: [U("photo-1584917865442-de89df76afd3"), U("photo-1548036328-c9fa89d128fa")],
    colors: [BLACK, ORANGE, PINK],
    sizes: ONE_SIZE,
    badge: "hot",
    rating: 4.8,
    reviewCount: 143,
    description:
      "Structured vegan-leather tote that fits a laptop, a change of shoes and your whole attitude.",
    details: [
      "Premium vegan leather",
      "Fits 15-inch laptop",
      "Interior zip pocket",
      "Magnetic snap closure",
      "Wipe clean",
    ],
    collections: ["power-dressing", "everyday-icon"],
  },
  {
    id: "p24",
    name: "Blaze Shield Sunglasses",
    slug: "blaze-shield-sunglasses",
    price: 2900,
    compareAt: 4100,
    gender: "unisex",
    category: "Accessories",
    images: [U("photo-1511499767150-a48a237f0083"), U("photo-1572635196237-14b3f281503f")],
    colors: [BLACK, ORANGE, WHITE],
    sizes: ONE_SIZE,
    badge: "sale",
    rating: 4.6,
    reviewCount: 96,
    description:
      "Shield-lens sunglasses with a wraparound frame. UV400 protection, instant celebrity energy.",
    details: [
      "UV400 lenses",
      "Wraparound shield shape",
      "Lightweight acetate",
      "Includes microfiber pouch",
      "One size fits most",
    ],
    collections: ["neon-nights", "resort-heat"],
    onSale: true,
  },
];

/* ── Lookups & helpers ─────────────────────────── */

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getRelated = (product: Product, limit = 4) =>
  products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.gender === product.gender ||
          p.collections.some((c) => product.collections.includes(c))),
    )
    .slice(0, limit);

export const newArrivals = () => products.filter((p) => p.isNew);

export const saleProducts = () => products.filter((p) => p.onSale);

export const byGender = (g: Product["gender"]) =>
  g === "unisex"
    ? products.filter((p) => p.gender === "unisex")
    : products.filter((p) => p.gender === g || p.gender === "unisex");

export const categories = Array.from(
  new Set(products.map((p) => p.category)),
).sort();

export const discount = (p: Product) =>
  p.compareAt ? Math.round(((p.compareAt - p.price) / p.compareAt) * 100) : 0;

export const formatPrice = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

/* ── Collections ───────────────────────────────── */

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  accent: string;
};

export const collections: Collection[] = [
  {
    slug: "neon-nights",
    name: "Neon Nights",
    tagline: "After-dark dressing in electric hues",
    image: U("photo-1490481651871-ab68de25d43d"),
    accent: "#7b2cff",
  },
  {
    slug: "power-dressing",
    name: "Power Dressing",
    tagline: "Tailoring that walks in first",
    image: U("photo-1487222477894-8943e31ef7b2"),
    accent: "#1f3cff",
  },
  {
    slug: "street-statement",
    name: "Street Statement",
    tagline: "Sidewalk-ready, flash-ready",
    image: U("photo-1523381210434-271e8be1f52b"),
    accent: "#ff2e93",
  },
  {
    slug: "resort-heat",
    name: "Resort Heat",
    tagline: "Sun-soaked silhouettes",
    image: U("photo-1469334031218-e382a71b716b"),
    accent: "#ff6b00",
  },
  {
    slug: "everyday-icon",
    name: "Everyday Icons",
    tagline: "The pieces you'll never take off",
    image: U("photo-1445205170230-053b83016050"),
    accent: "#ff1e3c",
  },
];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);

export const productsInCollection = (slug: string) =>
  products.filter((p) => p.collections.includes(slug));
