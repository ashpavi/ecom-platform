import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    brand: "NIKE",
    name: "Air Max Velocity Red",
    price: 129.99,
    rating: 4.5,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 2,
    brand: "ADIDAS",
    name: "Cloudform Lite White",
    price: 85.0,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    badge: "NEW ARRIVAL",
    badgeColor: "#3b82f6",
  },
  {
    id: 3,
    brand: "PUMA",
    name: "Core Trainer 2.0 Stealth",
    price: 110.0,
    rating: 4.5,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 4,
    brand: "REEBOK",
    name: "Classic Leather Legacy",
    price: 95.0,
    rating: 4.5,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 5,
    brand: "NIKE",
    name: "Zoom Fly 5 Volt",
    price: 144.0,
    originalPrice: 180.0,
    rating: 4.5,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop",
    badge: "SALE 20% OFF",
    badgeColor: "#ef4444",
  },
  {
    id: 6,
    brand: "TIMBERLAND",
    name: "Adventure 6-Inch Boot",
    price: 198.0,
    rating: 4,
    reviews: 1210,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=400&fit=crop",
    badge: null,
  },
];

const colors = ["#f5f5f5", "#1a1a2e", "#3b82f6", "#ef4444", "#4b5563", "#22c55e"];
const sizes = [7, 8, 9, 10, 11, 12];

function StarRating({ rating, reviews }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill={star <= Math.floor(rating) ? "#f59e0b" : star - 0.5 <= rating ? "url(#half)" : "#e5e7eb"}>
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      <span style={{ fontSize: 12, color: "#6b7280" }}>({reviews.toLocaleString()})</span>
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "#9ca3af"} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ProductCard({ product }) {
  const [wished, setWished] = useState(false);
  const productPath = `/products/${product.id}`;
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #f3f4f6",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s",
        position: "relative",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "none"; }}
    >
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: "absolute", top: 12, left: 12, zIndex: 2,
          background: product.badgeColor, color: "#fff",
          fontSize: 10, fontWeight: 700, padding: "4px 8px",
          borderRadius: 6, letterSpacing: "0.5px",
        }}>
          {product.badge}
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={() => setWished(w => !w)}
        style={{
          position: "absolute", top: 12, right: 12, zIndex: 2,
          background: "#fff", border: "none", borderRadius: "50%",
          width: 34, height: 34, display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        <HeartIcon filled={wished} />
      </button>

      {/* Image */}
      <Link
        to={productPath}
        style={{ display: "block", background: "#f9fafb", height: 220, overflow: "hidden" }}
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.target.style.display = "none"; }}
        />
      </Link>

      {/* Info */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", letterSpacing: "1px", marginBottom: 4 }}>
          {product.brand}
        </div>
        <Link
          to={productPath}
          style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 6, lineHeight: 1.3, textDecoration: "none", display: "block" }}
        >
          {product.name}
        </Link>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: 14, color: "#9ca3af", textDecoration: "line-through" }}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductList() {
  const [selectedSizes, setSelectedSizes] = useState([8]);
  const [selectedColor, setSelectedColor] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["Shoes"]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState("grid");

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#fafafa", minHeight: "100vh", color: "#111827" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 8, fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
          {["Home", "Men's Fashion", "Footwear"].map((crumb, i, arr) => (
            <span key={crumb} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ cursor: "pointer", color: i === arr.length - 1 ? "#111827" : "#6b7280", fontWeight: i === arr.length - 1 ? 600 : 400 }}>{crumb}</span>
              {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>›</span>}
            </span>
          ))}
        </div>

        {/* Page heading */}
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px", color: "#111827" }}>Men's Footwear</h1>
        <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>1,248 premium items found</div>

        <div style={{ display: "flex", gap: 28 }}>
          {/* Sidebar */}
          <aside style={{ width: 210, flexShrink: 0 }}>
            {/* Category */}
            <FilterSection title="CATEGORY">
              {["Shoes", "Clothing", "Accessories", "Sale"].map(cat => (
                <label key={cat} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#374151", padding: "3px 0" }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    style={{ accentColor: "#3b82f6", width: 15, height: 15 }}
                  />
                  {cat}
                </label>
              ))}
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="PRICE RANGE">
              <div style={{ padding: "4px 0 8px" }}>
                <input
                  type="range" min={0} max={500}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  style={{ width: "100%", accentColor: "#3b82f6" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                  <span>$0</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
            </FilterSection>

            {/* Size */}
            <FilterSection title="SIZE">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    style={{
                      padding: "7px 4px", border: selectedSizes.includes(size) ? "2px solid #3b82f6" : "1.5px solid #e5e7eb",
                      borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                      background: selectedSizes.includes(size) ? "#eff6ff" : "#fff",
                      color: selectedSizes.includes(size) ? "#3b82f6" : "#374151",
                      transition: "all 0.15s",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Color */}
            <FilterSection title="COLOR">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    style={{
                      width: 28, height: 28, borderRadius: "50%", background: color,
                      border: selectedColor === i ? "3px solid #3b82f6" : "2px solid #e5e7eb",
                      cursor: "pointer", outline: selectedColor === i ? "2px solid #fff" : "none",
                      outlineOffset: "-4px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                      transition: "transform 0.15s",
                    }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.15)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Brand */}
            <FilterSection title="BRAND">
              {["Nike", "Adidas", "New Balance", "Puma"].map(brand => (
                <label key={brand} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#374151", padding: "3px 0" }}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    style={{ accentColor: "#3b82f6", width: 15, height: 15 }}
                  />
                  {brand}
                </label>
              ))}
            </FilterSection>

            <button style={{
              width: "100%", padding: "12px 0", background: "#111827", color: "#fff",
              border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14,
              cursor: "pointer", marginTop: 8, letterSpacing: "0.3px",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = "#374151"}
              onMouseLeave={e => e.target.style.background = "#111827"}
            >
              Apply Filters
            </button>
            <button style={{
              width: "100%", padding: "10px 0", background: "none", color: "#6b7280",
              border: "none", borderRadius: 10, fontWeight: 500, fontSize: 14,
              cursor: "pointer", marginTop: 6,
            }}>
              Reset All
            </button>
          </aside>

          {/* Main content */}
          <main style={{ flex: 1 }}>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  padding: "8px 32px 8px 14px", border: "1.5px solid #e5e7eb",
                  borderRadius: 10, fontSize: 14, background: "#fff",
                  color: "#374151", outline: "none", cursor: "pointer",
                  appearance: "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                {["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Rated"].map(opt => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>

              <div style={{ display: "flex", border: "1.5px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                {[
                  { mode: "grid", icon: "⊞" },
                  { mode: "list", icon: "☰" },
                ].map(({ mode, icon }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: "8px 12px", border: "none", cursor: "pointer", fontSize: 16,
                      background: viewMode === mode ? "#111827" : "#fff",
                      color: viewMode === mode ? "#fff" : "#6b7280",
                      transition: "all 0.15s",
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Products grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: viewMode === "grid" ? "repeat(3, 1fr)" : "1fr",
              gap: 20,
            }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 40 }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                style={{ width: 36, height: 36, border: "1.5px solid #e5e7eb", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ‹
              </button>
              {[1, 2, 3, "...", 12].map((page, i) => (
                <button
                  key={i}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  style={{
                    width: 36, height: 36,
                    border: currentPage === page ? "none" : "1.5px solid #e5e7eb",
                    borderRadius: 8,
                    background: currentPage === page ? "#3b82f6" : "#fff",
                    color: currentPage === page ? "#fff" : "#374151",
                    cursor: "pointer", fontSize: 14, fontWeight: currentPage === page ? 700 : 400,
                  }}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                style={{ width: 36, height: 36, border: "1.5px solid #e5e7eb", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ›
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: 16, marginBottom: 16 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "0 0 10px", fontWeight: 700, fontSize: 11, color: "#374151",
          letterSpacing: "1px",
        }}
      >
        {title}
        <svg style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
      {open && <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{children}</div>}
    </div>
  );
}