import { useState } from "react";

const contactMethods = [
  {
    icon: "📧",
    title: "Email Us",
    desc: "We'll respond within 24 hours",
    value: "support@shopmodern.com",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  {
    icon: "📞",
    title: "Call Us",
    desc: "Mon–Fri, 9am to 6pm EST",
    value: "+1 (800) 123-4567",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    icon: "💬",
    title: "Live Chat",
    desc: "Available 24/7 for quick help",
    value: "Start a conversation →",
    bg: "#fdf4ff",
    border: "#e9d5ff",
  },
  {
    icon: "📍",
    title: "Visit Us",
    desc: "Our headquarters",
    value: "123 Commerce St, New York, NY",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
];

const faqs = [
  { q: "How long does shipping take?", a: "Standard shipping takes 3–5 business days. Express delivery is available at checkout for 1–2 business days." },
  { q: "Can I return a product?", a: "Yes! We offer hassle-free returns within 30 days of delivery. Just initiate a return from your order page." },
  { q: "Where is my order?", a: "You'll receive a tracking link via email once your order ships. You can also check your order status in your account." },
  { q: "How do I change or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placing them. Contact support immediately for assistance." },
];

export default function ContactUs() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f2f4f7", minHeight: "100vh", color: "#1a1a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── HERO ── */
        .hero {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
          color: white; padding: 90px 48px; text-align: center;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.28) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(37,99,235,0.18); border: 1px solid rgba(37,99,235,0.4);
          border-radius: 100px; padding: 6px 16px; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #93c5fd; margin-bottom: 24px;
        }
        .hero h1 {
          font-family: 'Inter', sans-serif; font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 800; line-height: 1.1; margin-bottom: 20px;
        }
        .hero h1 span { color: #60a5fa; }
        .hero p {
          font-size: 1.05rem; color: #94a3b8;
          max-width: 500px; margin: 0 auto; line-height: 1.75; font-weight: 400;
        }

        /* ── CONTACT CARDS ── */
        .cards-section { padding: 64px 48px; max-width: 1140px; margin: 0 auto; }
        .cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .contact-card {
          border-radius: 16px; padding: 28px 24px; border: 1.5px solid;
          transition: all 0.22s; cursor: default;
        }
        .contact-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.08); }
        .card-icon { font-size: 2rem; margin-bottom: 14px; }
        .card-title { font-size: 0.95rem; font-weight: 600; margin-bottom: 4px; color: #1a1a2e; }
        .card-desc { font-size: 0.8rem; color: #888; margin-bottom: 12px; font-weight: 400; }
        .card-value { font-size: 0.88rem; font-weight: 500; color: #2563eb; }

        /* ── MAIN CONTENT ── */
        .main-grid {
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 32px; padding: 0 48px 80px; max-width: 1140px; margin: 0 auto;
        }

        /* ── FORM ── */
        .form-card {
          background: #fff; border-radius: 20px; padding: 40px;
          border: 1.5px solid #e8eaed;
        }
        .form-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 6px; }
        .form-subtitle { font-size: 0.9rem; color: #888; margin-bottom: 32px; font-weight: 400; line-height: 1.6; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .form-group:last-of-type { margin-bottom: 24px; }
        .form-label { font-size: 0.82rem; font-weight: 600; color: #374151; }
        .form-input, .form-select, .form-textarea {
          padding: 11px 14px; border-radius: 10px; border: 1.5px solid #e2e8f0;
          font-size: 0.9rem; color: #1a1a2e; font-family: 'Inter', sans-serif;
          transition: all 0.18s; outline: none; background: #fafafa;
          font-weight: 400;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #2563eb; background: #fff;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .form-input::placeholder, .form-textarea::placeholder { color: #bbb; }
        .form-textarea { resize: vertical; min-height: 130px; line-height: 1.6; }
        .form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; cursor: pointer; }
        .btn-submit {
          width: 100%; background: #2563eb; color: white; border: none; padding: 13px;
          border-radius: 12px; font-size: 0.95rem; font-weight: 600; cursor: pointer;
          transition: all 0.2s; font-family: 'Inter', sans-serif; letter-spacing: -0.01em;
        }
        .btn-submit:hover { background: #1d4ed8; box-shadow: 0 6px 20px rgba(37,99,235,0.35); transform: translateY(-1px); }

        /* ── SUCCESS STATE ── */
        .success-state {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 48px 24px; gap: 16px;
        }
        .success-icon {
          width: 72px; height: 72px; background: #f0fdf4; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; font-size: 2.2rem;
          border: 2px solid #bbf7d0;
        }
        .success-title { font-size: 1.3rem; font-weight: 700; color: #1a1a2e; }
        .success-desc { font-size: 0.9rem; color: #666; line-height: 1.7; max-width: 320px; font-weight: 400; }
        .btn-reset {
          background: none; border: 1.5px solid #e2e8f0; padding: 10px 24px;
          border-radius: 10px; font-size: 0.88rem; font-weight: 600; cursor: pointer;
          font-family: 'Inter', sans-serif; color: #555; transition: all 0.18s; margin-top: 8px;
        }
        .btn-reset:hover { border-color: #2563eb; color: #2563eb; }

        /* ── RIGHT COLUMN ── */
        .right-col { display: flex; flex-direction: column; gap: 24px; }

        /* ── MAP CARD ── */
        .map-card {
          background: #fff; border-radius: 20px; overflow: hidden;
          border: 1.5px solid #e8eaed;
        }
        .map-placeholder {
          height: 200px; background: linear-gradient(135deg, #dbeafe, #eff6ff);
          display: flex; align-items: center; justify-content: center;
          font-size: 4rem; position: relative;
        }
        .map-placeholder::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(37,99,235,0.06), transparent);
        }
        .map-info { padding: 20px 24px; }
        .map-info-title { font-size: 0.95rem; font-weight: 600; margin-bottom: 4px; }
        .map-info-text { font-size: 0.85rem; color: #666; line-height: 1.6; font-weight: 400; }
        .map-badge {
          display: inline-flex; align-items: center; gap: 5px; margin-top: 10px;
          background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 100px;
          padding: 4px 12px; font-size: 0.75rem; font-weight: 600; color: #2563eb;
        }

        /* ── FAQ ── */
        .faq-card { background: #fff; border-radius: 20px; padding: 28px; border: 1.5px solid #e8eaed; }
        .faq-header { font-size: 1rem; font-weight: 700; margin-bottom: 20px; }
        .faq-item { border-bottom: 1px solid #f0f0f0; }
        .faq-item:last-child { border-bottom: none; }
        .faq-question {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 0; cursor: pointer; font-size: 0.88rem; font-weight: 500;
          color: #1a1a2e; transition: color 0.18s; gap: 12px;
        }
        .faq-question:hover { color: #2563eb; }
        .faq-chevron {
          width: 22px; height: 22px; border-radius: 50%; background: #f2f4f7;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; flex-shrink: 0; transition: all 0.22s; color: #888;
        }
        .faq-chevron.open { background: #eff6ff; color: #2563eb; transform: rotate(180deg); }
        .faq-answer {
          font-size: 0.85rem; color: #666; line-height: 1.7;
          padding-bottom: 14px; font-weight: 400;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        /* ── SECTION TAG / TITLE ── */
        .section-tag { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #2563eb; margin-bottom: 8px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
          .main-grid { grid-template-columns: 1fr; padding: 0 20px 60px; }
          .cards-section { padding: 48px 20px 32px; }
          .hero { padding: 60px 20px; }
        }
        @media (max-width: 600px) {
          .cards-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .form-card { padding: 24px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-pill">✦ Get in Touch</div>
        <h1>We'd love to <span>hear</span><br />from you</h1>
        <p>Have a question, feedback, or just want to say hello? Our team is here and ready to help.</p>
      </section>

      {/* ── CONTACT METHOD CARDS ── */}
      <div className="cards-section">
        <div className="cards-grid">
          {contactMethods.map((c) => (
            <div className="contact-card" key={c.title} style={{ background: c.bg, borderColor: c.border }}>
              <div className="card-icon">{c.icon}</div>
              <div className="card-title">{c.title}</div>
              <div className="card-desc">{c.desc}</div>
              <div className="card-value">{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="main-grid">

        {/* FORM */}
        <div className="form-card">
          {submitted ? (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <div className="success-title">Message sent!</div>
              <div className="success-desc">Thanks for reaching out. Our team will get back to you within 24 hours.</div>
              <button className="btn-reset" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}>
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div className="section-tag">Send a Message</div>
              <div className="form-title">How can we help you?</div>
              <div className="form-subtitle">Fill in the form below and we'll get back to you as soon as possible.</div>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name *</label>
                    <input
                      className="form-input"
                      placeholder="Sarah Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address *</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Topic</label>
                  <select
                    className="form-input form-select"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">Select a topic…</option>
                    <option>Order & Shipping</option>
                    <option>Returns & Refunds</option>
                    <option>Product Question</option>
                    <option>Account & Billing</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell us how we can help…"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn-submit">Send Message →</button>
              </form>
            </>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-col">

          {/* MAP */}
          <div className="map-card">
            <div className="map-placeholder">🗺️</div>
            <div className="map-info">
              <div className="map-info-title">ShopModern HQ</div>
              <div className="map-info-text">123 Commerce Street, Suite 400<br />New York, NY 10001, United States</div>
              <div className="map-badge">📍 Open Mon–Fri, 9am–6pm EST</div>
            </div>
          </div>

          {/* FAQ */}
          <div className="faq-card">
            <div className="faq-header">Frequently Asked Questions</div>
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className={`faq-chevron ${openFaq === i ? "open" : ""}`}>▼</span>
                </div>
                {openFaq === i && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}