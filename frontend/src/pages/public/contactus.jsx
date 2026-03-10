import { useState } from "react";

const EmailIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="3" fill={color} opacity="0.9"/>
    <path d="M2 7l10 7 10-7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const PhoneIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill={color}/>
  </svg>
);

const ChatIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none">
    <rect x="2" y="2" width="15" height="12" rx="3" fill={color}/>
    <circle cx="6.5" cy="8" r="1.2" fill="white"/>
    <circle cx="9.5" cy="8" r="1.2" fill="white"/>
    <circle cx="12.5" cy="8" r="1.2" fill="white"/>
    <rect x="7" y="10" width="15" height="11" rx="3" fill={color} opacity="0.4"/>
  </svg>
);

const LocationIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={color}/>
    <circle cx="12" cy="9" r="2.5" fill="white"/>
  </svg>
);

const contactMethods = [
  { title: "Email Us", desc: "We'll respond within 24 hours", value: "support@shopmodern.com", bg: "#f0f4ff", border: "#c7d7ff", iconBg: "#dbeafe", color: "#3b82f6", Icon: EmailIcon },
  { title: "Call Us", desc: "Mon–Fri, 9am to 6pm EST", value: "+1 (800) 123-4567", bg: "#f0fff4", border: "#bbf7d0", iconBg: "#dcfce7", color: "#22c55e", Icon: PhoneIcon },
  { title: "Live Chat", desc: "Available 24/7 for quick help", value: "Start a conversation →", bg: "#fff0f6", border: "#fbc9dd", iconBg: "#d5f5ef", color: "#2bbfa4", Icon: ChatIcon },
  { title: "Visit Us", desc: "Our headquarters", value: "123 Commerce St, New York, NY", bg: "#fffbf0", border: "#fde8b0", iconBg: "#fef9c3", color: "#f59e0b", Icon: LocationIcon },
];

const faqs = [
  { q: "How long does shipping take?", a: "Standard shipping takes 3–5 business days. Express delivery is available at checkout for 1–2 business days." },
  { q: "Can I return a product?", a: "Yes! We offer hassle-free returns within 30 days of delivery." },
  { q: "Where is my order?", a: "You'll receive a tracking link via email once your order ships." },
  { q: "How do I change or cancel my order?", a: "Orders can be modified within 1 hour of placing them." },
];

export default function ContactUs() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900">

      {/* HERO */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 text-white py-20 px-6 text-center">
        <div className="inline-block bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest mb-6">
          Get in Touch
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          We'd love to <span className="text-blue-400">hear</span><br />
          from you
        </h1>
        <p className="mt-6 text-gray-300 max-w-xl mx-auto">
          Have a question, feedback, or just want to say hello?
          Our team is here and ready to help.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map(({ title, desc, value, bg, border, iconBg, color, Icon }, i) => (
            <div
              key={title}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: 20,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: hoveredCard === i ? "0 16px 40px rgba(0,0,0,0.13)" : "0 2px 10px rgba(0,0,0,0.06)",
                transform: hoveredCard === i ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                cursor: "pointer",
                animation: `fadeUp 0.6s ease both`,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              <div style={{ background: iconBg, width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon color={color} />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 17 }}>{title}</p>
                <p style={{ color: "#64748b", fontSize: 13, marginTop: 5, marginBottom: 10, lineHeight: 1.5 }}>{desc}</p>
                <a href="#" style={{ color: color, fontSize: 13, textDecoration: "none", fontWeight: 600 }}>{value}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-12">

        {/* FORM */}
        <div className="bg-white rounded-2xl border p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
              <p className="text-gray-500 mb-6">
                Thanks for reaching out. We'll get back to you soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}
                className="px-6 py-2 border rounded-lg hover:border-blue-600 hover:text-blue-600 transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <input
                    type="email"
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <select
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                >
                  <option value="">Select a topic…</option>
                  <option>Order & Shipping</option>
                  <option>Returns & Refunds</option>
                  <option>Product Question</option>
                  <option>Other</option>
                </select>

                <textarea
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="5"
                  placeholder="Tell us how we can help…"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Send Message →
                </button>
              </form>
            </>
          )}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full text-left font-medium flex justify-between items-center"
                  onClick={() =>
                    setOpenFaq(openFaq === i ? null : i)
                  }
                >
                  {faq.q}
                  <span>{openFaq === i ? "▲" : "▼"}</span>
                </button>

                {openFaq === i && (
                  <p className="text-gray-500 mt-2 text-sm">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}