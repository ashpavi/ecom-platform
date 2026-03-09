import { useState } from "react";

const contactMethods = [
  {
    icon: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=200&q=80",
    title: "Email Us",
    desc: "We'll respond within 24 hours",
    value: "support@shopmodern.com",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  {
    icon: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=200&q=80",
    title: "Call Us",
    desc: "Mon–Fri, 9am to 6pm EST",
    value: "+1 (800) 123-4567",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    icon: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=200&q=80",
    title: "Live Chat",
    desc: "Available 24/7 for quick help",
    value: "Start a conversation →",
    bg: "#fdf4ff",
    border: "#e9d5ff",
  },
  {
    icon: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80",
    title: "Visit Us",
    desc: "Our headquarters",
    value: "123 Commerce St, New York, NY",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
];

const faqs = [
  { q: "How long does shipping take?", a: "Standard shipping takes 3–5 business days. Express delivery is available at checkout for 1–2 business days." },
  { q: "Can I return a product?", a: "Yes! We offer hassle-free returns within 30 days of delivery." },
  { q: "Where is my order?", a: "You'll receive a tracking link via email once your order ships." },
  { q: "How do I change or cancel my order?", a: "Orders can be modified within 1 hour of placing them." },
];

export default function ContactUs() {
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((c) => (
            <div
              key={c.title}
              className="rounded-xl p-6 border transition hover:shadow-lg"
              style={{ background: c.bg, borderColor: c.border }}
            >
              <img
                src={c.icon}
                alt={c.title}
                className="w-16 h-16 rounded-full object-cover mb-3"
              />
              <div className="font-semibold mb-1">{c.title}</div>
              <div className="text-sm text-gray-500 mb-2">{c.desc}</div>
              <div className="text-blue-600 text-sm font-medium">{c.value}</div>
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