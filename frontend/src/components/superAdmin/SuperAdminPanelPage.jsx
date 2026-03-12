import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSuperAdmin } from "../../hooks/useSuperAdmin";

const pageMeta = {
  analytics: {
    title: "Analytics",
    subtitle: "Live platform KPIs from Firestore data.",
  },
  control: {
    title: "Control Center",
    subtitle: "Operational controls and live platform activity.",
  },
  management: {
    title: "Management",
    subtitle: "Manage admin accounts with backend updates.",
  },
  settings: {
    title: "Platform Settings",
    subtitle: "Configuration view powered by backend health and logs.",
  },
  support: {
    title: "Support",
    subtitle: "Recent support-relevant activity events from backend.",
  },
  systemLogs: {
    title: "System Logs",
    subtitle: "Audit trail and status events synced from Firestore.",
  },
};

const routes = [
  { key: "dashboard", label: "Dashboard", path: "/superAdmin/superAdminDashboard" },
  { key: "analytics", label: "Analytics", path: "/superAdmin/analytics" },
  { key: "control", label: "Control", path: "/superAdmin/control" },
  { key: "management", label: "Management", path: "/superAdmin/management" },
  { key: "settings", label: "Settings", path: "/superAdmin/settings" },
  { key: "support", label: "Support", path: "/superAdmin/support" },
  { key: "systemLogs", label: "System Logs", path: "/superAdmin/systemLogs" },
];

const avatarColor = {
  A: "#2563eb",
  B: "#0ea5e9",
  C: "#14b8a6",
  D: "#22c55e",
  E: "#f59e0b",
  F: "#ef4444",
  G: "#8b5cf6",
};

export default function SuperAdminPanelPage({ pageKey }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [busyRowId, setBusyRowId] = useState(null);

  const {
    admins,
    metrics,
    activityLog,
    loading,
    error,
    toggleAdminStatus,
    removeAdmin,
  } = useSuperAdmin();

  const meta = pageMeta[pageKey] || pageMeta.analytics;

  const cards = useMemo(() => metrics.slice(0, 4), [metrics]);
  const recentAdmins = useMemo(() => admins.slice(0, 8), [admins]);
  const recentLogs = useMemo(() => activityLog.slice(0, 10), [activityLog]);

  const doToggleStatus = async (admin) => {
    setBusyRowId(admin.id);
    try {
      await toggleAdminStatus(admin.id, admin.status);
    } finally {
      setBusyRowId(null);
    }
  };

  const doRemove = async (admin) => {
    setBusyRowId(admin.id);
    try {
      await removeAdmin(admin.id, admin.name);
    } finally {
      setBusyRowId(null);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", color: "#111827", fontFamily: "Inter, sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "14px 24px", display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={() => navigate("/superAdmin/superAdminDashboard")}
          style={{ border: "1px solid #d1d5db", background: "#fff", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontWeight: 600 }}
        >
          LuxeStore Super Admin
        </button>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {routes.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.key}
                to={item.path}
                style={{
                  textDecoration: "none",
                  border: active ? "1px solid #2563eb" : "1px solid #d1d5db",
                  background: active ? "#eff6ff" : "#fff",
                  color: active ? "#1d4ed8" : "#374151",
                  borderRadius: 8,
                  padding: "6px 10px",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      <main style={{ padding: 24 }}>
        <h1 style={{ margin: 0, fontSize: 30 }}>{meta.title}</h1>
        <p style={{ marginTop: 6, color: "#6b7280" }}>{meta.subtitle}</p>

        {error && <div style={{ marginTop: 12, color: "#b91c1c", fontWeight: 600 }}>{error}</div>}
        {loading && <div style={{ marginTop: 12, color: "#4b5563" }}>Loading data from Firebase...</div>}

        <section style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {cards.map((card) => (
            <article key={card.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{card.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{card.value}</div>
              <div style={{ marginTop: 4, fontSize: 12, color: card.up ? "#16a34a" : "#dc2626" }}>{card.change}</div>
            </article>
          ))}
        </section>

        <section style={{ marginTop: 16, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #e5e7eb", fontWeight: 700 }}>Admin Accounts</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 12, color: "#6b7280" }}>Admin</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 12, color: "#6b7280" }}>Role</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 12, color: "#6b7280" }}>Store</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 12, color: "#6b7280" }}>Status</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 12, color: "#6b7280" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td style={{ padding: "10px 14px", borderTop: "1px solid #f3f4f6" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: avatarColor[admin.avatar?.[0]] || "#2563eb", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {admin.avatar || "AD"}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{admin.name}</div>
                          <div style={{ color: "#6b7280", fontSize: 12 }}>{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "10px 14px", borderTop: "1px solid #f3f4f6" }}>{admin.role}</td>
                    <td style={{ padding: "10px 14px", borderTop: "1px solid #f3f4f6" }}>{admin.store || "-"}</td>
                    <td style={{ padding: "10px 14px", borderTop: "1px solid #f3f4f6" }}>
                      <span style={{ color: admin.status === "active" ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                        {admin.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px", borderTop: "1px solid #f3f4f6" }}>
                      {pageKey === "management" ? (
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => doToggleStatus(admin)}
                            disabled={busyRowId === admin.id}
                            style={{ border: "1px solid #d1d5db", background: "#fff", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}
                          >
                            {admin.status === "active" ? "Suspend" : "Activate"}
                          </button>
                          <button
                            onClick={() => doRemove(admin)}
                            disabled={busyRowId === admin.id}
                            style={{ border: "1px solid #fecaca", background: "#fff", color: "#dc2626", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "#6b7280", fontSize: 12 }}>Read-only on this page</span>
                      )}
                    </td>
                  </tr>
                ))}
                {recentAdmins.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: "16px 14px", color: "#6b7280" }}>
                      No admin records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 16, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #e5e7eb", fontWeight: 700 }}>Activity Feed</div>
          <div style={{ padding: 14, display: "grid", gap: 10 }}>
            {recentLogs.map((log) => (
              <div key={log.id} style={{ padding: 10, border: "1px solid #f3f4f6", borderRadius: 10, background: "#fafafa" }}>
                <div style={{ fontWeight: 600 }}>{log.action}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{log.user} - {log.time}</div>
              </div>
            ))}
            {recentLogs.length === 0 && <div style={{ color: "#6b7280" }}>No activity events found.</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
