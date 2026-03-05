import { useState } from "react";

const navItems = [
  { id: "general", icon: "⊞", label: "General" },
  { id: "branding", icon: "🎨", label: "Branding" },
  { id: "payments", icon: "💳", label: "Payments" },
  { id: "api", icon: "✳️", label: "API & Integrations" },
  { id: "security", icon: "🛡", label: "Security" },
];

const fontOptions = ["Inter (Default)", "Roboto", "Poppins", "DM Sans", "Nunito", "Lato"];

const integrations = [
  {
    id: "stripe",
    name: "STRIPE",
    status: "connected",
    statusLabel: "CONNECTED",
    logo: "💳",
    logoBg: "#635bff",
    hasKey: true,
    keyValue: "sk_live_••••••••••••••••••••••••••••",
    toggleLeft: "Sandbox",
    toggleRight: "Live",
    toggled: true,
  },
  {
    id: "aws",
    name: "AMAZON WEB SERVICES",
    status: "pending",
    statusLabel: "PENDING CONFIG",
    logo: "AWS",
    logoBg: "#f90",
    hasKey: false,
    keyPlaceholder1: "Access Key ID",
    keyPlaceholder2: "Secret Access Key",
    toggleLeft: "Development",
    toggleRight: "Production",
    toggled: false,
  },
  {
    id: "twilio",
    name: "TWILIO SMS",
    status: "active",
    statusLabel: "ACTIVE",
    logo: "💬",
    logoBg: "#f22f46",
    hasKey: true,
    keyValue: "AC••••••••••••••••••••••••••••••••",
    toggleLeft: "Test",
    toggleRight: "Production",
    toggled: true,
  },
];

export default function Settings() {
  const [activeNav, setActiveNav] = useState("branding");
  const [primaryColor, setPrimaryColor] = useState("#137FEC");
  const [secondaryColor, setSecondaryColor] = useState("#F43F5E");
  const [font, setFont] = useState("Inter (Default)");
  const [showKey, setShowKey] = useState({});
  const [integrationToggles, setIntegrationToggles] = useState({ stripe: true, aws: false, twilio: true });
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const markDirty = () => { setDirty(true); setSaved(false); };

  const handleSave = () => {
    setSaved(true);
    setDirty(false);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDiscard = () => {
    setPrimaryColor("#137FEC");
    setSecondaryColor("#F43F5E");
    setFont("Inter (Default)");
    setDirty(false);
  };

  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --accent: #137FEC;
          --accent-hover: #0f6fd4;
          --accent-light: #eff6ff;
          --bg: #f4f6f9;
          --white: #fff;
          --border: #e5e8ed;
          --text: #111827;
          --muted: #6b7280;
          --sidebar-w: 220px;
          --topbar-h: 56px;
          --font: 'Inter', sans-serif;
          --radius: 10px;
          --shadow: 0 1px 3px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04);
        }

        .root { display: flex; flex-direction: column; height: 100vh; font-family: var(--font); background: var(--bg); color: var(--text); overflow: hidden; }

        /* ── TOPBAR ── */
        .topbar {
          height: var(--topbar-h); background: var(--white);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; padding: 0 24px;
          gap: 0; flex-shrink: 0; z-index: 10;
        }
        .tb-brand { display: flex; align-items: center; gap: 9px; margin-right: 32px; text-decoration: none; }
        .tb-brand-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 3px 8px rgba(19,127,236,0.35); }
        .tb-brand-name { font-size: 0.95rem; font-weight: 700; color: var(--text); }
        .tb-nav { display: flex; gap: 2px; flex: 1; }
        .tb-link { padding: 7px 14px; border-radius: 7px; font-size: 0.875rem; font-weight: 500; color: var(--muted); text-decoration: none; transition: all 0.15s; border: none; background: none; cursor: pointer; font-family: var(--font); }
        .tb-link:hover { color: var(--text); background: #f4f6f9; }
        .tb-link.active { color: var(--accent); font-weight: 600; background: none; }
        .tb-search { display: flex; align-items: center; gap: 8px; background: #f4f6f9; border: 1.5px solid var(--border); border-radius: 8px; padding: 7px 12px; transition: all 0.18s; margin-right: 12px; }
        .tb-search:focus-within { border-color: var(--accent); background: var(--white); box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .tb-search input { border: none; background: none; outline: none; font-size: 0.855rem; color: var(--text); width: 160px; font-family: var(--font); }
        .tb-search input::placeholder { color: #bbb; }
        .tb-avatar { width: 34px; height: 34px; border-radius: 50%; overflow: hidden; border: 2px solid var(--border); cursor: pointer; }
        .tb-avatar img { width: 100%; height: 100%; object-fit: cover; }

        /* ── BODY ── */
        .body { display: flex; flex: 1; overflow: hidden; }

        /* ── SIDEBAR ── */
        .sidebar { width: var(--sidebar-w); flex-shrink: 0; background: var(--white); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 20px 12px; overflow-y: auto; }
        .sb-section-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; padding: 0 8px; margin-bottom: 8px; }
        .sb-item { display: flex; align-items: center; gap: 9px; padding: 9px 10px; border-radius: 8px; cursor: pointer; font-size: 0.875rem; font-weight: 500; color: var(--muted); transition: all 0.16s; border: none; background: none; width: 100%; text-align: left; font-family: var(--font); margin-bottom: 2px; }
        .sb-item:hover { background: #f4f6f9; color: var(--text); }
        .sb-item.active { background: var(--accent-light); color: var(--accent); font-weight: 600; }
        .sb-icon { font-size: 15px; width: 20px; text-align: center; }
        .sb-support { margin-top: auto; padding: 16px 10px 6px; border-top: 1px solid var(--border); }
        .sb-support-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin-bottom: 8px; }
        .sb-support-text { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }
        .sb-support-link { font-size: 0.8rem; color: var(--accent); font-weight: 500; cursor: pointer; margin-top: 4px; display: block; }

        /* ── MAIN ── */
        .main { flex: 1; overflow-y: auto; padding: 28px 32px 100px; }

        /* ── BREADCRUMB ── */
        .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--muted); margin-bottom: 10px; }
        .breadcrumb a { color: var(--muted); text-decoration: none; }
        .breadcrumb a:hover { color: var(--accent); }
        .breadcrumb .sep { color: #d1d5db; }
        .breadcrumb .current { color: var(--text); }

        .page-title { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 6px; }
        .page-desc { font-size: 0.9rem; color: var(--muted); margin-bottom: 28px; }

        /* ── SECTION CARD ── */
        .section-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 14px; box-shadow: var(--shadow); margin-bottom: 24px; overflow: hidden; }
        .section-header { padding: 18px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
        .section-header-icon { font-size: 1rem; }
        .section-header-title { font-size: 1rem; font-weight: 700; }
        .section-body { padding: 28px 24px; }

        /* ── BRANDING ── */
        .branding-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .field-label { font-size: 0.82rem; font-weight: 600; color: var(--text); margin-bottom: 10px; }

        /* Upload zone */
        .upload-zone { border: 2px dashed #d1d5db; border-radius: 10px; padding: 36px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.18s; background: #fafbfc; min-height: 160px; }
        .upload-zone.dragover { border-color: var(--accent); background: var(--accent-light); }
        .upload-zone:hover { border-color: var(--accent); }
        .upload-icon { width: 44px; height: 44px; border-radius: 50%; background: #f0f4f8; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #9ca3af; }
        .upload-text { font-size: 0.84rem; font-weight: 500; color: var(--muted); }
        .upload-hint { font-size: 0.76rem; color: #9ca3af; }

        .file-item { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1.5px solid var(--border); border-radius: 9px; margin-top: 12px; background: #fafbfc; }
        .file-thumb { width: 36px; height: 36px; border-radius: 6px; background: #e8edf2; flex-shrink: 0; }
        .file-name { font-size: 0.84rem; font-weight: 600; }
        .file-since { font-size: 0.75rem; color: var(--muted); }
        .file-del { margin-left: auto; width: 28px; height: 28px; border-radius: 6px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--muted); transition: all 0.15s; }
        .file-del:hover { border-color: #fca5a5; color: #ef4444; background: #fef2f2; }

        /* Color pickers */
        .color-section { }
        .color-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
        .color-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
        .color-input-wrap { display: flex; align-items: center; gap: 10px; border: 1.5px solid var(--border); border-radius: 9px; padding: 8px 12px; background: var(--white); transition: border-color 0.18s; cursor: pointer; }
        .color-input-wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .color-swatch { width: 22px; height: 22px; border-radius: 5px; border: none; padding: 0; cursor: pointer; flex-shrink: 0; }
        .color-hex { font-size: 0.875rem; font-weight: 500; border: none; outline: none; background: none; font-family: var(--font); width: 90px; }

        /* Typography */
        .typo-select { width: 100%; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 9px; font-size: 0.875rem; font-family: var(--font); outline: none; background: var(--white); cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; transition: border-color 0.18s; }
        .typo-select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .typo-hint { font-size: 0.76rem; color: var(--muted); margin-top: 8px; }

        /* ── INTEGRATIONS ── */
        .integration-item { padding: 20px 0; border-bottom: 1px solid #f3f4f6; }
        .integration-item:last-child { border-bottom: none; }
        .int-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .int-logo { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: white; flex-shrink: 0; font-family: var(--font); font-size: 0.7rem; letter-spacing: 0; }
        .int-name { font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em; }
        .status-pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 100px; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.04em; margin-left: 8px; }
        .status-connected { background: #dcfce7; color: #16a34a; }
        .status-active { background: #dcfce7; color: #16a34a; }
        .status-pending { background: #fef9c3; color: #ca8a04; }
        .int-body { display: flex; align-items: center; gap: 12px; }
        .int-input { flex: 1; padding: 9px 12px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 0.855rem; font-family: var(--font); outline: none; background: #fafbfc; transition: border-color 0.18s; color: var(--text); }
        .int-input:focus { border-color: var(--accent); background: var(--white); box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .int-eye { width: 32px; height: 32px; border-radius: 7px; border: 1.5px solid var(--border); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all 0.15s; flex-shrink: 0; }
        .int-eye:hover { border-color: var(--accent); background: var(--accent-light); }
        .int-toggle-wrap { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .int-toggle-label { font-size: 0.82rem; font-weight: 500; }
        .int-toggle-label.active-side { color: var(--accent); font-weight: 600; }
        .int-toggle-label.muted-side { color: var(--muted); }

        /* Toggle switch */
        .toggle-sw { position: relative; width: 42px; height: 24px; flex-shrink: 0; }
        .toggle-sw input { opacity: 0; width: 0; height: 0; position: absolute; }
        .toggle-track { position: absolute; inset: 0; border-radius: 100px; background: #e5e7eb; cursor: pointer; transition: 0.2s; }
        .toggle-track::before { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: white; left: 3px; top: 3px; transition: 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        .toggle-sw input:checked + .toggle-track { background: var(--accent); }
        .toggle-sw input:checked + .toggle-track::before { transform: translateX(18px); }

        /* ── BOTTOM BAR ── */
        .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; height: 58px; background: var(--white); border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; z-index: 50; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); }
        .bb-warning { display: flex; align-items: center; gap: 7px; font-size: 0.82rem; color: var(--muted); }
        .bb-warning-icon { width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid #d1d5db; display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--muted); flex-shrink: 0; }
        .bb-actions { display: flex; gap: 10px; }
        .btn-discard { background: var(--white); color: var(--text); border: 1.5px solid var(--border); padding: 9px 20px; border-radius: 9px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); transition: all 0.15s; }
        .btn-discard:hover { border-color: #9ca3af; }
        .btn-save { background: var(--accent); color: white; border: none; padding: 9px 22px; border-radius: 9px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--font); display: flex; align-items: center; gap: 7px; transition: all 0.18s; box-shadow: 0 3px 10px rgba(19,127,236,0.3); }
        .btn-save:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 5px 14px rgba(19,127,236,0.35); }
        .btn-save.saved { background: #16a34a; box-shadow: 0 3px 10px rgba(22,163,74,0.3); }

        @media (max-width: 900px) {
          .branding-grid { grid-template-columns: 1fr; }
          .sidebar { display: none; }
        }
      `}</style>

      {/* ── TOPBAR ── */}
      <header className="topbar">
        <a href="#" className="tb-brand">
          <div className="tb-brand-icon">⚙️</div>
          <span className="tb-brand-name">Platform Admin</span>
        </a>
        <nav className="tb-nav">
          {["Dashboard", "Users", "Orders", "Stores", "Settings"].map(item => (
            <button key={item} className={`tb-link ${item === "Settings" ? "active" : ""}`}>{item}</button>
          ))}
        </nav>
        <div className="tb-search">
          <span style={{ fontSize: 13, color: "#bbb" }}>🔍</span>
          <input placeholder="Quick find..." />
        </div>
        <div className="tb-avatar">
          <img src="https://api.dicebear.com/7.x/personas/svg?seed=admin&backgroundColor=b6e3f4" alt="Admin" />
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="body">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sb-section-label">System Menu</div>
          {navItems.map(item => (
            <button key={item.id} className={`sb-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
              <span className="sb-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="sb-support">
            <div className="sb-support-label">Support</div>
            <div className="sb-support-text">Need help with global configs?</div>
            <span className="sb-support-link">Open Support Ticket →</span>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="main">
          <div className="breadcrumb">
            <a href="#">Admin</a>
            <span className="sep">/</span>
            <span className="current">Global Settings</span>
          </div>
          <div className="page-title">Global Platform Settings</div>
          <div className="page-desc">Centralized control for platform identity and third-party integrations.</div>

          {/* ── BRANDING ASSETS ── */}
          <div className="section-card">
            <div className="section-header">
              <span className="section-header-icon">✏️</span>
              <span className="section-header-title">Branding Assets</span>
            </div>
            <div className="section-body">
              <div className="branding-grid">

                {/* Left: Logo upload */}
                <div>
                  <div className="field-label">Platform Default Logo</div>
                  <div
                    className={`upload-zone ${dragOver ? "dragover" : ""}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) { setUploadedFile(file.name); markDirty(); } }}
                    onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = ".svg,.png,.jpg"; input.onchange = e => { if (e.target.files[0]) { setUploadedFile(e.target.files[0].name); markDirty(); } }; input.click(); }}
                  >
                    <div className="upload-icon">☁️</div>
                    <div className="upload-text">Click to upload or drag and drop</div>
                    <div className="upload-hint">SVG, PNG, JPG (max. 5MB)</div>
                  </div>
                  <div className="file-item">
                    <div className="file-thumb" />
                    <div>
                      <div className="file-name">{uploadedFile || "current_logo_v2.svg"}</div>
                      <div className="file-since">Active since June 12, 2023</div>
                    </div>
                    <button className="file-del" onClick={() => { setUploadedFile(null); markDirty(); }}>🗑</button>
                  </div>
                </div>

                {/* Right: Colors + Typography */}
                <div>
                  <div className="field-label">Accent Colors</div>
                  <div className="color-row">
                    <div>
                      <div className="color-label">Primary</div>
                      <div className="color-input-wrap">
                        <input type="color" className="color-swatch" value={primaryColor} onChange={e => { setPrimaryColor(e.target.value); markDirty(); }} />
                        <input className="color-hex" value={primaryColor.toUpperCase()} onChange={e => { setPrimaryColor(e.target.value); markDirty(); }} maxLength={7} />
                      </div>
                    </div>
                    <div>
                      <div className="color-label">Secondary</div>
                      <div className="color-input-wrap">
                        <input type="color" className="color-swatch" value={secondaryColor} onChange={e => { setSecondaryColor(e.target.value); markDirty(); }} />
                        <input className="color-hex" value={secondaryColor.toUpperCase()} onChange={e => { setSecondaryColor(e.target.value); markDirty(); }} maxLength={7} />
                      </div>
                    </div>
                  </div>

                  <div className="field-label" style={{ marginTop: 8 }}>Typography</div>
                  <select className="typo-select" value={font} onChange={e => { setFont(e.target.value); markDirty(); }}>
                    {fontOptions.map(f => <option key={f}>{f}</option>)}
                  </select>
                  <div className="typo-hint">This font will be applied to all customer-facing platform interfaces.</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── API & INTEGRATIONS ── */}
          <div className="section-card">
            <div className="section-header">
              <span className="section-header-icon">✳️</span>
              <span className="section-header-title">API & Integrations</span>
            </div>
            <div className="section-body" style={{ paddingTop: 8 }}>
              {integrations.map(intg => (
                <div className="integration-item" key={intg.id}>
                  <div className="int-top">
                    <div className="int-logo" style={{ background: intg.logoBg, fontSize: intg.logo.length > 2 ? "0.6rem" : "1.1rem" }}>
                      {intg.logo}
                    </div>
                    <div>
                      <span className="int-name">{intg.name}</span>
                      <span className={`status-pill status-${intg.status}`}>{intg.statusLabel}</span>
                    </div>
                  </div>

                  <div className="int-body">
                    {intg.hasKey ? (
                      <>
                        <input
                          className="int-input"
                          type={showKey[intg.id] ? "text" : "password"}
                          defaultValue={intg.keyValue}
                          readOnly
                        />
                        <button className="int-eye" onClick={() => setShowKey(p => ({ ...p, [intg.id]: !p[intg.id] }))}>
                          {showKey[intg.id] ? "🙈" : "👁"}
                        </button>
                      </>
                    ) : (
                      <>
                        <input className="int-input" placeholder={intg.keyPlaceholder1} onChange={markDirty} />
                        <input className="int-input" placeholder={intg.keyPlaceholder2} onChange={markDirty} />
                      </>
                    )}
                    <div className="int-toggle-wrap">
                      <span className={`int-toggle-label ${!integrationToggles[intg.id] ? "active-side" : "muted-side"}`}>{intg.toggleLeft}</span>
                      <label className="toggle-sw">
                        <input type="checkbox" checked={integrationToggles[intg.id]} onChange={() => { setIntegrationToggles(p => ({ ...p, [intg.id]: !p[intg.id] })); markDirty(); }} />
                        <span className="toggle-track" />
                      </label>
                      <span className={`int-toggle-label ${integrationToggles[intg.id] ? "active-side" : "muted-side"}`}>{intg.toggleRight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="bottom-bar">
        <div className="bb-warning">
          <div className="bb-warning-icon">ℹ</div>
          {dirty ? "Unsaved changes will be lost." : saved ? "All changes saved." : "Unsaved changes will be lost."}
        </div>
        <div className="bb-actions">
          <button className="btn-discard" onClick={handleDiscard}>Discard Changes</button>
          <button className={`btn-save ${saved ? "saved" : ""}`} onClick={handleSave}>
            💾 {saved ? "Saved!" : "Save Platform Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
