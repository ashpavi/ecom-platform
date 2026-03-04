import { useState } from "react";

const COLORS = [
  { name: "MIDNIGHT BLACK", hex: "#1a1a1a" },
  { name: "COGNAC BROWN",   hex: "#8B4513" },
  { name: "SLATE GREY",     hex: "#708090" },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

const THUMBNAILS = [
  "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop",
];

const MAIN_IMAGES = [
  "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800&h=700&fit=crop",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=700&fit=crop",
  "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=700&fit=crop",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=700&fit=crop",
];

const REVIEWS = [
  {
    name: "James McAvoy",
    avatar: "JM",
    avatarBg: "#d97706",
    rating: 5,
    verified: true,
    time: "2 weeks ago",
    text: "Hands down the best jacket I've ever owned. The leather is thick but surprisingly supple. The fit is perfect for athletic builds. I receive compliments every time I wear it. Worth every penny.",
  },
  {
    name: "Elena Rossi",
    avatar: "ER",
    avatarBg: "#0d9488",
    rating: 5,
    verified: true,
    time: "1 month ago",
    text: "Bought this as a gift for my husband. He loves it! The smell of real leather is amazing, and the antique brass hardware feels very premium. Shipping was fast and the packaging was very high-end.",
  },
];

const RATING_BARS = [
  { star: 5, pct: 85 },
  { star: 4, pct: 10 },
  { star: 3, pct: 3 },
  { star: 2, pct: 1 },
  { star: 1, pct: 1 },
];

const FEATURES = [
  "Premium 1.2mm full-grain cowhide leather",
  "YKK antique brass zippers and reinforced rivets",
  "Quilted satin interior for superior temperature regulation",
  "Hidden internal pocket for smartphones and wallets",
  "Double-stitched stress points for maximum durability",
];

function Stars({ rating, size = 16 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = s <= Math.floor(rating);
        const half = !filled && s - 0.5 <= rating;
        return (
          <svg key={s} width={size} height={size} viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`hg-${s}`}>
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={filled ? "#f59e0b" : half ? `url(#hg-${s})` : "#e5e7eb"}
            />
          </svg>
        );
      })}
    </span>
  );
}

function Navbar() {
  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #f0f0f0",
      display: "flex",
      alignItems: "center",
      padding: "0 40px",
      height: 58,
      gap: 32,
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 800, fontSize: 17, color: "#111", letterSpacing: "-0.3px" }}>
        <div style={{ background: "#2563eb", borderRadius: 7, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        ShopModern
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 28, marginLeft: 8 }}>
        {["New Arrivals", "Men", "Women", "Deals"].map((l) => (
          <span key={l} style={{ fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer", transition: "color .15s" }}
            onMouseEnter={e => e.target.style.color = "#2563eb"}
            onMouseLeave={e => e.target.style.color = "#374151"}
          >{l}</span>
        ))}
      </div>

      {/* Right */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input placeholder="Search products..."
            style={{ padding: "7px 14px 7px 32px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 13, background: "#f9fafb", outline: "none", width: 180 }}
            onFocus={e => e.target.style.borderColor = "#2563eb"}
            onBlur={e => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>
        {/* Wishlist */}
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {/* Cart */}
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, position: "relative" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
          </svg>
          <span style={{ position: "absolute", top: -3, right: -4, background: "#2563eb", color: "#fff", borderRadius: "50%", width: 15, height: 15, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
        </button>
        {/* Avatar */}
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer" }}>U</div>
      </div>
    </nav>
  );
}

function TabContent({ active }) {
  if (active === "details") return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 40, alignItems: "start" }}>
      {/* Left */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 12 }}>Master Craftsmanship</h2>
        <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.75, marginBottom: 20 }}>
          Our Heritage Leather Jacket isn't just a piece of clothing; it's an investment. Each jacket is hand-stitched
          by artisans with over 20 years of experience in luxury leather goods. The hide is sourced from sustainable
          tanneries in Tuscany, ensuring that every jacket has a unique grain and character that only improves with age.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {FEATURES.map((f, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151" }}>
              <span style={{ width: 18, height: 18, background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Right - Ratings */}
      <div style={{ background: "#f9fafb", border: "1px solid #f0f0f0", borderRadius: 14, padding: "24px 28px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 18 }}>Customer Ratings</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <span style={{ fontSize: 52, fontWeight: 800, color: "#111", lineHeight: 1 }}>4.8</span>
          <div>
            <Stars rating={4.8} size={18} />
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>124 verified reviews</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {RATING_BARS.map(({ star, pct }) => (
            <div key={star} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, color: "#374151", width: 8 }}>{star}</span>
              <div style={{ flex: 1, height: 7, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct > 50 ? "#2563eb" : "#93c5fd", borderRadius: 4, transition: "width .6s ease" }} />
              </div>
              <span style={{ fontSize: 12, color: "#6b7280", width: 28, textAlign: "right" }}>{pct}%</span>
            </div>
          ))}
        </div>
        <button style={{
          width: "100%", marginTop: 20, padding: "10px 0", border: "1.5px solid #e5e7eb",
          borderRadius: 8, background: "#fff", fontSize: 14, fontWeight: 600, color: "#374151",
          cursor: "pointer", transition: "border-color .15s",
        }}
          onMouseEnter={e => e.target.style.borderColor = "#2563eb"}
          onMouseLeave={e => e.target.style.borderColor = "#e5e7eb"}
        >Write a Review</button>
      </div>
    </div>
  );

  if (active === "shipping") return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 12 }}>Shipping & Returns</h2>
      <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.75, marginBottom: 12 }}>
        We offer free standard shipping on all orders over $100. Express and overnight options are available at checkout.
        International shipping is available to 60+ countries.
      </p>
      <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.75 }}>
        Returns are accepted within 30 days of delivery. Items must be in original condition with tags attached.
        Initiate a return from your account dashboard or contact our support team for a hassle-free exchange.
      </p>
    </div>
  );

  if (active === "reviews") return (
    <div>
      {REVIEWS.map((r, i) => (
        <ReviewCard key={i} review={r} />
      ))}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button style={{
          padding: "10px 28px", border: "1.5px solid #2563eb", borderRadius: 8,
          background: "none", color: "#2563eb", fontSize: 14, fontWeight: 600, cursor: "pointer",
        }}>View All 124 Reviews</button>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div style={{ borderBottom: "1px solid #f0f0f0", padding: "24px 0", display: "flex", gap: 16 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: review.avatarBg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
        {review.avatar}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{review.name}</span>
            {review.verified && (
              <span style={{ marginLeft: 8, fontSize: 11, color: "#059669", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 3 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Verified Purchase
              </span>
            )}
          </div>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{review.time}</span>
        </div>
        <Stars rating={review.rating} size={13} />
        <p style={{ fontSize: 13.5, color: "#4b5563", lineHeight: 1.7, marginTop: 8 }}>{review.text}</p>
      </div>
    </div>
  );
}

function ProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#fff", minHeight: "100vh", color: "#111" }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 32px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
          {["Home", "Men's Fashion", "Premium Leather Jacket"].map((crumb, i, arr) => (
            <span key={crumb} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ cursor: "pointer", color: i === arr.length - 1 ? "#111" : "#6b7280", fontWeight: i === arr.length - 1 ? 600 : 400 }}>
                {crumb}
              </span>
              {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>/</span>}
            </span>
          ))}
        </div>

        {/* Main product section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "start", marginBottom: 48 }}>
          {/* LEFT — images */}
          <div>
            {/* Main image */}
            <div style={{
              borderRadius: 16, overflow: "hidden", background: "#f4f4f0",
              height: 480, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
              position: "relative",
            }}>
              <img
                src={MAIN_IMAGES[activeImage]}
                alt="Product"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity .3s" }}
              />
            </div>
            {/* Thumbnails + badges row */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {THUMBNAILS.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: 80, height: 80, borderRadius: 10, overflow: "hidden",
                    border: activeImage === i ? "2.5px solid #2563eb" : "2px solid transparent",
                    background: "#f4f4f0", padding: 0, cursor: "pointer",
                    boxShadow: activeImage === i ? "0 0 0 2px #bfdbfe" : "none",
                    transition: "all .15s",
                  }}
                >
                  <img src={src} alt={`thumb-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}

              {/* Shipping badges pushed right */}
              <div style={{ marginLeft: "auto", display: "flex", gap: 18 }}>
                {[
                  { icon: "🚚", title: "Free Shipping", sub: "Orders over $100" },
                  { icon: "↩", title: "30-Day Returns", sub: "Hassle-free exchange" },
                ].map((b) => (
                  <div key={b.title} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{b.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>{b.title}</div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>{b.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — info */}
          <div>
            {/* Badge + Admin */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ background: "#eff6ff", color: "#2563eb", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.4px" }}>
                BEST SELLER
              </span>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Admin: Edit
              </button>
            </div>

            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f0f0f", lineHeight: 1.2, marginBottom: 10, letterSpacing: "-0.5px" }}>
              Premium Heritage Leather Jacket
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <Stars rating={4.8} size={15} />
              <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>4.8</span>
              <span style={{ fontSize: 13, color: "#6b7280" }}>(124 reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 34, fontWeight: 800, color: "#0f0f0f", letterSpacing: "-1px" }}>$249.00</span>
              <span style={{ fontSize: 16, color: "#9ca3af", textDecoration: "line-through" }}>$320.00</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#059669", background: "#ecfdf5", padding: "3px 8px", borderRadius: 6 }}>Save 22%</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.75, marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid #f0f0f0" }}>
              Exquisitely crafted from full-grain Italian leather, the Heritage Jacket combines timeless silhouettes with
              modern durability. Features hand-burnished edges, custom antique brass hardware, and a quilted satin lining
              for ultimate comfort.
            </p>

            {/* Color */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.8px", marginBottom: 10 }}>
                COLOR: <span style={{ color: "#111" }}>{COLORS[selectedColor].name}</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {COLORS.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={c.name}
                    style={{
                      width: 32, height: 32, borderRadius: "50%", background: c.hex,
                      border: "none", cursor: "pointer",
                      boxShadow: selectedColor === i ? `0 0 0 2px #fff, 0 0 0 4px ${c.hex}` : "0 1px 4px rgba(0,0,0,.2)",
                      transition: "box-shadow .15s",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.8px" }}>SIZE</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#2563eb", fontWeight: 600 }}>Size Guide</button>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      width: 52, height: 40, border: selectedSize === s ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
                      borderRadius: 8, background: selectedSize === s ? "#eff6ff" : "#fff",
                      color: selectedSize === s ? "#2563eb" : "#374151",
                      fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .15s",
                    }}
                    onMouseEnter={e => { if (selectedSize !== s) e.currentTarget.style.borderColor = "#93c5fd"; }}
                    onMouseLeave={e => { if (selectedSize !== s) e.currentTarget.style.borderColor = "#e5e7eb"; }}
                  >{s}</button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart + Wishlist */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.8px", marginBottom: 10 }}>QUANTITY</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Qty stepper */}
                <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={{ width: 38, height: 44, background: "#f9fafb", border: "none", cursor: "pointer", fontSize: 18, color: "#374151", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >−</button>
                  <span style={{ width: 42, textAlign: "center", fontSize: 15, fontWeight: 700, color: "#111" }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    style={{ width: 38, height: 44, background: "#f9fafb", border: "none", cursor: "pointer", fontSize: 18, color: "#374151", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >+</button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1, height: 44, background: addedToCart ? "#059669" : "#2563eb",
                    color: "#fff", border: "none", borderRadius: 10,
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "background .25s, transform .1s",
                    transform: addedToCart ? "scale(0.98)" : "scale(1)",
                  }}
                  onMouseEnter={e => { if (!addedToCart) e.currentTarget.style.background = "#1d4ed8"; }}
                  onMouseLeave={e => { if (!addedToCart) e.currentTarget.style.background = "#2563eb"; }}
                >
                  {addedToCart ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Added!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>

                {/* Wishlist heart */}
                <button
                  onClick={() => setWished(w => !w)}
                  style={{
                    width: 44, height: 44, border: "1.5px solid #e5e7eb", borderRadius: 10,
                    background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border-color .15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#fca5a5"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? "#ef4444" : "none"} stroke={wished ? "#ef4444" : "#9ca3af"} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: "2px solid #f0f0f0", marginBottom: 36 }}>
          <div style={{ display: "flex", gap: 0 }}>
            {[
              { key: "details", label: "Product Details" },
              { key: "shipping", label: "Shipping & Returns" },
              { key: "reviews", label: "Reviews (124)" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: "12px 24px", border: "none", background: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: activeTab === key ? 700 : 500,
                  color: activeTab === key ? "#2563eb" : "#6b7280",
                  borderBottom: activeTab === key ? "2.5px solid #2563eb" : "2.5px solid transparent",
                  marginBottom: "-2px", transition: "color .15s",
                }}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ marginBottom: 40 }}>
          <TabContent active={activeTab} />
        </div>

        {/* Reviews list (always visible under details) */}
        {activeTab === "details" && (
          <div style={{ marginTop: 16 }}>
            {REVIEWS.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button style={{
                padding: "10px 28px", border: "none", background: "none",
                color: "#2563eb", fontSize: 14, fontWeight: 700, cursor: "pointer",
                letterSpacing: "0.2px",
              }}>View All 124 Reviews</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;