import { useState } from "react";

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #0a0b0f;
    --surface: #111318;
    --surface2: #181c24;
    --border: #1e2330;
    --accent: #e8ff47;
    --accent2: #4fffb0;
    --accent3: #ff6b6b;
    --accent4: #7b9cff;
    --text: #f0f2ff;
    --muted: #5a6175;
    --muted2: #8892a4;
  }

  .dash-root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    overflow: hidden;
  }

  /* SIDEBAR */
  .sidebar {
    width: 240px;
    min-height: 100vh;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
  }

  .sidebar::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, var(--accent) 40%, var(--accent2) 70%, transparent);
    opacity: 0.3;
  }

  .logo-area {
    padding: 28px 24px 24px;
    border-bottom: 1px solid var(--border);
  }

  .logo-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    background: var(--accent);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 800;
    color: #0a0b0f;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  .logo-text {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: var(--text);
    letter-spacing: -0.3px;
  }

  .logo-sub {
    font-size: 9px;
    font-weight: 500;
    color: var(--accent);
    letter-spacing: 2px;
    text-transform: uppercase;
    display: block;
    margin-top: 1px;
  }

  .role-chip {
    margin: 16px 24px;
    background: linear-gradient(135deg, rgba(232,255,71,0.12), rgba(79,255,176,0.08));
    border: 1px solid rgba(232,255,71,0.2);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 11px;
    font-weight: 500;
    color: var(--accent);
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .role-dot {
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .nav-section {
    padding: 8px 12px;
    flex: 1;
  }

  .nav-label {
    font-size: 9px;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 12px 12px 6px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.18s ease;
    font-size: 13.5px;
    font-weight: 400;
    color: var(--muted2);
    position: relative;
    margin-bottom: 1px;
  }

  .nav-item:hover {
    background: var(--surface2);
    color: var(--text);
  }

  .nav-item.active {
    background: rgba(232,255,71,0.1);
    color: var(--accent);
    font-weight: 500;
  }

  .nav-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 25%;
    height: 50%;
    width: 3px;
    background: var(--accent);
    border-radius: 0 2px 2px 0;
  }

  .nav-icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 15px;
  }

  .nav-badge {
    margin-left: auto;
    background: var(--accent3);
    color: white;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 10px;
  }

  .sidebar-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--border);
  }

  .user-card {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-weight: 800;
    font-size: 13px;
    color: #0a0b0f;
    flex-shrink: 0;
  }

  .user-name { font-size: 13px; font-weight: 500; }
  .user-role { font-size: 11px; color: var(--muted2); }

  /* MAIN */
  .main {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  /* TOPBAR */
  .topbar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 5;
    backdrop-filter: blur(12px);
  }

  .page-title {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.4px;
  }

  .topbar-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: var(--surface2);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 15px;
    transition: all 0.15s;
    position: relative;
  }

  .icon-btn:hover { background: var(--border); }

  .notif-dot {
    position: absolute;
    top: 6px; right: 6px;
    width: 7px; height: 7px;
    background: var(--accent3);
    border-radius: 50%;
    border: 2px solid var(--surface);
  }

  .content {
    padding: 32px;
    flex: 1;
  }

  /* STATS GRID */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    border-color: rgba(232,255,71,0.2);
  }

  .stat-card::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 80px; height: 80px;
    border-radius: 50%;
    opacity: 0.05;
    transform: translate(30%, -30%);
  }

  .stat-card:nth-child(1)::after { background: var(--accent); }
  .stat-card:nth-child(2)::after { background: var(--accent2); }
  .stat-card:nth-child(3)::after { background: var(--accent4); }
  .stat-card:nth-child(4)::after { background: var(--accent3); }

  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .stat-icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .stat-trend {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 8px;
    border-radius: 20px;
  }

  .trend-up { background: rgba(79,255,176,0.12); color: var(--accent2); }
  .trend-down { background: rgba(255,107,107,0.12); color: var(--accent3); }

  .stat-value {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-weight: 800;
    font-size: 28px;
    letter-spacing: -1px;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 12px;
    color: var(--muted2);
    font-weight: 400;
  }

  /* PANELS ROW */
  .panels-row {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }

  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }

  .panel-head {
    padding: 18px 22px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel-title {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 14px;
  }

  .panel-action {
    font-size: 12px;
    color: var(--accent);
    cursor: pointer;
    font-weight: 500;
    border: none;
    background: none;
    padding: 0;
  }

  /* ADMINS TABLE */
  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 10px;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 12px 22px;
    border-bottom: 1px solid var(--border);
  }

  td {
    padding: 13px 22px;
    font-size: 13px;
    border-bottom: 1px solid rgba(30,35,48,0.5);
    color: var(--muted2);
  }

  tr:last-child td { border-bottom: none; }

  tr:hover td { background: rgba(255,255,255,0.01); }

  .admin-name-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mini-avatar {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    color: #0a0b0f;
    flex-shrink: 0;
  }

  .admin-name { color: var(--text); font-weight: 500; font-size: 13px; }
  .admin-email { font-size: 11px; color: var(--muted); }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
  }

  .status-active { background: rgba(79,255,176,0.12); color: var(--accent2); }
  .status-inactive { background: rgba(90,97,117,0.2); color: var(--muted2); }
  .status-pending { background: rgba(255,107,107,0.12); color: var(--accent3); }

  .action-row {
    display: flex;
    gap: 6px;
  }

  .act-btn {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--surface2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.15s;
  }

  .act-btn:hover { background: var(--border); }

  /* ACTIVITY FEED */
  .feed-list {
    padding: 8px 0;
  }

  .feed-item {
    display: flex;
    gap: 12px;
    padding: 12px 22px;
    transition: background 0.15s;
  }

  .feed-item:hover { background: rgba(255,255,255,0.01); }

  .feed-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 5px;
    flex-shrink: 0;
  }

  .feed-text { font-size: 12.5px; color: var(--muted2); line-height: 1.5; }
  .feed-text strong { color: var(--text); font-weight: 500; }
  .feed-time { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* BOTTOM ROW */
  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }

  /* SETTINGS PANEL */
  .settings-list {
    padding: 8px 0;
  }

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 22px;
    border-bottom: 1px solid rgba(30,35,48,0.5);
  }

  .setting-row:last-child { border-bottom: none; }

  .setting-label { font-size: 13px; color: var(--text); font-weight: 400; }
  .setting-sub { font-size: 11px; color: var(--muted); margin-top: 1px; }

  /* TOGGLE */
  .toggle {
    width: 40px;
    height: 22px;
    border-radius: 11px;
    position: relative;
    cursor: pointer;
    transition: background 0.2s;
    border: none;
    flex-shrink: 0;
  }

  .toggle.on { background: var(--accent); }
  .toggle.off { background: var(--border); }

  .toggle-knob {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: 3px;
    transition: left 0.2s;
  }

  .toggle.on .toggle-knob { left: 21px; }
  .toggle.off .toggle-knob { left: 3px; }

  /* REPORTS */
  .report-item {
    padding: 13px 22px;
    border-bottom: 1px solid rgba(30,35,48,0.5);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .report-item:last-child { border-bottom: none; }

  .report-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  .report-name { font-size: 13px; font-weight: 500; color: var(--text); }
  .report-meta { font-size: 11px; color: var(--muted); }

  .download-btn {
    margin-left: auto;
    padding: 5px 12px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--muted2);
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  .download-btn:hover {
    background: rgba(232,255,71,0.1);
    border-color: rgba(232,255,71,0.3);
    color: var(--accent);
  }

  /* BAR CHART */
  .mini-chart {
    padding: 16px 22px 20px;
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 80px;
  }

  .bar-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    height: 100%;
    justify-content: flex-end;
  }

  .bar {
    width: 100%;
    border-radius: 4px 4px 2px 2px;
    transition: height 0.4s ease;
  }

  .bar-month {
    font-size: 9px;
    color: var(--muted);
    font-weight: 500;
  }

  /* ADD ADMIN MODAL LOOK */
  .add-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    background: var(--accent);
    color: #0a0b0f;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .add-btn:hover { opacity: 0.88; }

  .alert-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,107,107,0.08);
    border: 1px solid rgba(255,107,107,0.2);
    border-radius: 10px;
    padding: 12px 18px;
    margin-bottom: 24px;
    font-size: 13px;
    color: var(--accent3);
  }
`;

const NAV = [
  { id: "overview", label: "Overview", icon: "⊞", section: "MAIN" },
  { id: "admins", label: "Manage Admins", icon: "👤", section: "SUPER ADMIN", badge: "3" },
  { id: "settings", label: "Platform Settings", icon: "⚙️", section: "SUPER ADMIN" },
  { id: "reports", label: "System Reports", icon: "📊", section: "SUPER ADMIN" },
  { id: "security", label: "Security & Audit", icon: "🔒", section: "SYSTEM" },
  { id: "logs", label: "Access Logs", icon: "📋", section: "SYSTEM" },
];

const ADMINS = [
  { name: "Sophie Laurent", email: "s.laurent@luxestore.com", role: "Store Admin", status: "active", last: "2m ago", color: "#e8ff47" },
  { name: "Raj Nair", email: "r.nair@luxestore.com", role: "Catalog Admin", status: "active", last: "1h ago", color: "#4fffb0" },
  { name: "Mia Chen", email: "m.chen@luxestore.com", role: "Support Lead", status: "inactive", last: "2d ago", color: "#7b9cff" },
  { name: "Felix Wagner", email: "f.wagner@luxestore.com", role: "Finance Admin", status: "pending", last: "—", color: "#ff9f47" },
];

const ACTIVITY = [
  { color: "#e8ff47", text: <><strong>Sophie Laurent</strong> promoted to Store Admin</>, time: "3 min ago" },
  { color: "#4fffb0", text: <><strong>Raj Nair</strong> updated product catalog permissions</>, time: "27 min ago" },
  { color: "#ff6b6b", text: <><strong>System</strong> detected unusual login attempt — blocked</>, time: "1h ago" },
  { color: "#7b9cff", text: <><strong>Mia Chen</strong> account deactivated by super admin</>, time: "2h ago" },
  { color: "#e8ff47", text: <><strong>Platform settings</strong> updated: 2FA enforced globally</>, time: "5h ago" },
];

const SETTINGS = [
  { label: "Two-Factor Auth (Global)", sub: "Enforced for all admin accounts", defaultOn: true },
  { label: "Maintenance Mode", sub: "Temporarily disable storefront", defaultOn: false },
  { label: "New Admin Approval", sub: "Require super admin sign-off", defaultOn: true },
  { label: "Audit Log Retention", sub: "Keep logs for 90 days", defaultOn: true },
  { label: "Email Notifications", sub: "Alert on critical system events", defaultOn: false },
];

const REPORTS = [
  { icon: "📦", name: "Sales Performance Report", meta: "Generated Apr 2025", color: "rgba(232,255,71,0.1)" },
  { icon: "👥", name: "Admin Activity Summary", meta: "Generated Apr 2025", color: "rgba(79,255,176,0.1)" },
  { icon: "🔐", name: "Security & Access Audit", meta: "Generated Apr 2025", color: "rgba(123,156,255,0.1)" },
  { icon: "⚡", name: "System Performance Log", meta: "Generated Apr 2025", color: "rgba(255,159,71,0.1)" },
];

const BARS = [
  { month: "Nov", h: 38 }, { month: "Dec", h: 70 }, { month: "Jan", h: 52 },
  { month: "Feb", h: 88 }, { month: "Mar", h: 64 }, { month: "Apr", h: 95 },
];

function Toggle({ defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button className={`toggle ${on ? "on" : "off"}`} onClick={() => setOn(o => !o)}>
      <div className="toggle-knob" />
    </button>
  );
}

export default function SuperAdminDashboard() {
  const [active, setActive] = useState("overview");

  const sections = [...new Set(NAV.map(n => n.section))];

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="logo-area">
            <div className="logo-badge">
              <div className="logo-icon">L</div>
              <div>
                <div className="logo-text">LuxeStore</div>
                <span className="logo-sub">Super Admin</span>
              </div>
            </div>
          </div>

          <div className="role-chip">
            <div className="role-dot" />
            SUPER ADMIN ACCESS
          </div>

          <div className="nav-section">
            {sections.map(sec => (
              <div key={sec}>
                <div className="nav-label">{sec}</div>
                {NAV.filter(n => n.section === sec).map(item => (
                  <div
                    key={item.id}
                    className={`nav-item ${active === item.id ? "active" : ""}`}
                    onClick={() => setActive(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="avatar">SA</div>
              <div>
                <div className="user-name">Alex Rivera</div>
                <div className="user-role">Super Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="page-title">
              {active === "overview" && "Dashboard Overview"}
              {active === "admins" && "Manage Admins"}
              {active === "settings" && "Platform Settings"}
              {active === "reports" && "System Reports"}
              {active === "security" && "Security & Audit"}
              {active === "logs" && "Access Logs"}
            </div>
            <div className="topbar-actions">
              <div className="icon-btn">
                🔍
              </div>
              <div className="icon-btn">
                🔔
                <div className="notif-dot" />
              </div>
              <div className="avatar" style={{ width: 36, height: 36, borderRadius: 10, fontSize: 13 }}>SA</div>
            </div>
          </div>

          <div className="content">
            {/* ALERT */}
            <div className="alert-bar">
              ⚠️ <span>Security alert: 3 failed login attempts detected on <strong>f.wagner@luxestore.com</strong>. Review recommended.</span>
            </div>

            {/* STATS */}
            <div className="stats-grid">
              {[
                { label: "Total Admins", value: "12", trend: "+2", up: true, color: "rgba(232,255,71,0.12)", icon: "👤" },
                { label: "Active Sessions", value: "7", trend: "+1", up: true, color: "rgba(79,255,176,0.12)", icon: "💻" },
                { label: "Platform Uptime", value: "99.9%", trend: "0.1%", up: true, color: "rgba(123,156,255,0.12)", icon: "⚡" },
                { label: "Pending Requests", value: "3", trend: "+3", up: false, color: "rgba(255,107,107,0.12)", icon: "📋" },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-header">
                    <div className="stat-icon-wrap" style={{ background: s.color }}>{s.icon}</div>
                    <span className={`stat-trend ${s.up ? "trend-up" : "trend-down"}`}>{s.up ? "↑" : "↓"} {s.trend}</span>
                  </div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* PANELS ROW */}
            <div className="panels-row">
              {/* ADMINS TABLE */}
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">Admin Accounts</div>
                  <button className="add-btn">＋ Add Admin</button>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Admin</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Active</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ADMINS.map((a, i) => (
                        <tr key={i}>
                          <td>
                            <div className="admin-name-cell">
                              <div className="mini-avatar" style={{ background: a.color }}>
                                {a.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div>
                                <div className="admin-name">{a.name}</div>
                                <div className="admin-email">{a.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>{a.role}</td>
                          <td>
                            <span className={`status-pill status-${a.status}`}>
                              {a.status === "active" ? "● Active" : a.status === "inactive" ? "○ Inactive" : "⚠ Pending"}
                            </span>
                          </td>
                          <td>{a.last}</td>
                          <td>
                            <div className="action-row">
                              <div className="act-btn">✏️</div>
                              <div className="act-btn">🗑️</div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ACTIVITY */}
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">Recent Activity</div>
                  <button className="panel-action">View all →</button>
                </div>
                <div className="feed-list">
                  {ACTIVITY.map((f, i) => (
                    <div className="feed-item" key={i}>
                      <div className="feed-dot" style={{ background: f.color }} />
                      <div>
                        <div className="feed-text">{f.text}</div>
                        <div className="feed-time">{f.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className="bottom-row">
              {/* SETTINGS */}
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">Platform Settings</div>
                  <button className="panel-action">Edit all →</button>
                </div>
                <div className="settings-list">
                  {SETTINGS.map((s, i) => (
                    <div className="setting-row" key={i}>
                      <div>
                        <div className="setting-label">{s.label}</div>
                        <div className="setting-sub">{s.sub}</div>
                      </div>
                      <Toggle defaultOn={s.defaultOn} />
                    </div>
                  ))}
                </div>
              </div>

              {/* REPORTS */}
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">System Reports</div>
                  <button className="panel-action">All reports →</button>
                </div>
                <div>
                  {REPORTS.map((r, i) => (
                    <div className="report-item" key={i}>
                      <div className="report-icon" style={{ background: r.color }}>{r.icon}</div>
                      <div>
                        <div className="report-name">{r.name}</div>
                        <div className="report-meta">{r.meta}</div>
                      </div>
                      <button className="download-btn">↓ Export</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CHART */}
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">Revenue Overview</div>
                  <button className="panel-action">Details →</button>
                </div>
                <div style={{ padding: "16px 22px 8px", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: -1 }}>$284K</div>
                    <div style={{ fontSize: 12, color: "var(--muted2)" }}>Last 6 months</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, color: "#4fffb0", fontWeight: 600 }}>↑ 18.4%</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>vs prev. period</div>
                  </div>
                </div>
                <div className="mini-chart">
                  {BARS.map((b, i) => (
                    <div className="bar-wrap" key={i}>
                      <div
                        className="bar"
                        style={{
                          height: `${b.h}%`,
                          background: i === BARS.length - 1
                            ? "linear-gradient(180deg, #e8ff47, #4fffb0)"
                            : "var(--surface2)",
                          border: i === BARS.length - 1 ? "none" : "1px solid var(--border)",
                        }}
                      />
                      <span className="bar-month">{b.month}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "0 22px 18px", display: "flex", gap: 16 }}>
                  {[
                    { label: "Orders", val: "1,240", color: "#e8ff47" },
                    { label: "Returns", val: "87", color: "#ff6b6b" },
                    { label: "Avg Order", val: "$229", color: "#4fffb0" },
                  ].map((m, i) => (
                    <div key={i} style={{ flex: 1, background: "var(--surface2)", borderRadius: 8, padding: "8px 10px", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: 11, color: m.color, fontWeight: 600, marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}