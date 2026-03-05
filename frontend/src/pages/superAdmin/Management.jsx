import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const allStores = [
  { id: 1, name: "Nexus Electronics", email: "owner@nexus.com", icon: "⚡", iconBg: "#e0e7ff", iconColor: "#4f46e5", plan: "Enterprise", launched: "Oct 12, 2023", status: "active", revenue: "$45,200.00", revChange: "+12.4%", revUp: true },
  { id: 2, name: "Urban Threads", email: "contact@urban.io", icon: "👗", iconBg: "#fce7f3", iconColor: "#db2777", plan: "Pro", launched: "Jan 05, 2024", status: "active", revenue: "$12,850.00", revChange: "0.0%", revUp: null },
  { id: 3, name: "Green Garden", email: "info@greengarden.com", icon: "🌱", iconBg: "#dcfce7", iconColor: "#16a34a", plan: "Basic", launched: "Nov 20, 2023", status: "suspended", revenue: "$2,100.00", revChange: "-45.2%", revUp: false },
  { id: 4, name: "Tech Haven", email: "admin@techhaven.net", icon: "🔧", iconBg: "#fef3c7", iconColor: "#d97706", plan: "Enterprise", launched: "Feb 15, 2024", status: "maintenance", revenue: "$31,400.00", revChange: "+4.1%", revUp: true },
  { id: 5, name: "Pure Glow", email: "sales@pureglow.com", icon: "✨", iconBg: "#e0f2fe", iconColor: "#0284c7", plan: "Pro", launched: "Dec 30, 2023", status: "active", revenue: "$8,900.00", revChange: "-2.8%", revUp: false },
  { id: 6, name: "Cozy Corner", email: "hello@cozycorner.shop", icon: "🛋", iconBg: "#fdf4ff", iconColor: "#9333ea", plan: "Basic", launched: "Mar 01, 2024", status: "active", revenue: "$5,400.00", revChange: "+8.1%", revUp: true },
  { id: 7, name: "Fit Factory", email: "ops@fitfactory.com", icon: "🏋", iconBg: "#fee2e2", iconColor: "#dc2626", plan: "Pro", launched: "Sep 14, 2023", status: "suspended", revenue: "$9,200.00", revChange: "-12.0%", revUp: false },
  { id: 8, name: "The Book Nook", email: "team@booknook.io", icon: "📚", iconBg: "#fef9c3", iconColor: "#ca8a04", plan: "Basic", launched: "Aug 22, 2023", status: "active", revenue: "$3,750.00", revChange: "+1.9%", revUp: true },
  { id: 9, name: "Smart Gadgets", email: "info@smartgadgets.co", icon: "📱", iconBg: "#e0e7ff", iconColor: "#4338ca", plan: "Enterprise", launched: "Jul 10, 2023", status: "active", revenue: "$67,100.00", revChange: "+21.3%", revUp: true },
  { id: 10, name: "Aroma Luxe", email: "contact@aromaluxe.com", icon: "🕯", iconBg: "#fce7f3", iconColor: "#be185d", plan: "Pro", launched: "Nov 05, 2023", status: "maintenance", revenue: "$14,300.00", revChange: "+0.5%", revUp: true },
];

const planStyles = {
  Enterprise: { bg: "#f3e8ff", color: "#7c3aed", border: "#e9d5ff" },
  Pro:        { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  Basic:      { bg: "#f9fafb", color: "#374151", border: "#e5e7eb" },
};

const statusStyles = {
  active:      { bg: "#f0fdf4", color: "#16a34a", dot: "#16a34a",  label: "Active" },
  suspended:   { bg: "#fef2f2", color: "#dc2626", dot: "#ef4444",  label: "Suspended" },
  maintenance: { bg: "#fffbeb", color: "#d97706", dot: "#f59e0b",  label: "Maintenance" },
};

const PAGE_SIZE = 10;
const TOTAL = 1240;
const TOTAL_PAGES = Math.ceil(TOTAL / PAGE_SIZE);

const filterTabs = ["All Stores", "Enterprise", "Pro", "Basic"];
const statusFilters = ["Active", "Suspended"];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Management() {
  const [activePlan, setActivePlan] = useState("All Stores");
  const [activeStatus, setActiveStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [showProvisionModal, setShowProvisionModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", plan: "Pro" });
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 2500); };

  const filtered = allStores.filter(s => {
    const planMatch = activePlan === "All Stores" || s.plan === activePlan;
    const statusMatch = !activeStatus || s.status === activeStatus.toLowerCase();
    return planMatch && statusMatch;
  });

  const pages = [];
  if (TOTAL_PAGES <= 7) {
    for (let i = 1; i <= TOTAL_PAGES; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3, "...", TOTAL_PAGES);
  }

  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --accent: #2563eb;
          --accent-light: #eff6ff;
          --bg: #f8f9fb;
          --white: #fff;
          --border: #e5e8ed;
          --text: #111827;
          --muted: #6b7280;
          --font: 'Inter', sans-serif;
          --shadow: 0 1px 3px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04);
          --radius: 12px;
        }

        .root { min-height: 100vh; background: var(--bg); font-family: var(--font); color: var(--text); display: flex; flex-direction: column; }

        /* ── TOPBAR ── */
        .topbar { background: var(--white); border-bottom: 1px solid var(--border); padding: 0 32px; height: 60px; display: flex; align-items: center; gap: 0; position: sticky; top: 0; z-index: 50; }
        .tb-brand { display: flex; align-items: center; gap: 9px; margin-right: 36px; text-decoration: none; }
        .tb-brand-icon { width: 34px; height: 34px; }
        .tb-brand-name { font-size: 1rem; font-weight: 800; color: var(--text); letter-spacing: -0.02em; }
        .tb-nav { display: flex; gap: 2px; flex: 1; }
        .tb-link { padding: 8px 14px; font-size: 0.875rem; font-weight: 500; color: var(--muted); text-decoration: none; border: none; background: none; cursor: pointer; font-family: var(--font); border-bottom: 2px solid transparent; transition: all 0.15s; }
        .tb-link:hover { color: var(--text); }
        .tb-link.active { color: var(--accent); font-weight: 600; border-bottom-color: var(--accent); }
        .tb-search { display: flex; align-items: center; gap: 8px; background: #f4f6f9; border: 1.5px solid var(--border); border-radius: 9px; padding: 8px 14px; transition: all 0.18s; margin-right: 12px; }
        .tb-search:focus-within { border-color: var(--accent); background: var(--white); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .tb-search input { border: none; background: none; outline: none; font-size: 0.855rem; color: var(--text); width: 200px; font-family: var(--font); }
        .tb-search input::placeholder { color: #bbb; }
        .tb-notif-btn { width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; position: relative; transition: all 0.15s; margin-right: 12px; }
        .tb-notif-btn:hover { border-color: var(--accent); background: var(--accent-light); }
        .tb-notif-dot { position: absolute; top: 5px; right: 5px; width: 7px; height: 7px; background: #ef4444; border-radius: 50%; border: 1.5px solid white; }
        .tb-user { display: flex; align-items: center; gap: 9px; }
        .tb-avatar { width: 34px; height: 34px; border-radius: 50%; overflow: hidden; border: 2px solid var(--border); }
        .tb-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .tb-user-name { font-size: 0.855rem; font-weight: 600; line-height: 1.2; }
        .tb-user-role { font-size: 0.72rem; color: var(--muted); }

        /* ── MAIN ── */
        .main { flex: 1; padding: 32px 32px 0; max-width: 1200px; width: 100%; margin: 0 auto; }

        /* ── PAGE HEADER ── */
        .page-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 24px; }
        .page-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 5px; }
        .page-desc { font-size: 0.875rem; color: var(--muted); }
        .header-actions { display: flex; gap: 10px; }
        .btn-export { background: var(--white); border: 1.5px solid var(--border); color: var(--text); padding: 10px 18px; border-radius: 9px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); display: flex; align-items: center; gap: 7px; transition: all 0.15s; }
        .btn-export:hover { border-color: #9ca3af; }
        .btn-provision { background: var(--accent); color: white; border: none; padding: 10px 20px; border-radius: 9px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); display: flex; align-items: center; gap: 7px; transition: all 0.18s; box-shadow: 0 3px 10px rgba(37,99,235,0.3); }
        .btn-provision:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 5px 14px rgba(37,99,235,0.35); }

        /* ── STAT CARDS ── */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .stat-card { background: var(--white); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 22px 24px; box-shadow: var(--shadow); display: flex; align-items: center; gap: 16px; }
        .stat-icon-wrap { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .stat-label { font-size: 0.82rem; color: var(--muted); margin-bottom: 4px; font-weight: 500; }
        .stat-value { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 4px; }
        .stat-sub { font-size: 0.78rem; font-weight: 600; display: flex; align-items: center; gap: 4px; }
        .stat-sub.green { color: #16a34a; }
        .stat-sub.amber { color: #d97706; }
        .stat-sub.blue { color: var(--accent); }

        /* ── TABLE CARD ── */
        .table-card { background: var(--white); border: 1.5px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; margin-bottom: 32px; }

        /* ── FILTERS ── */
        .filters { padding: 14px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .filter-label { font-size: 0.82rem; font-weight: 500; color: var(--muted); margin-right: 4px; }
        .filter-pill { padding: 6px 14px; border-radius: 100px; font-size: 0.8rem; font-weight: 600; cursor: pointer; border: 1.5px solid var(--border); background: var(--white); color: var(--muted); transition: all 0.15s; font-family: var(--font); }
        .filter-pill:hover { border-color: var(--accent); color: var(--accent); }
        .filter-pill.active { background: var(--accent); color: white; border-color: var(--accent); }
        .filter-divider { width: 1px; height: 20px; background: var(--border); margin: 0 4px; }
        .filter-status-pill { padding: 5px 13px; border-radius: 100px; font-size: 0.8rem; font-weight: 600; cursor: pointer; border: 1.5px solid var(--border); background: var(--white); color: var(--muted); transition: all 0.15s; font-family: var(--font); display: flex; align-items: center; gap: 5px; }
        .filter-status-pill:hover { border-color: var(--accent); color: var(--accent); }
        .filter-status-pill.active { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
        .filter-dot { width: 7px; height: 7px; border-radius: 50%; }
        .filter-dot.green { background: #16a34a; }
        .filter-dot.red { background: #ef4444; }
        .filter-entries { margin-left: auto; display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--muted); }
        .entries-select { padding: 4px 8px; border: 1.5px solid var(--border); border-radius: 7px; font-size: 0.82rem; font-family: var(--font); outline: none; background: var(--white); cursor: pointer; }
        .entries-select:focus { border-color: var(--accent); }

        /* ── TABLE ── */
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { padding: 12px 20px; text-align: left; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--border); white-space: nowrap; }
        td { padding: 16px 20px; font-size: 0.875rem; border-bottom: 1px solid #f3f4f6; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #fafbfc; }

        .store-cell { display: flex; align-items: center; gap: 12px; }
        .store-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .store-name { font-size: 0.915rem; font-weight: 600; margin-bottom: 2px; }
        .store-email { font-size: 0.76rem; color: var(--muted); }

        .plan-badge { display: inline-block; padding: 4px 11px; border-radius: 6px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; border: 1.5px solid; }

        .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; border-radius: 100px; font-size: 0.78rem; font-weight: 600; }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; }

        .rev-value { font-size: 0.915rem; font-weight: 700; }
        .rev-change { font-size: 0.76rem; font-weight: 600; margin-top: 2px; }
        .rev-up { color: #16a34a; }
        .rev-down { color: #dc2626; }
        .rev-flat { color: var(--muted); }

        /* Action menu */
        .action-cell { position: relative; }
        .action-btn { width: 30px; height: 30px; border-radius: 7px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .action-btn:hover { border-color: var(--accent); background: var(--accent-light); }
        .action-menu { position: absolute; right: 0; top: 36px; background: var(--white); border: 1.5px solid var(--border); border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); z-index: 20; min-width: 160px; overflow: hidden; }
        .action-menu-item { display: block; width: 100%; padding: 10px 16px; font-size: 0.84rem; font-weight: 500; color: var(--text); background: none; border: none; cursor: pointer; text-align: left; font-family: var(--font); transition: background 0.12s; }
        .action-menu-item:hover { background: #f4f6f9; }
        .action-menu-item.danger { color: #dc2626; }
        .action-menu-item.danger:hover { background: #fef2f2; }

        /* ── PAGINATION ── */
        .pagination-row { padding: 14px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .pagination-info { font-size: 0.82rem; color: var(--muted); }
        .pagination-info strong { color: var(--text); }
        .pagination-btns { display: flex; gap: 4px; }
        .page-btn { width: 34px; height: 34px; border-radius: 8px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; font-size: 0.82rem; font-weight: 600; display: flex; align-items: center; justify-content: center; transition: all 0.15s; color: var(--text); font-family: var(--font); }
        .page-btn:hover { border-color: var(--accent); color: var(--accent); }
        .page-btn.active { background: var(--accent); color: white; border-color: var(--accent); }
        .page-btn.dots { border: none; background: none; cursor: default; color: var(--muted); }
        .page-btn:disabled { opacity: 0.4; cursor: default; }

        /* ── MODAL ── */
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
        .modal { background: var(--white); border-radius: 16px; padding: 28px; width: 460px; box-shadow: 0 20px 60px rgba(0,0,0,0.16); }
        .modal-title { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 4px; }
        .modal-subtitle { font-size: 0.84rem; color: var(--muted); margin-bottom: 22px; }
        .form-field { margin-bottom: 14px; }
        .form-label { display: block; font-size: 0.78rem; font-weight: 600; color: #374151; margin-bottom: 5px; }
        .form-input, .form-select { width: 100%; padding: 10px 13px; border-radius: 9px; border: 1.5px solid var(--border); font-size: 0.875rem; font-family: var(--font); outline: none; transition: border-color 0.18s; background: #fafafa; }
        .form-input:focus, .form-select:focus { border-color: var(--accent); background: var(--white); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
        .btn-cancel { background: var(--white); border: 1.5px solid var(--border); color: var(--text); padding: 9px 18px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); }
        .btn-cancel:hover { border-color: #9ca3af; }
        .btn-confirm { background: var(--accent); color: white; border: none; padding: 9px 20px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); box-shadow: 0 3px 8px rgba(37,99,235,0.3); }
        .btn-confirm:hover { background: #1d4ed8; }

        /* ── TOAST ── */
        .toast { position: fixed; bottom: 24px; right: 24px; z-index: 200; background: #111827; color: #fff; padding: 11px 18px; border-radius: 9px; font-size: 0.875rem; font-weight: 500; box-shadow: 0 8px 24px rgba(0,0,0,0.18); display: flex; align-items: center; gap: 8px; animation: slideUp 0.22s ease; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        /* ── FOOTER ── */
        .footer { padding: 20px 32px; border-top: 1px solid var(--border); background: var(--white); display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
        .footer-copy { font-size: 0.8rem; color: var(--muted); }
        .footer-links { display: flex; gap: 20px; }
        .footer-link { font-size: 0.8rem; color: var(--muted); text-decoration: none; transition: color 0.15s; }
        .footer-link:hover { color: var(--text); }

        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: 1fr; }
          .tb-nav { display: none; }
        }
      `}</style>

      {/* ── TOPBAR ── */}
      <header className="topbar">
        <a href="#" className="tb-brand">
          <svg className="tb-brand-icon" viewBox="0 0 34 34" fill="none">
            <rect width="34" height="34" rx="8" fill="#1e40af"/>
            <path d="M9 17L17 9L25 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 14v8a1 1 0 001 1h3v-4h2v4h3a1 1 0 001-1v-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="tb-brand-name">SuperAdmin</span>
        </a>
        <nav className="tb-nav">
          {["Dashboard", "Stores", "Users", "Analytics", "Settings"].map(item => (
            <button key={item} className={`tb-link ${item === "Stores" ? "active" : ""}`}>{item}</button>
          ))}
        </nav>
        <div style={{ flex: 1 }} />
        <div className="tb-search">
          <span style={{ fontSize: 13, color: "#bbb" }}>🔍</span>
          <input placeholder="Global search..." />
        </div>
        <button className="tb-notif-btn">🔔<span className="tb-notif-dot" /></button>
        <div className="tb-user">
          <div className="tb-avatar">
            <img src="https://api.dicebear.com/7.x/personas/svg?seed=alex&backgroundColor=b6e3f4" alt="Alex" />
          </div>
          <div>
            <div className="tb-user-name">Alex Rivera</div>
            <div className="tb-user-role">Platform Owner</div>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <div className="main">

        {/* Page Header */}
        <div className="page-header">
          <div>
            <div className="page-title">Store Management</div>
            <div className="page-desc">Detailed overview and control of all active merchant instances.</div>
          </div>
          <div className="header-actions">
            <button className="btn-export" onClick={() => showToast("CSV export started…")}>⬇ Export CSV</button>
            <button className="btn-provision" onClick={() => setShowProvisionModal(true)}>＋ Provision New Store</button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: "#eff6ff" }}>🏪</div>
            <div>
              <div className="stat-label">Total Stores</div>
              <div className="stat-value">1,240</div>
              <div className="stat-sub green">↗ +4.2% from last month</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: "#f0fdf4" }}>
              <span style={{ fontSize: 24 }}>✅</span>
            </div>
            <div>
              <div className="stat-label">Active Stores</div>
              <div className="stat-value">1,185</div>
              <div className="stat-sub blue">● 95.5% Uptime</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: "#fffbeb" }}>📋</div>
            <div>
              <div className="stat-label">Pending Approvals</div>
              <div className="stat-value">12</div>
              <div className="stat-sub amber">! High priority review</div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="table-card" onClick={() => setShowActionMenu(null)}>

          {/* Filters */}
          <div className="filters">
            <span className="filter-label">Filter By:</span>
            {filterTabs.map(tab => (
              <button key={tab} className={`filter-pill ${activePlan === tab ? "active" : ""}`} onClick={() => setActivePlan(tab)}>
                {tab}
              </button>
            ))}
            <div className="filter-divider" />
            {statusFilters.map(sf => (
              <button
                key={sf}
                className={`filter-status-pill ${activeStatus === sf ? "active" : ""}`}
                onClick={() => setActiveStatus(activeStatus === sf ? null : sf)}
              >
                <span className={`filter-dot ${sf === "Active" ? "green" : "red"}`} />
                {sf}
              </button>
            ))}
            <div className="filter-entries">
              Show
              <select className="entries-select" value={entries} onChange={e => setEntries(Number(e.target.value))}>
                <option>5</option><option>10</option><option>25</option><option>50</option>
              </select>
              entries
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Store Identity</th>
                  <th>Subscription</th>
                  <th>Launch Date</th>
                  <th>Status</th>
                  <th>Monthly Revenue</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(store => {
                  const p = planStyles[store.plan];
                  const s = statusStyles[store.status];
                  return (
                    <tr key={store.id}>
                      <td>
                        <div className="store-cell">
                          <div className="store-icon" style={{ background: store.iconBg }}>{store.icon}</div>
                          <div>
                            <div className="store-name">{store.name}</div>
                            <div className="store-email">{store.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="plan-badge" style={{ background: p.bg, color: p.color, borderColor: p.border }}>
                          {store.plan.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ color: "var(--muted)", fontSize: "0.855rem" }}>{store.launched}</td>
                      <td>
                        <span className="status-badge" style={{ background: s.bg, color: s.color }}>
                          <span className="status-dot" style={{ background: s.dot }} />
                          {s.label}
                        </span>
                      </td>
                      <td>
                        <div className="rev-value">{store.revenue}</div>
                        <div className={`rev-change ${store.revUp === true ? "rev-up" : store.revUp === false ? "rev-down" : "rev-flat"}`}>
                          {store.revChange}
                        </div>
                      </td>
                      <td className="action-cell" onClick={e => e.stopPropagation()}>
                        <button className="action-btn" onClick={() => setShowActionMenu(showActionMenu === store.id ? null : store.id)}>⋯</button>
                        {showActionMenu === store.id && (
                          <div className="action-menu">
                            <button className="action-menu-item" onClick={() => { showToast(`Viewing ${store.name}`); setShowActionMenu(null); }}>👁 View Details</button>
                            <button className="action-menu-item" onClick={() => { showToast(`Editing ${store.name}`); setShowActionMenu(null); }}>✏️ Edit Store</button>
                            <button className="action-menu-item" onClick={() => { showToast(`Impersonating ${store.name}`); setShowActionMenu(null); }}>🔑 Impersonate</button>
                            <button className="action-menu-item danger" onClick={() => { showToast(`${store.name} suspended`); setShowActionMenu(null); }}>⛔ Suspend Store</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-row">
            <div className="pagination-info">
              Showing <strong>1</strong> to <strong>{Math.min(entries, filtered.length)}</strong> of <strong>1,240</strong> results
            </div>
            <div className="pagination-btns">
              <button className="page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
              {[1, 2, 3, "...", 124].map((p, i) => (
                <button
                  key={i}
                  className={`page-btn ${p === "..." ? "dots" : currentPage === p ? "active" : ""}`}
                  onClick={() => typeof p === "number" && setCurrentPage(p)}
                >{p}</button>
              ))}
              <button className="page-btn" onClick={() => setCurrentPage(p => Math.min(124, p + 1))} disabled={currentPage === 124}>›</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-copy">© 2024 SuperAdmin Platform Inc. All rights reserved.</span>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Support Center</a>
        </div>
      </footer>

      {/* ── PROVISION MODAL ── */}
      {showProvisionModal && (
        <div className="overlay" onClick={() => setShowProvisionModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Provision New Store</div>
            <div className="modal-subtitle">Create a new merchant instance on the platform.</div>
            <div className="form-field">
              <label className="form-label">Store Name *</label>
              <input className="form-input" placeholder="e.g. Nexus Electronics" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="form-field">
              <label className="form-label">Owner Email *</label>
              <input className="form-input" type="email" placeholder="owner@store.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="form-field">
              <label className="form-label">Subscription Plan</label>
              <select className="form-select" value={form.plan} onChange={e => setForm(p => ({ ...p, plan: e.target.value }))}>
                <option>Basic</option><option>Pro</option><option>Enterprise</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowProvisionModal(false)}>Cancel</button>
              <button className="btn-confirm" onClick={() => { if (form.name && form.email) { showToast(`Store "${form.name}" provisioned!`); setShowProvisionModal(false); setForm({ name: "", email: "", plan: "Pro" }); } }}>
                Provision Store
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toastMsg && <div className="toast">✅ {toastMsg}</div>}
    </div>
  );
}
