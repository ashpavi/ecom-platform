import { useState, useEffect } from "react";
import { getCollection, addData, addLog } from "../../services/firebaseService";

const tags = ["PAYMENTS", "STRIPE", "BUG"];

const merchantHistory = [
  {
    id: "current",
    label: "CURRENT",
    labelColor: "#3b82f6",
    time: "2h ago",
    title: "Payment Gateway Sync Error",
    subtitle: "Status: Open",
    active: true,
  },
  {
    id: "tkt-82441",
    label: "RESOLVED",
    labelColor: "#22c55e",
    time: "3 days ago",
    title: "Theme customization issue",
    subtitle: "TKT-82441 • Resolved",
    active: false,
  },
  {
    id: "tkt-81203",
    label: "RESOLVED",
    labelColor: "#22c55e",
    time: "2 weeks ago",
    title: "Bulk import timeout",
    subtitle: "TKT-81203 • Resolved",
    active: false,
  },
];

const relatedKnowledge = [
  { icon: "📄", title: "Stripe API Documentation v3", desc: "Integration guide for multi-vendor payouts." },
  { icon: "🛡️", title: "PCI Compliance Checklist", desc: "Required steps for custom gateways." },
];

const messages = [
  {
    id: 1,
    type: "merchant",
    avatar: "M",
    name: "Alex Rivera (Merchant)",
    time: "10:42 AM",
    text: "Hi Support, I'm trying to connect my Stripe account to the marketplace, but I keep getting a \"Gateway Connection Timed Out\" error after the OAuth flow. I've tried multiple browsers. Here is a screenshot of the error page.",
    attachment: { name: "error_log_screen.png", size: "1.2 MB • PNG" },
  },
  {
    id: 2,
    type: "internal",
    name: "INTERNAL NOTE • JOHN DOE (SUPER ADMIN)",
    time: "10:55 AM",
    text: "Checked the logs for Store ID #4492. It looks like a mismatch in the redirect URL signature. I've escalated this to the DevOps team but will handle the merchant communication for now.",
  },
  {
    id: 3,
    type: "agent",
    avatar: "J",
    name: "John Doe (Support Agent)",
    time: "11:02 AM",
    text: "Hello Alex, thanks for reaching out. I've looked into your logs and identified a configuration issue on our side regarding the redirect URLs for your specific region.\n\nOur technical team is currently updating the gateway records. This should be resolved within the hour. I will keep this ticket open and update you as soon as it's ready for a second attempt.",
    read: true,
  },
];

export default function Support() {
  const [activeTab, setActiveTab] = useState("Public Reply");
  const [replyText, setReplyText] = useState("");
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);

  // ── Firebase: load support tickets on mount ──
  useEffect(() => {
    getCollection("supportTickets").then((data) => {
      setTickets(data);
      if (data.length > 0 && !activeTicket) setActiveTicket(data[0]);
    }).catch(() => {});
  }, []);

  // ── Firebase: send a reply ──
  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    const reply = {
      ticketId: activeTicket?.id || "general",
      type: activeTab === "Internal Note" ? "internal" : "agent",
      message: replyText,
      admin: "Super Admin",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timestamp: new Date().toISOString(),
    };
    await addData("supportReplies", reply).catch(() => {});
    await addLog(
      `Support reply sent on ticket ${activeTicket?.id || "TKT"}`,
      "Super Admin",
      "settings"
    ).catch(() => {});
    setReplyText("");
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#f1f5f9",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontSize: 14,
      color: "#1e293b",
    }}>
      {/* Top Nav */}
      <nav style={{
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 24px",
        height: 52,
        display: "flex",
        alignItems: "center",
        gap: 32,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 15, color: "#1e293b" }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#3b82f6,#6366f1)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800,
          }}>S</div>
          SuperAdmin Support
        </div>
        {["Dashboard", "Tickets", "Merchants", "Settings"].map(item => (
          <span key={item} style={{
            color: item === "Tickets" ? "#3b82f6" : "#64748b",
            fontWeight: item === "Tickets" ? 600 : 400,
            cursor: "pointer",
            borderBottom: item === "Tickets" ? "2px solid #3b82f6" : "2px solid transparent",
            paddingBottom: 2,
            fontSize: 13.5,
          }}>{item}</span>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8,
            padding: "6px 14px", display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13,
          }}>
            🔍 Search tickets...
          </div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔔</div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>A</div>
        </div>
      </nav>

      {/* Ticket Header */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e2e8f0",
        padding: "12px 24px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <span style={{ color: "#94a3b8", fontSize: 12 }}>TICKETS &gt; TKT-82931</span>
        <span style={{
          background: "#dbeafe", color: "#2563eb", fontSize: 11, fontWeight: 700,
          padding: "3px 10px", borderRadius: 20, letterSpacing: 0.5,
        }}>IN PROGRESS</span>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>Issue with Payment Gateway Integration</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex" }}>
            {["A", "B"].map((a, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "#6366f1" : "#ec4899",
                color: "#fff", fontWeight: 700, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center",
                marginLeft: i > 0 ? -8 : 0, border: "2px solid #fff",
              }}>{a}</div>
            ))}
            <div style={{
              width: 28, height: 28, borderRadius: "50%", background: "#e2e8f0",
              color: "#64748b", fontWeight: 700, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center",
              marginLeft: -8, border: "2px solid #fff",
            }}>+1</div>
          </div>
          <button style={{
            border: "1px solid #e2e8f0", background: "#fff", borderRadius: 8, padding: "7px 16px",
            display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontWeight: 600, fontSize: 13, color: "#374151",
          }}>👤 Assign</button>
          <button style={{
            background: "linear-gradient(135deg,#3b82f6,#6366f1)", color: "#fff", border: "none",
            borderRadius: 8, padding: "7px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>✓ Resolve</button>
        </div>
      </div>

      {/* Main 3-col layout */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 280px", flex: 1, gap: 0, height: "calc(100vh - 108px)" }}>

        {/* Left Sidebar */}
        <div style={{ background: "#fff", borderRight: "1px solid #e2e8f0", overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 24 }}>
          <section>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 12px" }}>MERCHANT HISTORY</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {merchantHistory.map(h => (
                <div key={h.id} style={{
                  border: h.active ? "1.5px solid #3b82f6" : "1px solid #e2e8f0",
                  borderRadius: 10, padding: "10px 12px",
                  background: h.active ? "#eff6ff" : "#fafafa",
                  cursor: "pointer",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: h.labelColor, letterSpacing: 0.5 }}>{h.label}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{h.time}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{h.title}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{h.subtitle}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 12px" }}>RELATED KNOWLEDGE</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {relatedKnowledge.map((k, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: 18 }}>{k.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 12.5, color: "#1e293b" }}>{k.title}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{k.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div style={{
            background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 14px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span>💡</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#b45309", letterSpacing: 0.5 }}>AI SUGGESTION</span>
            </div>
            <p style={{ fontSize: 12, color: "#78350f", margin: 0, lineHeight: 1.5 }}>
              This merchant might be experiencing a webhook failure. Suggest checking the 'Logs' tab in their merchant dashboard.
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ display: "flex", flexDirection: "column", background: "#f8fafc", overflowY: "auto" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Date divider */}
            <div style={{ textAlign: "center" }}>
              <span style={{ background: "#e2e8f0", color: "#64748b", fontSize: 11, fontWeight: 600, padding: "4px 14px", borderRadius: 20 }}>TODAY, OCT 24</span>
            </div>

            {messages.map(msg => {
              if (msg.type === "merchant") return (
                <div key={msg.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#6366f1)",
                    color: "#fff", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>{msg.avatar}</div>
                  <div style={{ maxWidth: "75%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 13.5 }}>{msg.name}</span>
                      <span style={{ color: "#94a3b8", fontSize: 12 }}>{msg.time}</span>
                    </div>
                    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "2px 12px 12px 12px", padding: "14px 16px", lineHeight: 1.6, fontSize: 13.5, color: "#334155" }}>
                      {msg.text}
                      {msg.attachment && (
                        <div style={{
                          marginTop: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8,
                          padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 36, height: 36, background: "#e0e7ff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🖼️</div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 12.5, color: "#1e293b" }}>{msg.attachment.name}</div>
                              <div style={{ fontSize: 11, color: "#94a3b8" }}>{msg.attachment.size}</div>
                            </div>
                          </div>
                          <span style={{ fontSize: 18, color: "#94a3b8", cursor: "pointer" }}>⬇</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );

              if (msg.type === "internal") return (
                <div key={msg.id} style={{
                  background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "12px 16px",
                  display: "flex", alignItems: "flex-start", gap: 10,
                }}>
                  <span style={{ fontSize: 16 }}>🔒</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#ea580c", letterSpacing: 0.5 }}>{msg.name}</span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{msg.time}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: "#c2410c", fontStyle: "italic", lineHeight: 1.6 }}>{msg.text}</p>
                  </div>
                </div>
              );

              if (msg.type === "agent") return (
                <div key={msg.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", flexDirection: "row-reverse" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#6366f1)",
                    color: "#fff", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, position: "relative",
                  }}>
                    {msg.avatar}
                    <div style={{ position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderRadius: "50%", background: "#3b82f6", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#fff" }}>✓</div>
                  </div>
                  <div style={{ maxWidth: "75%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, justifyContent: "flex-end" }}>
                      <span style={{ color: "#94a3b8", fontSize: 12 }}>{msg.time}</span>
                      <span style={{ fontWeight: 700, fontSize: 13.5 }}>{msg.name}</span>
                    </div>
                    <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px 2px 12px 12px", padding: "14px 16px", lineHeight: 1.6, fontSize: 13.5, color: "#1e40af" }}>
                      {msg.text.split("\n\n").map((para, i) => <p key={i} style={{ margin: i === 0 ? 0 : "10px 0 0" }}>{para}</p>)}
                    </div>
                    {msg.read && (
                      <div style={{ textAlign: "right", marginTop: 4, fontSize: 11, color: "#3b82f6" }}>✓✓ Read</div>
                    )}
                  </div>
                </div>
              );

              return null;
            })}

            {/* Typing indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 48 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1",
                  animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
              <span style={{ fontSize: 12, color: "#94a3b8" }}>Merchant is typing...</span>
            </div>
          </div>

          {/* Reply Box */}
          <div style={{ background: "#fff", borderTop: "1px solid #e2e8f0", padding: "16px 24px" }}>
            <div style={{ display: "flex", gap: 0, marginBottom: 12 }}>
              {["Public Reply", "Internal Note"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: "7px 16px", border: "none", background: "transparent", cursor: "pointer",
                  fontWeight: 600, fontSize: 13, color: activeTab === tab ? "#3b82f6" : "#64748b",
                  borderBottom: activeTab === tab ? "2px solid #3b82f6" : "2px solid transparent",
                }}>{tab}</button>
              ))}
              <button style={{
                marginLeft: "auto", padding: "7px 16px", border: "1px solid #e2e8f0", borderRadius: 8,
                background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "#374151",
                display: "flex", alignItems: "center", gap: 6,
              }}>⚡ Canned Responses</button>
            </div>
            <textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Type your message here... (use @ for internal mentions)"
              style={{
                width: "100%", minHeight: 90, border: "1px solid #e2e8f0", borderRadius: 10,
                padding: "12px 14px", fontSize: 13.5, color: "#334155", resize: "vertical",
                fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                background: "#fafafa",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                {["B", "🔗", "📎"].map((icon, i) => (
                  <button key={i} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: i === 0 ? 15 : 16, fontWeight: "bold", color: "#64748b" }}>{icon}</button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>Markdown supported</span>
                <button
                  onClick={handleSendReply}
                  style={{
                    background: "linear-gradient(135deg,#3b82f6,#6366f1)", color: "#fff", border: "none",
                    borderRadius: 8, padding: "8px 20px", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>Send ▶</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ background: "#fff", borderLeft: "1px solid #e2e8f0", overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Merchant Info */}
          <section>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 14px" }}>MERCHANT INFO</h4>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0f172a,#1e293b)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16,
              }}>U</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Urban Outfitters</div>
                <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600 }}>Platinum Merchant</div>
              </div>
            </div>
            {[["Store Status", <span style={{ color: "#22c55e", fontWeight: 600 }}>● Active</span>], ["Store ID", "#4492-AXL"], ["LTV", "$12,450.00"]].map(([label, val], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9", fontSize: 13 }}>
                <span style={{ color: "#64748b" }}>{label}</span>
                <span style={{ fontWeight: 600, color: "#1e293b" }}>{val}</span>
              </div>
            ))}
            <button style={{
              width: "100%", marginTop: 12, border: "1px solid #e2e8f0", background: "#fff",
              borderRadius: 8, padding: "9px 0", fontWeight: 600, fontSize: 13, cursor: "pointer",
              color: "#374151", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>↗ View Full Merchant Profile</button>
          </section>

          {/* Priority */}
          <section>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 10px" }}>PRIORITY</h4>
            <select style={{
              width: "100%", border: "1px solid #e2e8f0", borderRadius: 8, padding: "9px 12px",
              fontSize: 13, fontWeight: 600, color: "#1e293b", background: "#fff", cursor: "pointer", appearance: "auto",
            }}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </section>

          {/* Assigned Agent */}
          <section>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 10px" }}>ASSIGNED AGENT</h4>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>J</div>
                <span style={{ fontWeight: 600, fontSize: 13 }}>John Doe</span>
              </div>
              <span style={{ fontSize: 16, color: "#94a3b8", cursor: "pointer" }}>🔄</span>
            </div>
          </section>

          {/* Tags */}
          <section>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 10px" }}>TAGS</h4>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {tags.map(tag => (
                <span key={tag} style={{
                  background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569",
                  fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, letterSpacing: 0.3,
                }}>{tag}</span>
              ))}
              <span style={{
                background: "#f1f5f9", border: "1px dashed #cbd5e1", color: "#94a3b8",
                fontSize: 11, padding: "4px 10px", borderRadius: 20, cursor: "pointer",
              }}>+</span>
            </div>
          </section>

          {/* Super Admin Tools */}
          <section>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 10px" }}>SUPER ADMIN TOOLS</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[["→", "IMPERSONATE"], ["💳", "REFUND"], ["⚙", "CONFIG"], ["🕐", "ACTIVITY"]].map(([icon, label]) => (
                <button key={label} style={{
                  border: "1px solid #e2e8f0", background: "#fafafa", borderRadius: 10, padding: "12px 0",
                  cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  transition: "background 0.15s",
                }} onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                   onMouseLeave={e => e.currentTarget.style.background = "#fafafa"}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b", letterSpacing: 0.5 }}>{label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
