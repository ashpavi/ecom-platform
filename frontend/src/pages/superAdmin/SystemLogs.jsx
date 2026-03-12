import { useState, useEffect, useRef } from "react";
import { subscribeToCollection, addLog } from "../../services/firebaseService";

// ── DATA ──────────────────────────────────────────────────────────────────────

const initialLogs = [
  { id: 1, status: "critical", timestamp: "2023-10-24 14:22:01", source: "192.168.1.104", type: "CRITICAL", message: "Database transaction failed: connection pool exhausted after 30s timeout", bg: "#fff1f2" },
  { id: 2, status: "info",     timestamp: "2023-10-24 14:21:58", source: "System/Cron",   type: "SYSTEM",   message: "Scheduled maintenance: database index rebuild completed successfully", bg: "" },
  { id: 3, status: "warning",  timestamp: "2023-10-24 14:21:45", source: "45.22.112.5",   type: "SECURITY", message: "Failed login attempt for user admin@platform.com from unknown IP", bg: "#fffbeb" },
  { id: 4, status: "info",     timestamp: "2023-10-24 14:21:30", source: "104.28.1.12",   type: "API_CALL", message: "GET /v1/orders/ORD-88219 — 200 OK (142ms)", bg: "" },
  { id: 5, status: "info",     timestamp: "2023-10-24 14:21:12", source: "104.28.1.12",   type: "API_CALL", message: "POST /v1/auth/token_refresh — 200 OK (38ms)", bg: "" },
  { id: 6, status: "critical", timestamp: "2023-10-24 14:20:45", source: "210.12.33.190", type: "SECURITY", message: "Detected SQL injection attempt in query param ?id=1 OR 1=1", bg: "#fff1f2" },
  { id: 7, status: "info",     timestamp: "2023-10-24 14:20:00", source: "127.0.0.1",     type: "LOG",      message: "Worker process #402 initialized. Listening on queue: jobs.default", bg: "" },
  { id: 8, status: "warning",  timestamp: "2023-10-24 14:19:50", source: "10.0.0.5",      type: "SECURITY", message: "Rate limit exceeded: 500 req/min from IP 10.0.0.5", bg: "#fffbeb" },
  { id: 9, status: "info",     timestamp: "2023-10-24 14:19:33", source: "System/Cron",   type: "SYSTEM",   message: "Backup job started: full snapshot of production DB", bg: "" },
  { id: 10,status: "critical", timestamp: "2023-10-24 14:18:22", source: "192.168.1.200", type: "CRITICAL", message: "Memory threshold exceeded: 94% heap usage on node-3", bg: "#fff1f2" },
];

const typeStyles = {
  CRITICAL: { bg: "#fef2f2", color: "#dc2626" },
  SECURITY: { bg: "#fffbeb", color: "#d97706" },
  SYSTEM:   { bg: "#eff6ff", color: "#2563eb" },
  API_CALL: { bg: "#f0fdf4", color: "#16a34a" },
  LOG:      { bg: "#f3f4f6", color: "#6b7280" },
  INFO:     { bg: "#eff6ff", color: "#2563eb" },
  WARNING:  { bg: "#fffbeb", color: "#d97706" },
  ERROR:    { bg: "#fef2f2", color: "#dc2626" },
};

const statusIcon = {
  critical: { icon: "🔴", color: "#ef4444" },
  warning:  { icon: "⚠️", color: "#f59e0b" },
  info:     { icon: "ℹ️", color: "#3b82f6" },
};

const navMain = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "inventory", icon: "📦", label: "Inventory" },
  { id: "orders",    icon: "🛒", label: "Orders" },
  { id: "customers", icon: "👤", label: "Customers" },
];
const navSystem = [
  { id: "logs",     icon: "📋", label: "System Logs" },
  { id: "security", icon: "🛡", label: "Security Settings" },
  { id: "api",      icon: "⚙️", label: "API Management" },
];

const filterTabs = [
  { id: "all",    icon: "≡",  label: "All Events" },
  { id: "info",   icon: "ℹ",  label: "Info" },
  { id: "warn",   icon: "⚠",  label: "Warnings" },
  { id: "error",  icon: "⊗",  label: "Errors" },
  { id: "api",    icon: "✦",  label: "API Calls" },
  { id: "auth",   icon: "→",  label: "Auth Events" },
];

const sessions = [
  { initials: "SA", name: "sarah_admin",  location: "New York, US", color: "#2563eb" },
  { initials: "MK", name: "m.keller_sys", location: "Berlin, DE",   color: "#16a34a" },
];

// bar chart data for failed logins
const barData = [18, 30, 22, 45, 38, 55, 28, 62, 48, 72, 85, 44];

function randomLog(id) {
  const types = ["CRITICAL","SECURITY","SYSTEM","API_CALL","LOG","API_CALL","API_CALL"];
  const sources = ["192.168.1.104","127.0.0.1","System/Cron","104.28.1.12","45.22.112.5"];
  const msgs = [
    "New API request received from client",
    "User session refreshed successfully",
    "Scheduled job completed in 340ms",
    "Rate limit warning triggered",
    "Auth token validated for user",
  ];
  const t = types[Math.floor(Math.random() * types.length)];
  const s = t === "CRITICAL" || t === "SECURITY" ? (t === "CRITICAL" ? "critical" : "warning") : "info";
  return {
    id, status: s, timestamp: new Date().toISOString().replace("T"," ").slice(0,19),
    source: sources[Math.floor(Math.random() * sources.length)],
    type: t, message: msgs[Math.floor(Math.random() * msgs.length)],
    bg: s === "critical" ? "#fff1f2" : s === "warning" ? "#fffbeb" : "",
  };
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function SystemLogs() {
  const [activeNav, setActiveNav]     = useState("logs");
  const [activeFilter, setActiveFilter] = useState("all");
  const [logs, setLogs]               = useState(initialLogs);
  const [paused, setPaused]           = useState(false);
  const [cpu, setCpu]                 = useState(12);
  const [latency, setLatency]         = useState(45);
  const [lockdownModal, setLockdownModal] = useState(false);
  const [lockdownDone, setLockdownDone]   = useState(false);
  const [expandedLog, setExpandedLog]     = useState(null);
  const idRef = useRef(100);

  // ── Firebase: real-time listener for systemLogs ──
  useEffect(() => {
    const unsubscribe = subscribeToCollection(
      "systemLogs",
      (firestoreLogs) => {
        if (firestoreLogs.length > 0) {
          const mapped = firestoreLogs.map((l, i) => ({
            id: l.id || i + 1,
            status: l.type === "CRITICAL" ? "critical" : l.type === "SECURITY" || l.type === "warning" ? "warning" : "info",
            timestamp: l.time || (l.timestamp?.toDate?.().toISOString().replace("T", " ").slice(0, 19)) || "",
            source: l.admin || "System",
            type: l.type || (l.action?.toUpperCase().replace(/ /g, "_") ?? "LOG"),
            message: l.action || l.message || "System event",
            bg: l.type === "CRITICAL" ? "#fff1f2" : l.type === "SECURITY" ? "#fffbeb" : "",
          }));
          setLogs(mapped);
        }
      },
      { orderByField: "timestamp", limitTo: 50 }
    );
    return () => unsubscribe();
  }, []);

  const filtered = logs.filter(l => {
    if (activeFilter === "all")   return true;
    if (activeFilter === "info")  return l.status === "info" && l.type !== "API_CALL";
    if (activeFilter === "warn")  return l.status === "warning";
    if (activeFilter === "error") return l.status === "critical";
    if (activeFilter === "api")   return l.type === "API_CALL";
    if (activeFilter === "auth")  return l.type === "SECURITY" || l.message.toLowerCase().includes("auth");
    return true;
  });

  const barMax = Math.max(...barData);

  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --sidebar: #1a1f2e;
          --sidebar-hover: #242938;
          --sidebar-active: #2d3448;
          --accent: #2563eb;
          --accent-light: #eff6ff;
          --bg: #f4f6f9;
          --white: #fff;
          --border: #e5e8ed;
          --text: #111827;
          --muted: #6b7280;
          --font: 'Inter', sans-serif;
          --shadow: 0 1px 3px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04);
        }

        .root { display: flex; height: 100vh; font-family: var(--font); color: var(--text); overflow: hidden; background: var(--bg); }

        /* ── SIDEBAR ── */
        .sidebar { width: 240px; flex-shrink: 0; background: var(--sidebar); display: flex; flex-direction: column; }
        .sb-brand { padding: 18px 16px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; gap: 10px; }
        .sb-brand-icon { width: 36px; height: 36px; border-radius: 9px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 3px 8px rgba(37,99,235,0.4); flex-shrink: 0; }
        .sb-brand-name { font-size: 0.95rem; font-weight: 700; color: #f1f5f9; line-height: 1.2; }
        .sb-brand-sub  { font-size: 0.68rem; color: rgba(255,255,255,0.35); }
        .sb-nav { flex: 1; padding: 14px 10px; overflow-y: auto; }
        .sb-section { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.25); padding: 10px 8px 5px; }
        .sb-item { display: flex; align-items: center; gap: 9px; padding: 9px 10px; border-radius: 8px; cursor: pointer; font-size: 0.875rem; font-weight: 500; color: rgba(255,255,255,0.5); transition: all 0.15s; border: none; background: none; width: 100%; text-align: left; font-family: var(--font); margin-bottom: 1px; }
        .sb-item:hover  { background: var(--sidebar-hover); color: rgba(255,255,255,0.85); }
        .sb-item.active { background: var(--accent); color: #fff; box-shadow: 0 3px 10px rgba(37,99,235,0.3); }
        .sb-icon { font-size: 14px; width: 20px; text-align: center; flex-shrink: 0; }
        .sb-export { padding: 14px; border-top: 1px solid rgba(255,255,255,0.07); }
        .btn-export-all { width: 100%; background: var(--accent); color: white; border: none; padding: 11px; border-radius: 9px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); display: flex; align-items: center; justify-content: center; gap: 7px; transition: all 0.18s; box-shadow: 0 3px 10px rgba(37,99,235,0.35); }
        .btn-export-all:hover { background: #1d4ed8; transform: translateY(-1px); }

        /* ── RIGHT ── */
        .right { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        /* ── TOPBAR ── */
        .topbar { background: var(--white); border-bottom: 1px solid var(--border); padding: 0 20px; height: 56px; display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .tb-breadcrumb { font-size: 0.84rem; color: var(--muted); display: flex; align-items: center; gap: 6px; }
        .tb-breadcrumb a { color: var(--muted); text-decoration: none; }
        .tb-breadcrumb a:hover { color: var(--accent); }
        .tb-breadcrumb .sep { color: #d1d5db; }
        .tb-breadcrumb .cur { color: var(--text); font-weight: 600; }
        .tb-search { flex: 1; max-width: 380px; margin-left: 16px; display: flex; align-items: center; gap: 8px; background: #f4f6f9; border: 1.5px solid var(--border); border-radius: 9px; padding: 7px 13px; transition: all 0.18s; }
        .tb-search:focus-within { border-color: var(--accent); background: var(--white); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .tb-search input { border: none; background: none; outline: none; font-size: 0.855rem; color: var(--text); width: 100%; font-family: var(--font); }
        .tb-search input::placeholder { color: #bbb; }
        .tb-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; }
        .tb-icon { width: 34px; height: 34px; border-radius: 8px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all 0.15s; position: relative; }
        .tb-icon:hover { border-color: var(--accent); background: var(--accent-light); }
        .tb-notif-dot { position: absolute; top: 4px; right: 4px; width: 7px; height: 7px; background: #ef4444; border-radius: 50%; border: 1.5px solid white; }
        .tb-avatar-btn { width: 34px; height: 34px; border-radius: 50%; background: var(--accent); border: none; cursor: pointer; color: white; font-size: 0.75rem; font-weight: 700; font-family: var(--font); }

        /* ── BODY ── */
        .body { flex: 1; display: grid; grid-template-columns: 1fr 300px; overflow: hidden; }

        /* ── LEFT PANEL ── */
        .left-panel { display: flex; flex-direction: column; overflow: hidden; padding: 24px; gap: 16px; }

        /* Page title */
        .page-title { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 3px; }
        .page-desc  { font-size: 0.875rem; color: var(--muted); }

        /* Controls row */
        .controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .btn-pause { display: flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 9px; border: 1.5px solid var(--border); background: var(--white); color: var(--text); font-size: 0.855rem; font-weight: 600; cursor: pointer; font-family: var(--font); transition: all 0.15s; }
        .btn-pause:hover { border-color: var(--accent); color: var(--accent); }
        .btn-pause.paused { border-color: #ef4444; color: #dc2626; background: #fef2f2; }
        .pause-dot { width: 8px; height: 8px; border-radius: 50%; background: #16a34a; }
        .pause-dot.paused { background: #ef4444; }
        .btn-time { display: flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 9px; border: 1.5px solid var(--border); background: var(--white); color: var(--muted); font-size: 0.855rem; font-weight: 500; cursor: pointer; font-family: var(--font); transition: all 0.15s; }
        .btn-time:hover { border-color: var(--accent); color: var(--accent); }

        /* Filter tabs */
        .filter-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .ftab { display: flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; border: 1.5px solid var(--border); background: var(--white); color: var(--muted); transition: all 0.15s; font-family: var(--font); }
        .ftab:hover { border-color: var(--accent); color: var(--accent); }
        .ftab.active { background: var(--accent); color: white; border-color: var(--accent); }
        .ftab-sep { width: 1px; height: 24px; background: var(--border); margin: 0 2px; align-self: center; }

        /* Log table card */
        .log-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 12px; box-shadow: var(--shadow); overflow: hidden; flex: 1; display: flex; flex-direction: column; }
        .log-table-wrap { flex: 1; overflow-y: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { padding: 10px 14px; text-align: left; font-size: 0.66rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--border); white-space: nowrap; position: sticky; top: 0; background: var(--white); z-index: 1; }
        td { padding: 11px 14px; font-size: 0.82rem; border-bottom: 1px solid #f3f4f6; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr { cursor: pointer; transition: background 0.1s; }
        tr:hover td { filter: brightness(0.97); }
        .td-status { width: 32px; text-align: center; font-size: 13px; }
        .td-ts { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.76rem; color: var(--muted); white-space: nowrap; }
        .td-source { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.76rem; white-space: nowrap; }
        .type-badge { display: inline-block; padding: 3px 9px; border-radius: 5px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; font-family: 'SF Mono', 'Fira Code', monospace; white-space: nowrap; }
        .td-msg { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.76rem; color: #374151; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .td-msg.critical { color: #dc2626; }
        .td-msg.warning  { color: #d97706; }

        /* expanded row */
        .expanded-row td { padding: 10px 14px 16px; background: #f9fafb; font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.76rem; color: #374151; line-height: 1.7; }

        /* log footer */
        .log-footer { padding: 11px 16px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
        .log-count { font-size: 0.8rem; color: var(--muted); }
        .log-count strong { color: var(--text); }
        .log-nav { display: flex; gap: 8px; font-size: 0.8rem; color: var(--muted); }
        .log-nav-btn { background: none; border: none; cursor: pointer; color: var(--accent); font-size: 0.8rem; font-weight: 500; font-family: var(--font); padding: 0; }
        .log-nav-sep { color: #d1d5db; }

        /* ── RIGHT PANEL ── */
        .right-panel { background: var(--bg); border-left: 1px solid var(--border); padding: 20px 18px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }

        /* System health card */
        .health-section-label { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
        .health-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
        .health-mini { background: var(--white); border: 1.5px solid var(--border); border-radius: 10px; padding: 14px; box-shadow: var(--shadow); }
        .health-mini-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
        .health-mini-val { font-size: 1.4rem; font-weight: 800; display: flex; align-items: center; gap: 6px; }
        .health-badge { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; flex-shrink: 0; }
        .hb-green { background: #dcfce7; color: #16a34a; }
        .hb-amber { background: #fffbeb; color: #d97706; }

        .uptime-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 10px; padding: 14px; box-shadow: var(--shadow); margin-bottom: 4px; }
        .uptime-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .uptime-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
        .uptime-pct { font-size: 0.82rem; font-weight: 700; color: #16a34a; }
        .uptime-bar { height: 8px; background: #f3f4f6; border-radius: 100px; overflow: hidden; }
        .uptime-fill { height: 100%; border-radius: 100px; background: var(--accent); width: 99.99%; }

        /* Failed logins chart */
        .chart-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 10px; padding: 14px; box-shadow: var(--shadow); }
        .chart-bars { display: flex; align-items: flex-end; gap: 4px; height: 80px; margin-bottom: 6px; }
        .chart-bar { flex: 1; border-radius: 3px 3px 0 0; transition: height 0.6s ease; }
        .chart-bar.high { background: #fca5a5; }
        .chart-bar.normal { background: #bfdbfe; }
        .chart-labels { display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--muted); }

        /* Active sessions */
        .sessions-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .sessions-badge { background: #dcfce7; color: #16a34a; font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 100px; }
        .session-item { background: var(--white); border: 1.5px solid var(--border); border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; margin-bottom: 8px; box-shadow: var(--shadow); }
        .session-item:last-child { margin-bottom: 0; }
        .sess-avatar { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; color: white; flex-shrink: 0; }
        .sess-name { font-size: 0.855rem; font-weight: 600; }
        .sess-loc  { font-size: 0.74rem; color: var(--muted); }
        .sess-logout { margin-left: auto; width: 28px; height: 28px; border-radius: 6px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--muted); transition: all 0.15s; }
        .sess-logout:hover { border-color: #fca5a5; color: #ef4444; }

        /* Emergency */
        .btn-lockdown { width: 100%; background: var(--white); border: 1.5px solid #fca5a5; color: #dc2626; padding: 12px; border-radius: 9px; font-size: 0.875rem; font-weight: 700; cursor: pointer; font-family: var(--font); display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.18s; letter-spacing: 0.02em; }
        .btn-lockdown:hover { background: #fef2f2; border-color: #f87171; }
        .btn-lockdown.done { border-color: #86efac; color: #16a34a; background: #f0fdf4; }

        /* Modal */
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
        .modal { background: var(--white); border-radius: 16px; padding: 28px; width: 420px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
        .modal-icon { width: 48px; height: 48px; border-radius: 12px; background: #fef2f2; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 16px; }
        .modal-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; }
        .modal-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.65; margin-bottom: 20px; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
        .btn-cancel { background: var(--white); border: 1.5px solid var(--border); color: var(--text); padding: 9px 18px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); }
        .btn-danger { background: #dc2626; color: white; border: none; padding: 9px 18px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); }
        .btn-danger:hover { background: #b91c1c; }

        /* Animation for new log rows */
        @keyframes fadeInRow { from { opacity: 0; background: #eff6ff; } to { opacity: 1; } }
        .new-row td { animation: fadeInRow 0.5s ease; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sb-brand">
          <div className="sb-brand-icon">🖥</div>
          <div>
            <div className="sb-brand-name">AdminConsole</div>
            <div className="sb-brand-sub">Super Admin Access</div>
          </div>
        </div>
        <div className="sb-nav">
          <div className="sb-section">Main</div>
          {navMain.map(item => (
            <button key={item.id} className={`sb-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
              <span className="sb-icon">{item.icon}</span>{item.label}
            </button>
          ))}
          <div className="sb-section" style={{ marginTop: 12 }}>System</div>
          {navSystem.map(item => (
            <button key={item.id} className={`sb-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
              <span className="sb-icon">{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
        <div className="sb-export">
          <button className="btn-export-all">⬇ Export All Logs</button>
        </div>
      </aside>

      {/* ── RIGHT ── */}
      <div className="right">

        {/* TOPBAR */}
        <header className="topbar">
          <div className="tb-breadcrumb">
            <a href="#">Admin</a>
            <span className="sep">›</span>
            <span className="cur">System Logs</span>
          </div>
          <div className="tb-search">
            <span style={{ fontSize: 13, color: "#bbb" }}>🔍</span>
            <input placeholder="Search logs, IP, users..." />
          </div>
          <div className="tb-actions">
            <button className="tb-icon">🔔<span className="tb-notif-dot" /></button>
            <button className="tb-icon">⚙️</button>
            <button className="tb-avatar-btn">JD</button>
          </div>
        </header>

        {/* BODY */}
        <div className="body">

          {/* LEFT PANEL */}
          <div className="left-panel">
            <div>
              <div className="page-title">System Telemetry</div>
              <div className="page-desc">Real-time stream of all platform activities and automated tasks.</div>
            </div>

            {/* Controls */}
            <div className="controls">
              <button className={`btn-pause ${paused ? "paused" : ""}`} onClick={() => setPaused(p => !p)}>
                <span className={`pause-dot ${paused ? "paused" : ""}`} />
                {paused ? "RESUME FEED" : "PAUSE FEED"}
              </button>
              <button className="btn-time">📅 LAST 24 HOURS</button>
            </div>

            {/* Filter tabs */}
            <div className="filter-tabs">
              {filterTabs.map((tab, i) => (
                <>
                  {i === 4 && <div key="sep" className="ftab-sep" />}
                  <button
                    key={tab.id}
                    className={`ftab ${activeFilter === tab.id ? "active" : ""}`}
                    onClick={() => setActiveFilter(tab.id)}
                  >
                    <span>{tab.icon}</span>{tab.label}
                  </button>
                </>
              ))}
            </div>

            {/* Log Table */}
            <div className="log-card">
              <div className="log-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Timestamp</th>
                      <th>Source (IP)</th>
                      <th>Event Type</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((log, i) => {
                      const ts = typeStyles[log.type] || typeStyles.LOG;
                      const si = statusIcon[log.status];
                      const isExpanded = expandedLog === log.id;
                      return (
                        <>
                          <tr
                            key={log.id}
                            className={i === 0 && !paused ? "new-row" : ""}
                            style={{ background: log.bg || "transparent" }}
                            onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                          >
                            <td className="td-status">{si.icon}</td>
                            <td className="td-ts">{log.timestamp}</td>
                            <td className="td-source">{log.source}</td>
                            <td>
                              <span className="type-badge" style={{ background: ts.bg, color: ts.color }}>
                                {log.type}
                              </span>
                            </td>
                            <td className={`td-msg ${log.status === "critical" ? "critical" : log.status === "warning" ? "warning" : ""}`}>
                              {log.message.length > 52 ? log.message.slice(0, 52) + "…" : log.message}
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr key={`exp-${log.id}`} className="expanded-row">
                              <td colSpan={5}>
                                <strong>Full Message:</strong> {log.message}<br />
                                <strong>Source:</strong> {log.source} &nbsp;|&nbsp;
                                <strong>Type:</strong> {log.type} &nbsp;|&nbsp;
                                <strong>Timestamp:</strong> {log.timestamp}
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="log-footer">
                <div className="log-count">Showing <strong>250</strong> of <strong>4,821</strong> events</div>
                <div className="log-nav">
                  <button className="log-nav-btn">First</button>
                  <button className="log-nav-btn">Previous</button>
                  <span className="log-nav-sep">|</span>
                  <button className="log-nav-btn">Next</button>
                  <button className="log-nav-btn">Last</button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="right-panel">

            {/* System Health */}
            <div>
              <div className="health-section-label">System Health</div>
              <div className="health-grid">
                <div className="health-mini">
                  <div className="health-mini-label">CPU Load</div>
                  <div className="health-mini-val">
                    {Math.round(cpu)}%
                    <span style={{ fontSize: 12, color: cpu > 70 ? "#ef4444" : "#16a34a" }}>
                      {cpu > 70 ? "↑" : "↘"}
                    </span>
                  </div>
                </div>
                <div className="health-mini">
                  <div className="health-mini-label">Latency</div>
                  <div className="health-mini-val">
                    {Math.round(latency)}ms
                    <div className={`health-badge ${latency > 100 ? "hb-amber" : "hb-green"}`}>✓</div>
                  </div>
                </div>
              </div>
              <div className="uptime-card">
                <div className="uptime-header">
                  <div className="uptime-label">API Status (Uptime)</div>
                  <div className="uptime-pct">99.99%</div>
                </div>
                <div className="uptime-bar"><div className="uptime-fill" /></div>
              </div>
            </div>

            {/* Failed Logins Chart */}
            <div>
              <div className="health-section-label">Failed Logins (24h)</div>
              <div className="chart-card">
                <div className="chart-bars">
                  {barData.map((v, i) => (
                    <div
                      key={i}
                      className={`chart-bar ${v > 60 ? "high" : "normal"}`}
                      style={{ height: `${(v / barMax) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="chart-labels">
                  <span>00:00</span><span>12:00</span><span>23:59</span>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div>
              <div className="sessions-header">
                <div className="health-section-label" style={{ margin: 0 }}>Active Sessions</div>
                <div className="sessions-badge">4 Online</div>
              </div>
              {sessions.map(s => (
                <div className="session-item" key={s.name}>
                  <div className="sess-avatar" style={{ background: s.color }}>{s.initials}</div>
                  <div>
                    <div className="sess-name">{s.name}</div>
                    <div className="sess-loc">{s.location}</div>
                  </div>
                  <button className="sess-logout" title="Terminate session">↪</button>
                </div>
              ))}
            </div>

            {/* Emergency Lockdown */}
            <div>
              <button
                className={`btn-lockdown ${lockdownDone ? "done" : ""}`}
                onClick={() => setLockdownModal(true)}
              >
                ⊗ {lockdownDone ? "LOCKDOWN ACTIVE" : "EMERGENCY LOCKDOWN"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* LOCKDOWN MODAL */}
      {lockdownModal && (
        <div className="overlay" onClick={() => setLockdownModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🔒</div>
            <div className="modal-title">Trigger Emergency Lockdown?</div>
            <div className="modal-desc">
              This will immediately terminate all active user sessions, suspend API access, and restrict the platform to Super Admin only. This action is logged and audited.
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setLockdownModal(false)}>Cancel</button>
              <button className="btn-danger" onClick={() => {
                setLockdownModal(false);
                setLockdownDone(true);
                addLog("Emergency lockdown activated", "Super Admin", "CRITICAL").catch(() => {});
              }}>
                Confirm Lockdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
