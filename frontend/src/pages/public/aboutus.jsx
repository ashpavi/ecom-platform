import { useState } from "react";
import { useNavigate } from "react-router-dom";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    category: "LEADERSHIP",
    img: "https://api.dicebear.com/7.x/personas/svg?seed=sarah&backgroundColor=b6e3f4",
    bio: "Visionary behind ShopModern's mission to make quality shopping accessible to all.",
  },
  {
    name: "Marcus Rivera",
    role: "Head of Design",
    category: "CREATIVE",
    img: "https://api.dicebear.com/7.x/personas/svg?seed=marcus&backgroundColor=ffd5dc",
    bio: "Crafting pixel-perfect experiences that delight millions of shoppers daily.",
  },
  {
    name: "Priya Nair",
    role: "Chief Technology Officer",
    category: "ENGINEERING",
    img: "https://api.dicebear.com/7.x/personas/svg?seed=priya&backgroundColor=d1f7c4",
    bio: "Building the infrastructure that powers seamless, lightning-fast shopping.",
  },
  {
    name: "James Okafor",
    role: "Head of Operations",
    category: "OPERATIONS",
    img: "https://api.dicebear.com/7.x/personas/svg?seed=james&backgroundColor=ffeacc",
    bio: "Ensuring every order arrives with care, speed, and a smile.",
  },
];

const stats = [
  { value: "2.4M+", label: "Happy Customers" },
  { value: "180+", label: "Countries Served" },
  { value: "50K+", label: "Products Listed" },
  { value: "99.2%", label: "Satisfaction Rate" },
];

const values = [
  { icon: "🛡️", title: "Trust First", desc: "Every product is vetted. Every seller is verified. Your confidence is our currency." },
  { icon: "⚡", title: "Speed & Simplicity", desc: "Find what you love in seconds. From cart to doorstep — effortlessly fast." },
  { icon: "🌱", title: "Sustainable Future", desc: "We partner with eco-conscious brands and offset our carbon footprint on every shipment." },
  { icon: "💬", title: "People-Powered", desc: "Real humans. Real support. We're always here when things don't go as planned." },
];

export default function AboutUs() {
  const [activeTeam, setActiveTeam] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: "#ffffff", minHeight: "100vh", color: "#1a1a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }

        /* ── HERO ── */
        .hero {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
          color: white; padding: 80px 48px 60px; text-align: center;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(37,99,235,0.28) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(37,99,235,0.18); border: 1px solid rgba(37,99,235,0.4);
          border-radius: 100px; padding: 6px 16px; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #93c5fd; margin-bottom: 24px;
        }
        .hero h1 {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700; line-height: 1.15; margin-bottom: 16px; letter-spacing: -0.03em;
        }
        .hero h1 span { color: #60a5fa; }
        .hero p {
          font-size: 1rem; color: #cbd5e1;
          max-width: 600px; margin: 0 auto 32px; line-height: 1.6; font-weight: 400;
        }
        .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn-blue {
          background: #2563eb; color: white; border: none; padding: 11px 24px;
          border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer;
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-blue:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,0.4); }
        .btn-ghost {
          background: transparent; color: white; border: 1.5px solid rgba(255,255,255,0.35);
          padding: 11px 24px; border-radius: 8px; font-size: 0.875rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover { border-color: white; background: rgba(255,255,255,0.08); }

        /* ── STATS ── */
        .stats-bar { 
          background: #fff; display: flex; justify-content: center; border-bottom: 1px solid #e5e7eb;
          padding: 0; max-width: 100%; margin: 0;
        }
        .stat-item { flex: 1; max-width: 240px; text-align: center; padding: 40px 20px; border-right: 1px solid #e5e7eb; }
        .stat-item:last-child { border-right: none; }
        .stat-value { font-family: 'DM Sans', sans-serif; font-size: 1.8rem; font-weight: 700; color: #2563eb; }
        .stat-label { font-size: 0.8rem; color: #6b7280; margin-top: 8px; font-weight: 500; }

        /* ── SECTIONS ── */
        .section { 
          padding: 80px 48px; max-width: 1360px; margin: 0 auto; background: #fff;
        }
        .section-tag { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #2563eb; margin-bottom: 12px; }
        .section-title { font-family: 'DM Sans', sans-serif; font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 700; line-height: 1.25; margin-bottom: 16px; letter-spacing: -0.02em; }
        .section-subtitle { font-size: 0.95rem; color: #6b7280; line-height: 1.65; max-width: 580px; font-weight: 400; }

        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .story-visual {
          border-radius: 16px; background: linear-gradient(135deg, #dbeafe, #eff6ff);
          height: 360px; display: flex; align-items: center; justify-content: center;
          font-size: 6rem; position: relative; overflow: hidden;
          box-shadow: 0 10px 30px rgba(37,99,235,0.08);
        }
        .story-visual::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(37,99,235,0.08), transparent); }

        /* ── VALUES ── */
        .values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 48px; }
        .value-card {
          background: #fff; border-radius: 12px; padding: 32px;
          border: 1px solid #e5e7eb; transition: all 0.22s;
        }
        .value-card:hover { border-color: #2563eb; box-shadow: 0 6px 20px rgba(37,99,235,0.08); transform: translateY(-2px); }
        .value-icon { font-size: 1.8rem; margin-bottom: 16px; }
        .value-title { font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600; margin-bottom: 8px; color: #1f2937; }
        .value-desc { font-size: 0.875rem; color: #6b7280; line-height: 1.6; font-weight: 400; }

        /* ── TEAM ── */
        .team-section { background: #fff; padding: 80px 48px; border-top: 1px solid #e5e7eb; }
        .team-inner { max-width: 1360px; margin: 0 auto; }
        .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 48px; }
        .team-card {
          border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;
          cursor: pointer; transition: all 0.22s; background: #f9fafb;
        }
        .team-card:hover, .team-card.active { border-color: #2563eb; box-shadow: 0 6px 20px rgba(37,99,235,0.08); transform: translateY(-3px); }
        .team-img { height: 160px; display: flex; align-items: center; justify-content: center; }
        .team-img img { width: 100px; height: 100px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .team-info { padding: 16px; }
        .team-category { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #2563eb; margin-bottom: 6px; }
        .team-name { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 600; margin-bottom: 4px; color: #1f2937; }
        .team-role { font-size: 0.8rem; color: #9ca3af; font-weight: 400; }
        .team-bio { font-size: 0.8rem; color: #6b7280; line-height: 1.5; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb; font-weight: 400; }

        /* ── MISSION BANNER ── */
        .mission-banner {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border-radius: 12px; padding: 64px 48px; color: white; text-align: center;
          margin: 80px 48px; box-shadow: 0 16px 40px rgba(37,99,235,0.2);
          max-width: calc(100% - 96px); margin-left: auto; margin-right: auto;
        }
        .mission-banner h2 { font-family: 'DM Sans', sans-serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; margin-bottom: 16px; letter-spacing: -0.02em; }
        .mission-banner p { color: rgba(255,255,255,0.85); font-size: 0.95rem; max-width: 540px; margin: 0 auto 32px; line-height: 1.65; font-weight: 400; }

        @media (max-width: 900px) {
          .hero { padding: 60px 24px 40px; }
          .story-grid { grid-template-columns: 1fr; gap: 40px; }
          .team-grid { grid-template-columns: repeat(2, 1fr); }
          .values-grid { grid-template-columns: 1fr; }
          .stats-bar { flex-wrap: wrap; }
          .stat-item { border-right: none; border-bottom: 1px solid #e5e7eb; flex: 1 1 45%; max-width: 100%; }
          .mission-banner { margin: 60px 24px 80px; padding: 48px 24px; }
          .section { padding: 60px 24px; }
          .team-section { padding: 60px 24px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-pill">✦ Our Story</div>
        <h1>Shopping, <span>Reimagined</span><br />for the Modern World</h1>
        <p>We started with one belief: that great products should be easy to find, honest to evaluate, and joyful to receive. That's still true today.</p>
        <div className="hero-btns">
          <button className="btn-blue" onClick={() => navigate('/products')}>🛍 Explore Our Store</button>
          <button className="btn-ghost" onClick={() => document.querySelector('.team-section').scrollIntoView({ behavior: 'smooth' })}>Meet the Team ↓</button>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-bar">
        {stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── STORY ── */}
      <div className="section">
        <div className="story-grid">
          <div>
            <div className="section-tag">Our Origin</div>
            <h2 className="section-title">From a garage startup to a global marketplace</h2>
            <p className="section-subtitle">
              In 2018, four friends frustrated by cluttered, untrustworthy shopping experiences decided to build something better.
              ShopModern was born from a desire for clarity — curated products, transparent pricing, and an experience that actually respects your time.
            </p>
            <br />
            <p className="section-subtitle">
              Today, we serve millions of customers across 180 countries. But our north star hasn't changed: make finding something great feel effortless.
            </p>
          </div>
          <div className="story-visual">🏪</div>
        </div>
      </div>

      {/* ── VALUES ── */}
      <div style={{ background: "#f9fafb", padding: "80px 48px", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <div className="section-tag">What We Stand For</div>
          <h2 className="section-title">Principles that guide every decision</h2>
          <div className="values-grid">
            {values.map((v) => (
              <div className="value-card" key={v.title}>
                <div className="value-icon">{v.icon}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TEAM ── */}
      <div className="team-section">
        <div className="team-inner">
          <div className="section-tag">The People Behind It</div>
          <h2 className="section-title">Meet our team</h2>
          <p className="section-subtitle">A diverse group of thinkers, builders, and dreamers united by a passion for better commerce.</p>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div
                className={`team-card ${activeTeam === member.name ? "active" : ""}`}
                key={member.name}
                onClick={() => setActiveTeam(activeTeam === member.name ? null : member.name)}
              >
                <div className="team-img">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="team-info">
                  <div className="team-category">{member.category}</div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  {activeTeam === member.name && (
                    <div className="team-bio">{member.bio}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MISSION BANNER ── */}
      <div className="mission-banner">
        <h2>We're just getting started.</h2>
        <p>ShopModern is on a mission to become the most trusted place to shop online — for everyone, everywhere.</p>
        <button className="btn-ghost" onClick={() => navigate('/products')} style={{ borderColor: "rgba(255,255,255,0.45)" }}>
          Join Our Journey →
        </button>
      </div>

    </div>
  );
}