import { useState } from "react";

const admins = [
  { id: 1, name: "Elena Moreau", email: "elena@luxestore.com", role: "Store Admin", store: "LuxeStore NY", status: "active", joined: "Jan 12, 2024", avatar: "EM" },
  { id: 2, name: "James Okafor", email: "james@luxestore.com", role: "Catalog Admin", store: "LuxeStore LA", status: "active", joined: "Feb 3, 2024", avatar: "JO" },
  { id: 3, name: "Priya Nair", email: "priya@luxestore.com", role: "Finance Admin", store: "LuxeStore UK", status: "suspended", joined: "Mar 18, 2024", avatar: "PN" },
  { id: 4, name: "Marcus Liu", email: "marcus@luxestore.com", role: "Store Admin", store: "LuxeStore AU", status: "active", joined: "Apr 5, 2024", avatar: "ML" },
  { id: 5, name: "Sofia Reyes", email: "sofia@luxestore.com", role: "Support Admin", store: "LuxeStore EU", status: "inactive", joined: "May 22, 2024", avatar: "SR" },
];

const systemReports = [
  { label: "Total Revenue", value: "$2.84M", change: "+18.4%", up: true, icon: "💰" },
  { label: "Active Users", value: "142,390", change: "+9.2%", up: true, icon: "👥" },
  { label: "Orders Today", value: "3,847", change: "+5.1%", up: true, icon: "📦" },
  { label: "System Uptime", value: "99.98%", change: "-0.01%", up: false, icon: "🖥️" },
];

const activityLog = [
  { action: "Admin created", user: "Elena Moreau", time: "2 min ago", type: "create" },
  { action: "Settings updated", user: "Super Admin", time: "14 min ago", type: "settings" },
  { action: "Admin suspended", user: "Priya Nair", time: "1 hr ago", type: "warning" },
  { action: "System backup completed", user: "System", time: "3 hrs ago", type: "system" },
  { action: "New store region added", user: "Super Admin", time: "Yesterday", type: "create" },
  { action: "Permission policy updated", user: "Super Admin", time: "2 days ago", type: "settings" },
];

const navItems = [
  { id: "overview", icon: "⊞", label: "Overview" },
  { id: "admins", icon: "👤", label: "Manage Admins" },
  { id: "settings", icon: "⚙️", label: "Platform Settings" },
  { id: "reports", icon: "📊", label: "System Reports" },
];

const avatarColors = { EM: "#2563eb", JO: "#0891b2", PN: "#7c3aed", ML: "#059669", SR: "#d97706" };

export default function SuperAdminDashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const [adminList, setAdminList] = useState(admins);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "Store Admin", store: "" });
  const [settings, setSettings] = useState({
    maintenanceMode: false, newRegistrations: true, twoFactorRequired: true,
    emailNotifications: true, autoBackup: true, darkMode: false,
    sessionTimeout: "30", maxAdmins: "20",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleStatus = (id) => {
    setAdminList(prev => prev.map(a => a.id === id ? { ...a, status: a.status === "active" ? "suspended" : "active" } : a));
    showToast("Admin status updated");
  };

  const deleteAdmin = (id) => {
    setAdminList(prev => prev.filter(a => a.id !== id));
    showToast("Admin removed", "warning");
  };

  const addAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) return;
    const initials = newAdmin.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    setAdminList(prev => [...prev, {
      id: Date.now(), ...newAdmin, status: "active",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      avatar: initials,
    }]);
    setNewAdmin({ name: "", email: "", role: "Store Admin", store: "" });
    setShowAddModal(false);
    showToast("New admin added successfully");
  };

  const filteredAdmins = adminList.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f7f8fa;
          --sidebar: #0d1117;
          --sidebar-hover: #161b22;
          --accent: #2563eb;
          --accent-light: #eff6ff;
          --accent-hover: #1d4ed8;
          --white: #ffffff;
          --border: #e5e7eb;
          --text: #111827;
          --muted: #6b7280;
          --danger: #ef4444;
          --success: #10b981;
          --warning: #f59e0b;
          --card-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
          --font: 'Inter', sans-serif;
        }

        .app { display: flex; height: 100vh; font-family: var(--font); background: var(--bg); color: var(--text); overflow: hidden; }

        /* SIDEBAR */
        .sidebar { width: 240px; flex-shrink: 0; background: var(--sidebar); display: flex; flex-direction: column; position: relative; overflow: hidden; }
        .sidebar::before { content: ''; position: absolute; top: -80px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%); pointer-events: none; }
        .sb-logo { padding: 22px 20px 18px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 10px; }
        .sb-logo-icon { width: 34px; height: 34px; border-radius: 8px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 12px rgba(37,99,235,0.4); }
        .sb-logo-name { font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
        .sb-logo-sub { font-size: 0.62rem; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 1px; }
        .sb-section-label { padding: 18px 20px 6px; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.22); }
        .sb-nav { flex: 1; padding: 4px 10px; overflow-y: auto; }
        .sb-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px; cursor: pointer; transition: all 0.18s; color: rgba(255,255,255,0.5); font-size: 0.875rem; font-weight: 500; margin-bottom: 2px; border: none; background: none; width: 100%; text-align: left; font-family: var(--font); }
        .sb-item:hover { background: var(--sidebar-hover); color: rgba(255,255,255,0.82); }
        .sb-item.active { background: var(--accent); color: #fff; box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
        .sb-item-icon { font-size: 14px; width: 20px; text-align: center; flex-shrink: 0; }
        .sb-footer { padding: 14px 18px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 10px; }
        .sb-avatar { width: 32px; height: 32px; border-radius: 8px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; color: #fff; flex-shrink: 0; }
        .sb-user-name { font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.82); }
        .sb-user-role { font-size: 0.68rem; color: rgba(255,255,255,0.3); }
        .sb-badge { margin-left: auto; background: rgba(37,99,235,0.25); border: 1px solid rgba(37,99,235,0.45); color: #93c5fd; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.05em; padding: 2px 7px; border-radius: 100px; text-transform: uppercase; }

        /* MAIN */
        .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .topbar { background: var(--white); border-bottom: 1px solid var(--border); padding: 0 28px; height: 58px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
        .topbar-title { font-size: 1rem; font-weight: 700; color: var(--text); }
        .topbar-subtitle { font-size: 0.75rem; color: var(--muted); margin-top: 1px; }
        .topbar-right { display: flex; align-items: center; gap: 8px; }
        .topbar-btn { width: 34px; height: 34px; border-radius: 8px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all 0.18s; position: relative; }
        .topbar-btn:hover { border-color: var(--accent); background: var(--accent-light); }
        .topbar-notif { position: absolute; top: 4px; right: 4px; width: 6px; height: 6px; background: var(--danger); border-radius: 50%; border: 1.5px solid white; }
        .content { flex: 1; overflow-y: auto; padding: 24px 28px; }

        /* STAT CARDS */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 22px; }
        .stat-card { background: var(--white); border-radius: 12px; padding: 18px 20px; border: 1.5px solid var(--border); box-shadow: var(--card-shadow); transition: all 0.2s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.09); }
        .stat-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
        .stat-icon { font-size: 1.4rem; }
        .stat-change { font-size: 0.72rem; font-weight: 600; padding: 3px 8px; border-radius: 100px; }
        .stat-change.up { background: #f0fdf4; color: var(--success); }
        .stat-change.down { background: #fef2f2; color: var(--danger); }
        .stat-value { font-size: 1.6rem; font-weight: 800; line-height: 1; margin-bottom: 4px; }
        .stat-label { font-size: 0.78rem; color: var(--muted); font-weight: 400; }

        /* CARDS */
        .card { background: var(--white); border-radius: 14px; border: 1.5px solid var(--border); box-shadow: var(--card-shadow); overflow: hidden; }
        .card-header { padding: 16px 22px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .card-title { font-size: 0.925rem; font-weight: 700; }
        .card-subtitle { font-size: 0.76rem; color: var(--muted); margin-top: 1px; }

        /* OVERVIEW GRID */
        .overview-grid { display: grid; grid-template-columns: 1fr 320px; gap: 18px; }

        /* TABLE */
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { padding: 10px 16px; text-align: left; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--border); white-space: nowrap; }
        td { padding: 12px 16px; font-size: 0.855rem; border-bottom: 1px solid #f3f4f6; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #fafafa; }
        .td-name { display: flex; align-items: center; gap: 10px; }
        .td-avatar { width: 30px; height: 30px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 0.68rem; font-weight: 700; color: #fff; flex-shrink: 0; }
        .td-fullname { font-weight: 600; font-size: 0.855rem; }
        .td-email { font-size: 0.75rem; color: var(--muted); }
        .status-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 100px; font-size: 0.72rem; font-weight: 600; }
        .status-active { background: #f0fdf4; color: var(--success); }
        .status-suspended { background: #fef2f2; color: var(--danger); }
        .status-inactive { background: #f9fafb; color: var(--muted); }
        .status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
        .action-btns { display: flex; gap: 6px; }
        .act-btn { padding: 5px 11px; border-radius: 6px; font-size: 0.72rem; font-weight: 600; cursor: pointer; border: 1.5px solid; transition: all 0.15s; font-family: var(--font); }
        .act-btn-toggle { border-color: var(--border); color: var(--muted); background: #fff; }
        .act-btn-toggle:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
        .act-btn-delete { border-color: #fee2e2; color: var(--danger); background: #fff; }
        .act-btn-delete:hover { background: #fef2f2; }
        .role-badge { display: inline-block; padding: 2px 8px; border-radius: 5px; font-size: 0.7rem; font-weight: 600; background: var(--accent-light); color: var(--accent); }

        /* ACTIVITY */
        .activity-list { padding: 6px 0; }
        .activity-item { display: flex; align-items: flex-start; gap: 11px; padding: 11px 20px; }
        .activity-item:not(:last-child) { border-bottom: 1px solid #f3f4f6; }
        .act-dot { width: 7px; height: 7px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
        .act-create { background: var(--success); }
        .act-settings { background: var(--accent); }
        .act-warning { background: var(--warning); }
        .act-system { background: var(--muted); }
        .act-text { font-size: 0.82rem; font-weight: 500; }
        .act-meta { font-size: 0.72rem; color: var(--muted); margin-top: 1px; }

        /* SETTINGS */
        .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .settings-section { padding: 20px 22px; }
        .settings-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
        .setting-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
        .setting-row:last-child { border-bottom: none; }
        .setting-label { font-size: 0.855rem; font-weight: 500; }
        .setting-desc { font-size: 0.74rem; color: var(--muted); margin-top: 1px; }
        .toggle { position: relative; width: 38px; height: 21px; }
        .toggle input { opacity: 0; width: 0; height: 0; }
        .toggle-slider { position: absolute; inset: 0; background: #e5e7eb; border-radius: 100px; cursor: pointer; transition: 0.2s; }
        .toggle-slider::before { content: ''; position: absolute; width: 15px; height: 15px; border-radius: 50%; background: #fff; left: 3px; top: 3px; transition: 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
        .toggle input:checked + .toggle-slider { background: var(--accent); }
        .toggle input:checked + .toggle-slider::before { transform: translateX(17px); }
        .setting-input { width: 76px; padding: 6px 10px; border-radius: 7px; border: 1.5px solid var(--border); font-size: 0.82rem; font-family: var(--font); outline: none; text-align: center; transition: border-color 0.18s; }
        .setting-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }

        /* REPORTS */
        .reports-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .report-card-body { padding: 20px 22px; }
        .bar-list { display: flex; flex-direction: column; gap: 13px; }
        .bar-item-label { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 500; margin-bottom: 5px; }
        .bar-track { height: 7px; background: #f3f4f6; border-radius: 100px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 100px; background: var(--accent); transition: width 0.6s ease; }
        .bar-fill.green { background: var(--success); }
        .bar-fill.amber { background: var(--warning); }
        .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .metric-item { background: #f9fafb; border-radius: 9px; padding: 13px; border: 1px solid var(--border); }
        .metric-val { font-size: 1.25rem; font-weight: 800; }
        .metric-lbl { font-size: 0.72rem; color: var(--muted); margin-top: 2px; }

        /* BUTTONS */
        .btn-primary { background: var(--accent); color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-size: 0.855rem; font-weight: 600; cursor: pointer; transition: all 0.18s; font-family: var(--font); display: inline-flex; align-items: center; gap: 5px; }
        .btn-primary:hover { background: var(--accent-hover); box-shadow: 0 4px 12px rgba(37,99,235,0.3); transform: translateY(-1px); }
        .btn-outline { background: #fff; color: var(--text); border: 1.5px solid var(--border); padding: 8px 16px; border-radius: 8px; font-size: 0.855rem; font-weight: 600; cursor: pointer; transition: all 0.18s; font-family: var(--font); }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

        /* SEARCH */
        .search-wrap { display: flex; align-items: center; gap: 8px; background: #f9fafb; border: 1.5px solid var(--border); border-radius: 8px; padding: 7px 12px; transition: all 0.18s; }
        .search-wrap:focus-within { border-color: var(--accent); background: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .search-wrap input { border: none; background: none; outline: none; font-size: 0.855rem; font-family: var(--font); color: var(--text); width: 200px; }
        .search-wrap input::placeholder { color: #bbb; }

        /* MODAL */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
        .modal { background: #fff; border-radius: 16px; padding: 28px; width: 450px; box-shadow: 0 20px 60px rgba(0,0,0,0.16); }
        .modal-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
        .modal-subtitle { font-size: 0.82rem; color: var(--muted); margin-bottom: 20px; }
        .form-field { margin-bottom: 14px; }
        .form-label { display: block; font-size: 0.78rem; font-weight: 600; color: #374151; margin-bottom: 5px; }
        .form-input { width: 100%; padding: 9px 12px; border-radius: 8px; border: 1.5px solid var(--border); font-size: 0.855rem; font-family: var(--font); outline: none; transition: border-color 0.18s; background: #fafafa; }
        .form-input:focus { border-color: var(--accent); background: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }

        /* TOAST */
        .toast { position: fixed; bottom: 24px; right: 24px; z-index: 200; background: #111827; color: #fff; padding: 11px 18px; border-radius: 9px; font-size: 0.855rem; font-weight: 500; box-shadow: 0 8px 24px rgba(0,0,0,0.18); display: flex; align-items: center; gap: 8px; animation: slideUp 0.22s ease; }
        .toast.warning { background: var(--warning); color: #fff; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        .section-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
        .page-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 4px; letter-spacing: -0.02em; }
        .page-subtitle { font-size: 0.875rem; color: var(--muted); margin-bottom: 20px; font-weight: 400; }

        @media (max-width: 1100px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .overview-grid, .settings-grid, .reports-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sb-logo">
          <div className="sb-logo-icon">🛍</div>
          <div>
            <div className="sb-logo-name">LuxeStore</div>
            <div className="sb-logo-sub">Super Admin</div>
          </div>
        </div>
        <div className="sb-section-label">Navigation</div>
        <nav className="sb-nav">
          {navItems.map(item => (
            <button key={item.id} className={`sb-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
              <span className="sb-item-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sb-footer">
          <div className="sb-avatar">SA</div>
          <div>
            <div className="sb-user-name">Super Admin</div>
            <div className="sb-user-role">root access</div>
          </div>
          <div className="sb-badge">Root</div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">
        <div className="topbar">
          <div>
            <div className="topbar-title">
              {activeNav === "overview" && "Dashboard Overview"}
              {activeNav === "admins" && "Manage Admins"}
              {activeNav === "settings" && "Platform Settings"}
              {activeNav === "reports" && "System Reports"}
            </div>
            <div className="topbar-subtitle">LuxeStore Control Panel · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
          </div>
          <div className="topbar-right">
            <button className="topbar-btn">🔔<span className="topbar-notif" /></button>
            <button className="topbar-btn">⚙️</button>
            <button className="topbar-btn">👤</button>
          </div>
        </div>

        <div className="content">

          {/* OVERVIEW */}
          {activeNav === "overview" && (
            <>
              <div className="section-tag">Super Admin</div>
              <div className="page-title">Platform Overview</div>
              <div className="page-subtitle">Real-time snapshot of LuxeStore's performance and activity.</div>
              <div className="stats-grid">
                {systemReports.map(r => (
                  <div className="stat-card" key={r.label}>
                    <div className="stat-top">
                      <div className="stat-icon">{r.icon}</div>
                      <div className={`stat-change ${r.up ? "up" : "down"}`}>{r.change}</div>
                    </div>
                    <div className="stat-value">{r.value}</div>
                    <div className="stat-label">{r.label}</div>
                  </div>
                ))}
              </div>
              <div className="overview-grid">
                <div className="card">
                  <div className="card-header">
                    <div><div className="card-title">Admin Accounts</div><div className="card-subtitle">{adminList.length} total administrators</div></div>
                    <button className="btn-primary" onClick={() => setActiveNav("admins")}>View All →</button>
                  </div>
                  <div className="table-wrap">
                    <table>
                      <thead><tr><th>Admin</th><th>Role</th><th>Status</th></tr></thead>
                      <tbody>
                        {adminList.slice(0, 4).map(a => (
                          <tr key={a.id}>
                            <td><div className="td-name"><div className="td-avatar" style={{ background: avatarColors[a.avatar] || "#2563eb" }}>{a.avatar}</div><div><div className="td-fullname">{a.name}</div><div className="td-email">{a.email}</div></div></div></td>
                            <td><span className="role-badge">{a.role}</span></td>
                            <td><span className={`status-badge status-${a.status}`}><span className="status-dot" />{a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header"><div><div className="card-title">Activity Log</div><div className="card-subtitle">Recent system events</div></div></div>
                  <div className="activity-list">
                    {activityLog.map((a, i) => (
                      <div className="activity-item" key={i}>
                        <div className={`act-dot act-${a.type}`} />
                        <div><div className="act-text">{a.action}</div><div className="act-meta">{a.user} · {a.time}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* MANAGE ADMINS */}
          {activeNav === "admins" && (
            <>
              <div className="section-tag">Access Control</div>
              <div className="page-title">Manage Admins</div>
              <div className="page-subtitle">Add, edit, suspend or remove platform administrators.</div>
              <div className="card">
                <div className="card-header">
                  <div className="search-wrap">
                    <span style={{ fontSize: 13, color: "#bbb" }}>🔍</span>
                    <input placeholder="Search by name or email…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                  </div>
                  <button className="btn-primary" onClick={() => setShowAddModal(true)}>＋ Add Admin</button>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Admin</th><th>Role</th><th>Store</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {filteredAdmins.map(a => (
                        <tr key={a.id}>
                          <td><div className="td-name"><div className="td-avatar" style={{ background: avatarColors[a.avatar] || "#2563eb" }}>{a.avatar}</div><div><div className="td-fullname">{a.name}</div><div className="td-email">{a.email}</div></div></div></td>
                          <td><span className="role-badge">{a.role}</span></td>
                          <td style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{a.store}</td>
                          <td style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{a.joined}</td>
                          <td><span className={`status-badge status-${a.status}`}><span className="status-dot" />{a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span></td>
                          <td><div className="action-btns"><button className="act-btn act-btn-toggle" onClick={() => toggleStatus(a.id)}>{a.status === "active" ? "Suspend" : "Activate"}</button><button className="act-btn act-btn-delete" onClick={() => deleteAdmin(a.id)}>Remove</button></div></td>
                        </tr>
                      ))}
                      {filteredAdmins.length === 0 && <tr><td colSpan={6} style={{ textAlign: "center", padding: "28px", color: "var(--muted)", fontSize: "0.855rem" }}>No admins found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* PLATFORM SETTINGS */}
          {activeNav === "settings" && (
            <>
              <div className="section-tag">Configuration</div>
              <div className="page-title">Platform Settings</div>
              <div className="page-subtitle">Control global platform behavior and security policies.</div>
              <div className="settings-grid">
                <div className="card">
                  <div className="card-header"><div><div className="card-title">Security & Access</div><div className="card-subtitle">Authentication and session policies</div></div></div>
                  <div className="settings-section">
                    <div className="settings-title">Controls</div>
                    {[
                      { key: "twoFactorRequired", label: "Require 2FA", desc: "Enforce two-factor auth for all admins" },
                      { key: "newRegistrations", label: "Allow Registrations", desc: "Enable new store admin sign-ups" },
                      { key: "maintenanceMode", label: "Maintenance Mode", desc: "Temporarily disable the public storefront" },
                    ].map(s => (
                      <div className="setting-row" key={s.key}>
                        <div><div className="setting-label">{s.label}</div><div className="setting-desc">{s.desc}</div></div>
                        <label className="toggle">
                          <input type="checkbox" checked={settings[s.key]} onChange={() => { setSettings(p => ({ ...p, [s.key]: !p[s.key] })); showToast("Setting saved"); }} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    ))}
                    <div className="setting-row">
                      <div><div className="setting-label">Session Timeout (min)</div><div className="setting-desc">Auto-logout after inactivity</div></div>
                      <input className="setting-input" type="number" value={settings.sessionTimeout} onChange={e => setSettings(p => ({ ...p, sessionTimeout: e.target.value }))} />
                    </div>
                    <div className="setting-row">
                      <div><div className="setting-label">Max Admins</div><div className="setting-desc">Platform-wide admin limit</div></div>
                      <input className="setting-input" type="number" value={settings.maxAdmins} onChange={e => setSettings(p => ({ ...p, maxAdmins: e.target.value }))} />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header"><div><div className="card-title">System & Notifications</div><div className="card-subtitle">Platform automation and alerts</div></div></div>
                  <div className="settings-section">
                    <div className="settings-title">Automation</div>
                    {[
                      { key: "emailNotifications", label: "Email Notifications", desc: "Send system alerts via email" },
                      { key: "autoBackup", label: "Auto Backup", desc: "Daily automated data backups" },
                      { key: "darkMode", label: "Dark Mode Default", desc: "Apply dark theme for all admin sessions" },
                    ].map(s => (
                      <div className="setting-row" key={s.key}>
                        <div><div className="setting-label">{s.label}</div><div className="setting-desc">{s.desc}</div></div>
                        <label className="toggle">
                          <input type="checkbox" checked={settings[s.key]} onChange={() => { setSettings(p => ({ ...p, [s.key]: !p[s.key] })); showToast("Setting saved"); }} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "0 22px 22px", display: "flex", gap: 10 }}>
                    <button className="btn-primary" onClick={() => showToast("Settings saved successfully")}>Save Changes</button>
                    <button className="btn-outline" onClick={() => showToast("Settings reset", "warning")}>Reset Defaults</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SYSTEM REPORTS */}
          {activeNav === "reports" && (
            <>
              <div className="section-tag">Analytics</div>
              <div className="page-title">System Reports</div>
              <div className="page-subtitle">Platform-wide metrics, performance indicators and store analytics.</div>
              <div className="stats-grid" style={{ marginBottom: 20 }}>
                {systemReports.map(r => (
                  <div className="stat-card" key={r.label}>
                    <div className="stat-top"><div className="stat-icon">{r.icon}</div><div className={`stat-change ${r.up ? "up" : "down"}`}>{r.change}</div></div>
                    <div className="stat-value">{r.value}</div>
                    <div className="stat-label">{r.label}</div>
                  </div>
                ))}
              </div>
              <div className="reports-grid">
                <div className="card">
                  <div className="card-header"><div><div className="card-title">Sales by Region</div><div className="card-subtitle">Top performing store regions</div></div></div>
                  <div className="report-card-body">
                    <div className="bar-list">
                      {[{ region: "New York", pct: 84, val: "$842K" }, { region: "Los Angeles", pct: 61, val: "$613K" }, { region: "United Kingdom", pct: 47, val: "$478K" }, { region: "Australia", pct: 32, val: "$318K" }, { region: "Europe (Other)", pct: 58, val: "$589K" }].map(r => (
                        <div key={r.region}>
                          <div className="bar-item-label"><span>{r.region}</span><span style={{ color: "var(--muted)" }}>{r.val}</span></div>
                          <div className="bar-track"><div className="bar-fill" style={{ width: `${r.pct}%` }} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header"><div><div className="card-title">Category Performance</div><div className="card-subtitle">Sales split by product category</div></div></div>
                  <div className="report-card-body">
                    <div className="bar-list">
                      {[{ cat: "Women's Fashion", pct: 89 }, { cat: "Men's Fashion", pct: 72 }, { cat: "Footwear", pct: 55, color: "green" }, { cat: "Accessories", pct: 41, color: "amber" }, { cat: "Sale Items", pct: 33, color: "amber" }].map(r => (
                        <div key={r.cat}>
                          <div className="bar-item-label"><span>{r.cat}</span><span style={{ color: "var(--muted)" }}>{r.pct}%</span></div>
                          <div className="bar-track"><div className={`bar-fill ${r.color || ""}`} style={{ width: `${r.pct}%` }} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header"><div><div className="card-title">System Health</div><div className="card-subtitle">Infrastructure performance metrics</div></div></div>
                  <div className="report-card-body">
                    <div className="metric-grid">
                      {[{ val: "99.98%", lbl: "Uptime (30d)" }, { val: "142ms", lbl: "Avg Response" }, { val: "3.2M", lbl: "API Calls/day" }, { val: "0", lbl: "Critical Errors" }, { val: "2.4TB", lbl: "Storage Used" }, { val: "Daily", lbl: "Last Backup" }].map(m => (
                        <div className="metric-item" key={m.lbl}><div className="metric-val">{m.val}</div><div className="metric-lbl">{m.lbl}</div></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header"><div><div className="card-title">Admin Activity</div><div className="card-subtitle">Actions per admin this month</div></div></div>
                  <div className="report-card-body">
                    <div className="bar-list">
                      {adminList.slice(0, 5).map((a, i) => {
                        const pct = [84, 67, 23, 91, 45][i];
                        return (
                          <div key={a.id}>
                            <div className="bar-item-label"><span>{a.name}</span><span style={{ color: "var(--muted)" }}>{pct} actions</span></div>
                            <div className="bar-track"><div className="bar-fill green" style={{ width: `${pct}%` }} /></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      {/* ADD ADMIN MODAL */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Add New Admin</div>
            <div className="modal-subtitle">Grant admin access to a new platform user.</div>
            <div className="form-row-2">
              <div className="form-field"><label className="form-label">Full Name *</label><input className="form-input" placeholder="Jane Doe" value={newAdmin.name} onChange={e => setNewAdmin(p => ({ ...p, name: e.target.value }))} /></div>
              <div className="form-field"><label className="form-label">Email Address *</label><input className="form-input" placeholder="jane@luxestore.com" value={newAdmin.email} onChange={e => setNewAdmin(p => ({ ...p, email: e.target.value }))} /></div>
            </div>
            <div className="form-row-2">
              <div className="form-field"><label className="form-label">Role</label><select className="form-input" value={newAdmin.role} onChange={e => setNewAdmin(p => ({ ...p, role: e.target.value }))}><option>Store Admin</option><option>Catalog Admin</option><option>Finance Admin</option><option>Support Admin</option></select></div>
              <div className="form-field"><label className="form-label">Assigned Store</label><input className="form-input" placeholder="LuxeStore NY" value={newAdmin.store} onChange={e => setNewAdmin(p => ({ ...p, store: e.target.value }))} /></div>
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={addAdmin}>＋ Add Admin</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className={`toast ${toast.type === "warning" ? "warning" : ""}`}>{toast.type === "warning" ? "⚠️" : "✅"} {toast.msg}</div>}
    </div>
  );
}