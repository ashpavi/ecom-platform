import { useState, useEffect } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const stores = [
  { id: "8832-A", name: "Nike Outlet", owner: "john.doe@nike.com", plan: "Enterprise", status: "active", initials: "N", color: "#2563eb" },
  { id: "1029-B", name: "Zara Global", owner: "maria.s@zara.com", plan: "Enterprise", status: "warning", initials: "Z", color: "#f59e0b" },
  { id: "4421-C", name: "Local Coffee Co.", owner: "steve@localcoffee.com", plan: "Basic", status: "suspended", initials: "L", color: "#6b7280" },
  { id: "7731-D", name: "TechZone", owner: "admin@techzone.io", plan: "Pro", status: "active", initials: "T", color: "#8b5cf6" },
  { id: "2210-E", name: "FreshMart", owner: "ops@freshmart.com", plan: "Basic", status: "active", initials: "F", color: "#10b981" },
];

const accessLogs = [
  { user: "devon.lane", role: "Super Admin", ip: "192.168.1.42", lastActive: "Just now" },
  { user: "courtney.h", role: "Support Lead", ip: "10.0.0.51", lastActive: "2 mins ago" },
  { user: "floyd.miles", role: "Developer", ip: "172.16.254.1", lastActive: "15 mins ago" },
  { user: "esther.howard", role: "Store Admin", ip: "10.0.0.88", lastActive: "1 hr ago" },
  { user: "jenny.wilson", role: "Support Lead", ip: "192.168.2.10", lastActive: "3 hrs ago" },
];

const initialApiLogs = [
  { status: 200, method: "GET",  path: "/api/v1/stores/8832…", ms: 45 },
  { status: 200, method: "POST", path: "/api/v1/checkout…",    ms: 120 },
  { status: 401, method: "POST", path: "/api/v1/admin/au…",    ms: 12 },
  { status: 200, method: "GET",  path: "/api/v1/users/me",     ms: 23 },
  { status: 500, method: "POST", path: "/api/v1/webhooks/…",   ms: 890 },
  { status: 200, method: "GET",  path: "/api/v1/analytics…",   ms: 340 },
  { status: 201, method: "POST", path: "/api/v1/products/…",   ms: 210 },
];

const navPlatform = [
  { id: "stores", icon: "🏪", label: "Stores" },
  { id: "admins", icon: "👤", label: "Admins" },
  { id: "subscriptions", icon: "📋", label: "Subscriptions" },
];
const navTechnical = [
  { id: "apikeys", icon: "🔑", label: "API Keys" },
  { id: "logs", icon: "🖥", label: "System Logs" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

const statusColor = {
  active:    { bg: "#f0fdf4", color: "#16a34a", dot: "#16a34a", label: "Active" },
  warning:   { bg: "#fffbeb", color: "#ca8a04", dot: "#f59e0b", label: "Warning" },
  suspended: { bg: "#fef2f2", color: "#dc2626", dot: "#ef4444", label: "Suspended" },
};

const statusCode = {
  200: "#4ade80", 201: "#86efac", 401: "#fb923c", 500: "#f87171",
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function randomApiLog() {
  const paths = ["/api/v1/stores/…", "/api/v1/users/…", "/api/v1/orders/…", "/api/v1/products/…", "/api/v1/auth/…"];
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const statuses = [200, 200, 200, 201, 401, 404, 500];
  return {
    status: statuses[Math.floor(Math.random() * statuses.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    path: paths[Math.floor(Math.random() * paths.length)],
    ms: Math.floor(Math.random() * 900) + 10,
  };
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Control() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [apiLogs, setApiLogs] = useState(initialApiLogs);
  const [cpu, setCpu] = useState(42);
  const [mem, setMem] = useState(78);
  const [storage] = useState(24);
  const [maintenanceModal, setMaintenanceModal] = useState(false);
  const [flushed, setFlushed] = useState(false);

  // Live API stream ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setApiLogs(prev => [randomApiLog(), ...prev.slice(0, 6)]);
      setCpu(v => Math.min(99, Math.max(20, v + (Math.random() * 10 - 5))));
      setMem(v => Math.min(99, Math.max(40, v + (Math.random() * 6 - 3))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleFlushCache = () => {
    setFlushed(true);
    setTimeout(() => setFlushed(false), 2500);
  };

  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --accent: #2563eb;
          --accent-light: #eff6ff;
          --bg: #f4f6f9;
          --white: #fff;
          --border: #e5e8ed;
          --text: #111827;
          --muted: #6b7280;
          --sidebar-w: 240px;
          --topbar-h: 56px;
          --font: 'Inter', sans-serif;
          --shadow: 0 1px 3px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04);
        }

        .root { display: flex; height: 100vh; font-family: var(--font); background: var(--bg); color: var(--text); overflow: hidden; }

        /* ── SIDEBAR ── */
        .sidebar {
          width: var(--sidebar-w); flex-shrink: 0;
          background: var(--white); border-right: 1px solid var(--border);
          display: flex; flex-direction: column;
          overflow-y: auto;
        }
        .sb-brand {
          padding: 18px 16px 16px; border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 10px;
        }
        .sb-brand-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--accent); display: flex; align-items: center;
          justify-content: center; font-size: 18px; box-shadow: 0 3px 8px rgba(37,99,235,0.35);
        }
        .sb-brand-name { font-size: 0.95rem; font-weight: 700; color: var(--text); line-height: 1.2; }
        .sb-brand-sub { font-size: 0.72rem; color: var(--muted); }

        .sb-nav { padding: 12px 10px; flex: 1; }
        .sb-section-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; padding: 10px 8px 6px; }
        .sb-item {
          display: flex; align-items: center; gap: 9px; padding: 9px 10px;
          border-radius: 8px; cursor: pointer; font-size: 0.875rem; font-weight: 500;
          color: var(--muted); transition: all 0.15s; border: none; background: none;
          width: 100%; text-align: left; font-family: var(--font); margin-bottom: 1px;
        }
        .sb-item:hover { background: #f4f6f9; color: var(--text); }
        .sb-item.active { background: var(--accent-light); color: var(--accent); font-weight: 600; }
        .sb-icon { font-size: 15px; width: 20px; text-align: center; flex-shrink: 0; }

        .sb-footer {
          padding: 14px 16px; border-top: 1px solid var(--border);
          display: flex; align-items: center; gap: 10px;
        }
        .sb-avatar { width: 36px; height: 36px; border-radius: 50%; overflow: hidden; flex-shrink: 0; border: 2px solid var(--border); }
        .sb-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .sb-name { font-size: 0.82rem; font-weight: 600; }
        .sb-email { font-size: 0.72rem; color: var(--muted); }
        .sb-logout { margin-left: auto; width: 28px; height: 28px; border-radius: 6px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--muted); transition: all 0.15s; }
        .sb-logout:hover { border-color: #fca5a5; color: #ef4444; }

        /* ── RIGHT ── */
        .right { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        /* ── TOPBAR ── */
        .topbar {
          height: var(--topbar-h); background: var(--white); border-bottom: 1px solid var(--border);
          display: flex; align-items: center; padding: 0 24px; gap: 16px; flex-shrink: 0;
        }
        .tb-title { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em; flex-shrink: 0; }
        .tb-search {
          flex: 1; max-width: 440px; display: flex; align-items: center; gap: 9px;
          background: #f4f6f9; border: 1.5px solid var(--border); border-radius: 9px;
          padding: 8px 14px; transition: all 0.18s;
        }
        .tb-search:focus-within { border-color: var(--accent); background: var(--white); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .tb-search input { border: none; background: none; outline: none; font-size: 0.875rem; color: var(--text); width: 100%; font-family: var(--font); }
        .tb-search input::placeholder { color: #bbb; }
        .tb-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }
        .tb-icon-btn { width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; position: relative; transition: all 0.15s; }
        .tb-icon-btn:hover { border-color: var(--accent); background: var(--accent-light); }
        .tb-notif { position: absolute; top: 4px; right: 4px; width: 7px; height: 7px; background: #ef4444; border-radius: 50%; border: 1.5px solid white; }
        .btn-new-tenant {
          display: flex; align-items: center; gap: 7px;
          background: var(--accent); color: white; border: none; padding: 8px 18px;
          border-radius: 9px; font-size: 0.875rem; font-weight: 600; cursor: pointer;
          font-family: var(--font); transition: all 0.18s; box-shadow: 0 3px 8px rgba(37,99,235,0.3);
        }
        .btn-new-tenant:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 5px 14px rgba(37,99,235,0.35); }

        /* ── CONTENT ── */
        .content { flex: 1; overflow-y: auto; padding: 24px; }

        /* ── PAGE HEADER ── */
        .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
        .page-title { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 4px; }
        .page-desc { font-size: 0.875rem; color: var(--muted); }
        .health-badges { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .health-badge { display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 100px; border: 1.5px solid var(--border); font-size: 0.78rem; font-weight: 600; background: var(--white); }
        .health-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .health-dot.green { background: #16a34a; }
        .health-dot.amber { background: #f59e0b; }

        /* ── STAT CARDS ── */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
        .stat-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 12px; padding: 18px 20px; box-shadow: var(--shadow); transition: all 0.2s; position: relative; overflow: hidden; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.09); }
        .stat-card-bg { position: absolute; right: -10px; top: 50%; transform: translateY(-50%); font-size: 3.5rem; opacity: 0.07; pointer-events: none; }
        .stat-label { font-size: 0.8rem; color: var(--muted); margin-bottom: 8px; font-weight: 500; }
        .stat-val-row { display: flex; align-items: baseline; gap: 8px; }
        .stat-value { font-size: 1.65rem; font-weight: 800; letter-spacing: -0.03em; }
        .stat-badge { font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 100px; }
        .stat-badge.up { background: #f0fdf4; color: #16a34a; }
        .stat-badge.down { background: #fef2f2; color: #dc2626; }
        .stat-sub { font-size: 0.75rem; color: var(--muted); margin-top: 4px; }

        /* ── MAIN GRID ── */
        .main-grid { display: grid; grid-template-columns: 1fr 320px; gap: 16px; }

        /* ── CARD ── */
        .card { background: var(--white); border: 1.5px solid var(--border); border-radius: 12px; box-shadow: var(--shadow); overflow: hidden; margin-bottom: 16px; }
        .card:last-child { margin-bottom: 0; }
        .card-header { padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .card-title { font-size: 0.95rem; font-weight: 700; }
        .card-link { font-size: 0.82rem; color: var(--accent); font-weight: 500; cursor: pointer; text-decoration: none; }
        .card-link:hover { text-decoration: underline; }

        /* ── TABLE ── */
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { padding: 10px 16px; text-align: left; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--border); white-space: nowrap; }
        td { padding: 14px 16px; font-size: 0.855rem; border-bottom: 1px solid #f3f4f6; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #fafbfc; }

        .store-cell { display: flex; align-items: center; gap: 10px; }
        .store-avatar { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: white; flex-shrink: 0; }
        .store-name { font-weight: 600; font-size: 0.875rem; }
        .store-id { font-size: 0.72rem; color: var(--muted); }

        .plan-badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 0.72rem; font-weight: 600; }
        .plan-Enterprise { background: #f3e8ff; color: #7c3aed; }
        .plan-Pro { background: #e0f2fe; color: #0369a1; }
        .plan-Basic { background: #f3f4f6; color: #6b7280; }

        .status-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 100px; font-size: 0.72rem; font-weight: 600; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; }

        /* Monospace log table */
        .log-table th { font-family: 'Inter', monospace; }
        .log-table td { font-family: 'Inter', monospace; font-size: 0.82rem; padding: 11px 16px; color: #4b5563; }
        .log-table td:first-child { color: var(--text); font-weight: 500; }

        /* ── RIGHT COLUMN ── */
        .right-col {}

        /* ── INFRA LOAD ── */
        .infra-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 12px; padding: 18px 20px; box-shadow: var(--shadow); margin-bottom: 14px; }
        .infra-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 16px; }
        .infra-item { margin-bottom: 14px; }
        .infra-item:last-child { margin-bottom: 0; }
        .infra-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .infra-label { font-size: 0.82rem; font-weight: 500; }
        .infra-pct { font-size: 0.82rem; font-weight: 700; }
        .bar-track { height: 8px; background: #f3f4f6; border-radius: 100px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 100px; transition: width 1s ease; }
        .bar-blue { background: var(--accent); }
        .bar-amber { background: #f59e0b; }
        .bar-green { background: #10b981; }
        .bar-danger { background: #ef4444; }

        /* ── LIVE API STREAM ── */
        .api-stream-card { background: #0d1117; border: 1.5px solid #21262d; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow); margin-bottom: 14px; }
        .api-stream-header { padding: 12px 16px; border-bottom: 1px solid #21262d; display: flex; align-items: center; justify-content: space-between; }
        .api-stream-title { font-size: 0.875rem; font-weight: 700; color: #e6edf3; display: flex; align-items: center; gap: 8px; }
        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #3fb950; box-shadow: 0 0 6px #3fb950; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .api-row { display: flex; align-items: center; gap: 10px; padding: 7px 14px; border-bottom: 1px solid #161b22; font-size: 0.78rem; font-family: 'SF Mono', 'Fira Code', monospace; transition: background 0.2s; }
        .api-row:last-child { border-bottom: none; }
        .api-row:hover { background: #161b22; }
        .api-status { font-weight: 700; width: 32px; text-align: center; }
        .api-method { width: 38px; color: #79c0ff; font-weight: 600; }
        .api-path { flex: 1; color: #8b949e; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .api-ms { color: #6e7681; width: 40px; text-align: right; font-size: 0.72rem; }

        /* ── EMERGENCY ── */
        .emergency-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 12px; padding: 16px 18px; box-shadow: var(--shadow); }
        .emergency-title { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
        .emergency-btns { display: flex; gap: 10px; }
        .btn-flush { flex: 1; background: var(--white); border: 1.5px solid var(--border); color: var(--text); padding: 9px 12px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; font-family: var(--font); transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .btn-flush:hover { border-color: #93c5fd; background: #eff6ff; }
        .btn-flush.flushed { border-color: #86efac; background: #f0fdf4; color: #16a34a; }
        .btn-maintenance { flex: 1; background: #fef2f2; border: 1.5px solid #fca5a5; color: #dc2626; padding: 9px 12px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; font-family: var(--font); transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .btn-maintenance:hover { background: #fee2e2; border-color: #f87171; }

        /* ── MODAL ── */
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
        .modal { background: var(--white); border-radius: 14px; padding: 28px; width: 400px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
        .modal-icon { width: 48px; height: 48px; border-radius: 12px; background: #fef2f2; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 16px; }
        .modal-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; }
        .modal-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.6; margin-bottom: 20px; }
        .modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
        .btn-cancel { background: var(--white); border: 1.5px solid var(--border); color: var(--text); padding: 8px 18px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); }
        .btn-confirm-danger { background: #dc2626; color: white; border: none; padding: 8px 18px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); }
        .btn-confirm-danger:hover { background: #b91c1c; }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .main-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sb-brand">
          <div className="sb-brand-icon">🌐</div>
          <div>
            <div className="sb-brand-name">Nexus Control</div>
            <div className="sb-brand-sub">Super Admin</div>
          </div>
        </div>

        <div className="sb-nav">
          <button className={`sb-item ${activeNav === "dashboard" ? "active" : ""}`} onClick={() => setActiveNav("dashboard")}>
            <span className="sb-icon">⊞</span> Dashboard
          </button>

          <div className="sb-section-label">Platform</div>
          {navPlatform.map(item => (
            <button key={item.id} className={`sb-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
              <span className="sb-icon">{item.icon}</span> {item.label}
            </button>
          ))}

          <div className="sb-section-label">Technical</div>
          {navTechnical.map(item => (
            <button key={item.id} className={`sb-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
              <span className="sb-icon">{item.icon}</span> {item.label}
            </button>
          ))}
        </div>

        <div className="sb-footer">
          <div className="sb-avatar">
            <img src="https://api.dicebear.com/7.x/personas/svg?seed=devon&backgroundColor=b6e3f4" alt="Devon" />
          </div>
          <div>
            <div className="sb-name">Devon Lane</div>
            <div className="sb-email">dev@nexus.com</div>
          </div>
          <button className="sb-logout" title="Sign out">↪</button>
        </div>
      </aside>

      {/* ── RIGHT PANEL ── */}
      <div className="right">

        {/* ── TOPBAR ── */}
        <header className="topbar">
          <div className="tb-title">Control Center</div>
          <div className="tb-search">
            <span style={{ fontSize: 13, color: "#bbb" }}>🔍</span>
            <input placeholder="Search stores, transaction IDs, or logs..." />
          </div>
          <div className="tb-right">
            <button className="tb-icon-btn">🔔<span className="tb-notif" /></button>
            <button className="tb-icon-btn">❓</button>
            <button className="btn-new-tenant">＋ New Tenant</button>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <div className="content">

          {/* Page Header */}
          <div className="page-header">
            <div>
              <div className="page-title">System Overview</div>
              <div className="page-desc">Real-time platform monitoring and management.</div>
            </div>
            <div className="health-badges">
              <div className="health-badge"><span className="health-dot green" />Database: Healthy</div>
              <div className="health-badge"><span className="health-dot green" />Redis: Healthy</div>
              <div className="health-badge"><span className="health-dot amber" />Mail: High Load</div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-bg">🏪</div>
              <div className="stat-label">Total Active Stores</div>
              <div className="stat-val-row">
                <div className="stat-value">1,248</div>
                <span className="stat-badge up">+12%</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-bg">⚡</div>
              <div className="stat-label">System Uptime</div>
              <div className="stat-val-row">
                <div className="stat-value">99.99%</div>
              </div>
              <div className="stat-sub">Last 30 days</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-bg">💰</div>
              <div className="stat-label">Monthly Revenue (MRR)</div>
              <div className="stat-val-row">
                <div className="stat-value">$482,000</div>
                <span className="stat-badge down">-2.1%</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-bg">👥</div>
              <div className="stat-label">Active Sessions</div>
              <div className="stat-val-row">
                <div className="stat-value">3,842</div>
                <span className="stat-badge up">+5.4%</span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="main-grid">

            {/* Left Column */}
            <div>
              {/* Recent Store Activity */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Recent Store Activity</div>
                  <a className="card-link">View All Stores →</a>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Store Name</th>
                        <th>Owner</th>
                        <th>Plan</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stores.map(store => {
                        const s = statusColor[store.status];
                        return (
                          <tr key={store.id}>
                            <td>
                              <div className="store-cell">
                                <div className="store-avatar" style={{ background: store.color }}>{store.initials}</div>
                                <div>
                                  <div className="store-name">{store.name}</div>
                                  <div className="store-id">ID: {store.id}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "var(--muted)", fontSize: "0.84rem" }}>{store.owner}</td>
                            <td><span className={`plan-badge plan-${store.plan}`}>{store.plan}</span></td>
                            <td>
                              <span className="status-badge" style={{ background: s.bg, color: s.color }}>
                                <span className="status-dot" style={{ background: s.dot }} />
                                {s.label}
                              </span>
                            </td>
                            <td>
                              <button style={{ fontSize: "0.78rem", padding: "4px 10px", borderRadius: "6px", border: "1.5px solid var(--border)", background: "var(--white)", cursor: "pointer", color: "var(--muted)", fontFamily: "var(--font)", fontWeight: 500 }}>
                                Manage
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Admin Access Logs */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Admin Access Logs</div>
                  <a className="card-link">View Full Log →</a>
                </div>
                <div className="table-wrap">
                  <table className="log-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>IP Address</th>
                        <th>Last Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accessLogs.map((log, i) => (
                        <tr key={i}>
                          <td>{log.user}</td>
                          <td>{log.role}</td>
                          <td>{log.ip}</td>
                          <td>{log.lastActive}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-col">

              {/* Infrastructure Load */}
              <div className="infra-card">
                <div className="infra-title">Infrastructure Load</div>
                {[
                  { label: "CPU Usage", pct: Math.round(cpu), cls: cpu > 70 ? "bar-danger" : "bar-blue" },
                  { label: "Memory", pct: Math.round(mem), cls: mem > 80 ? "bar-danger" : "bar-amber" },
                  { label: "Storage", pct: storage, cls: "bar-green" },
                ].map(item => (
                  <div className="infra-item" key={item.label}>
                    <div className="infra-row">
                      <span className="infra-label">{item.label}</span>
                      <span className="infra-pct">{item.pct}%</span>
                    </div>
                    <div className="bar-track">
                      <div className={`bar-fill ${item.cls}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Live API Stream */}
              <div className="api-stream-card">
                <div className="api-stream-header">
                  <div className="api-stream-title">
                    <span style={{ fontSize: 14 }}>🖥</span>
                    Live API Stream
                  </div>
                  <div className="live-dot" />
                </div>
                {apiLogs.map((log, i) => (
                  <div className="api-row" key={i} style={{ opacity: 1 - i * 0.1 }}>
                    <span className="api-status" style={{ color: statusCode[log.status] || "#8b949e" }}>{log.status}</span>
                    <span className="api-method">{log.method}</span>
                    <span className="api-path">{log.path}</span>
                    <span className="api-ms">{log.ms}ms</span>
                  </div>
                ))}
              </div>

              {/* Emergency Controls */}
              <div className="emergency-card">
                <div className="emergency-title">Emergency Controls</div>
                <div className="emergency-btns">
                  <button className={`btn-flush ${flushed ? "flushed" : ""}`} onClick={handleFlushCache}>
                    🗑 {flushed ? "Flushed!" : "Flush Cache"}
                  </button>
                  <button className="btn-maintenance" onClick={() => setMaintenanceModal(true)}>
                    ⚠️ Maintenance
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── MAINTENANCE MODAL ── */}
      {maintenanceModal && (
        <div className="overlay" onClick={() => setMaintenanceModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">⚠️</div>
            <div className="modal-title">Enable Maintenance Mode?</div>
            <div className="modal-desc">
              This will take the platform offline for all users and store owners. Only Super Admins will retain access. Are you sure you want to proceed?
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setMaintenanceModal(false)}>Cancel</button>
              <button className="btn-confirm-danger" onClick={() => setMaintenanceModal(false)}>Enable Maintenance</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
