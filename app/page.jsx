import { useState, useEffect, useCallback } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, RadarChart, Radar,
  PolarGrid, PolarAngleAxis
} from "recharts";

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #0a0b0f; color: #e2e8f0; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #12141a; }
    ::-webkit-scrollbar-thumb { background: #2d3148; border-radius: 2px; }
  `}</style>
);

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  bg: "#0a0b0f",
  surface: "#111318",
  surfaceHover: "#16181f",
  border: "#1e2130",
  borderLight: "#252a3a",
  text: "#e2e8f0",
  textMuted: "#6b7280",
  textDim: "#4b5563",
  accent: "#6366f1",
  accentGlow: "rgba(99,102,241,0.15)",
  green: "#10b981",
  greenBg: "rgba(16,185,129,0.1)",
  yellow: "#f59e0b",
  yellowBg: "rgba(245,158,11,0.1)",
  red: "#ef4444",
  redBg: "rgba(239,68,68,0.1)",
  blue: "#3b82f6",
  blueBg: "rgba(59,130,246,0.1)",
};

// ─────────────────────────────────────────────
// SIMULATED DATASET — REALISTIC SCHOOL PATTERNS
// ─────────────────────────────────────────────
const STUDENTS = [
  { id: 1, name: "Marcus Thompson",   group: "2B", attendance: 61, gpa: 1.9, incidents: 7, risk: "high",   trend: "down" },
  { id: 2, name: "Aisha Patel",       group: "3A", attendance: 58, gpa: 2.1, incidents: 5, risk: "high",   trend: "down" },
  { id: 3, name: "Dylan Rivera",      group: "2B", attendance: 72, gpa: 2.4, incidents: 4, risk: "high",   trend: "stable" },
  { id: 4, name: "Zoe Chen",          group: "1C", attendance: 79, gpa: 2.6, incidents: 3, risk: "medium", trend: "stable" },
  { id: 5, name: "Jaylen Brooks",     group: "4A", attendance: 75, gpa: 2.3, incidents: 4, risk: "medium", trend: "down" },
  { id: 6, name: "Priya Nair",        group: "3B", attendance: 82, gpa: 2.9, incidents: 2, risk: "medium", trend: "up" },
  { id: 7, name: "Ethan Walsh",       group: "2A", attendance: 88, gpa: 3.1, incidents: 1, risk: "low",    trend: "up" },
  { id: 8, name: "Fatima Al-Hassan",  group: "1A", attendance: 94, gpa: 3.8, incidents: 0, risk: "low",    trend: "up" },
  { id: 9, name: "Connor Murphy",     group: "2B", attendance: 65, gpa: 2.0, incidents: 6, risk: "high",   trend: "down" },
  { id: 10,name: "Lily Zhang",        group: "3A", attendance: 91, gpa: 3.6, incidents: 0, risk: "low",    trend: "stable" },
  { id: 11,name: "Tariq Jefferson",   group: "4A", attendance: 77, gpa: 2.5, incidents: 3, risk: "medium", trend: "stable" },
  { id: 12,name: "Sofia Morales",     group: "1C", attendance: 85, gpa: 3.2, incidents: 1, risk: "low",    trend: "up" },
  { id: 13,name: "Noah Kim",          group: "2A", attendance: 70, gpa: 2.2, incidents: 4, risk: "medium", trend: "down" },
  { id: 14,name: "Isabelle Laurent",  group: "3B", attendance: 96, gpa: 3.9, incidents: 0, risk: "low",    trend: "up" },
  { id: 15,name: "Darius Mitchell",   group: "4B", attendance: 55, gpa: 1.7, incidents: 9, risk: "high",   trend: "down" },
  { id: 16,name: "Amara Osei",        group: "1A", attendance: 90, gpa: 3.5, incidents: 1, risk: "low",    trend: "stable" },
  { id: 17,name: "Luca Ferretti",     group: "2B", attendance: 68, gpa: 2.2, incidents: 5, risk: "high",   trend: "down" },
  { id: 18,name: "Maya Goldstein",    group: "3A", attendance: 83, gpa: 3.0, incidents: 2, risk: "low",    trend: "up" },
  { id: 19,name: "Jordan Hayes",      group: "4B", attendance: 74, gpa: 2.6, incidents: 3, risk: "medium", trend: "stable" },
  { id: 20,name: "Chloe Watkins",     group: "1C", attendance: 62, gpa: 1.8, incidents: 6, risk: "high",   trend: "down" },
];

const TEACHERS = [
  { id: 1, name: "Ms. Sandra Rivera",  subject: "English",  groups: 7, hours: 52, incidents: 28, burnout: "high",   experience: 4  },
  { id: 2, name: "Mr. James Park",     subject: "Math",     groups: 8, hours: 58, incidents: 35, burnout: "high",   experience: 3  },
  { id: 3, name: "Dr. Lena Hoffman",   subject: "Science",  groups: 5, hours: 41, incidents: 12, burnout: "medium", experience: 9  },
  { id: 4, name: "Mr. David Cole",     subject: "History",  groups: 4, hours: 36, incidents: 8,  burnout: "low",    experience: 14 },
  { id: 5, name: "Ms. Priya Sharma",   subject: "PE",       groups: 9, hours: 60, incidents: 22, burnout: "high",   experience: 2  },
  { id: 6, name: "Ms. Angela Wu",      subject: "Art",      groups: 3, hours: 28, incidents: 4,  burnout: "low",    experience: 11 },
  { id: 7, name: "Mr. Carlos Vega",    subject: "Spanish",  groups: 6, hours: 46, incidents: 17, burnout: "medium", experience: 6  },
  { id: 8, name: "Ms. Rachel Green",   subject: "Music",    groups: 4, hours: 33, incidents: 5,  burnout: "low",    experience: 8  },
];

const GROUPS = ["1A","1C","2A","2B","3A","3B","4A","4B"];

const INCIDENTS_TIMELINE = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() - (29 - i));
  const label = `${d.getMonth()+1}/${d.getDate()}`;
  const base = 3 + Math.sin(i * 0.4) * 2;
  return {
    date: label,
    "2B": Math.max(0, Math.round(base + (i > 20 ? (i-20)*0.4 : 0) + Math.random())),
    "3A": Math.max(0, Math.round(base * 0.7 + Math.random())),
    "4A": Math.max(0, Math.round(base * 0.5 + Math.random())),
    "1C": Math.max(0, Math.round(base * 0.6 + Math.random())),
  };
});

const INCIDENTS_DETAIL = [
  { id: 1, student: "Marcus Thompson",  type: "Disruption",        group: "2B", date: "Apr 3", severity: "medium" },
  { id: 2, student: "Darius Mitchell",  type: "Absenteeism",       group: "4B", date: "Apr 3", severity: "high"   },
  { id: 3, student: "Connor Murphy",    type: "Confrontation",     group: "2B", date: "Apr 2", severity: "high"   },
  { id: 4, student: "Luca Ferretti",    type: "Late Submission",   group: "2B", date: "Apr 2", severity: "low"    },
  { id: 5, student: "Chloe Watkins",    type: "Disruption",        group: "1C", date: "Apr 1", severity: "medium" },
  { id: 6, student: "Jaylen Brooks",    type: "Absenteeism",       group: "4A", date: "Apr 1", severity: "medium" },
  { id: 7, student: "Aisha Patel",      type: "Academic Concern",  group: "3A", date: "Mar 31",severity: "high"   },
  { id: 8, student: "Dylan Rivera",     type: "Disruption",        group: "2B", date: "Mar 31",severity: "low"    },
  { id: 9, student: "Noah Kim",         type: "Late Submission",   group: "2A", date: "Mar 30",severity: "low"    },
  { id:10, student: "Jordan Hayes",     type: "Absenteeism",       group: "4B", date: "Mar 29",severity: "medium" },
];

const KPI_TRENDS = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon","Tue","Wed","Thu","Fri","Mon","Tue"][i],
  risk: [5,6,6,7,7,8,8][i],
  incidents: [12,14,11,16,18,15,19][i],
}));

// ─────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────
const Badge = ({ level, children }) => {
  const styles = {
    high:   { bg: C.redBg,    color: C.red,    border: "rgba(239,68,68,0.3)"   },
    medium: { bg: C.yellowBg, color: C.yellow, border: "rgba(245,158,11,0.3)"  },
    low:    { bg: C.greenBg,  color: C.green,  border: "rgba(16,185,129,0.3)"  },
  };
  const s = styles[level] || styles.low;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px",
      borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
      textTransform: "uppercase", background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display:"inline-block" }} />
      {children || level}
    </span>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
    padding: 24, ...style,
  }}>{children}</div>
);

const StatCard = ({ icon, label, value, sub, color = C.accent, delta }) => (
  <Card style={{ position: "relative", overflow: "hidden" }}>
    <div style={{
      position: "absolute", top: 0, right: 0, width: 80, height: 80,
      background: `radial-gradient(circle at top right, ${color}22, transparent)`,
      borderRadius: "0 12px 0 80px",
    }} />
    <div style={{ fontSize: 22, marginBottom: 12 }}>{icon}</div>
    <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 700, color: C.text, lineHeight: 1 }}>{value}</div>
    {(sub || delta) && (
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
        {delta && (
          <span style={{ fontSize: 11, color: delta > 0 ? C.red : C.green, fontWeight: 600 }}>
            {delta > 0 ? "↑" : "↓"} {Math.abs(delta)}%
          </span>
        )}
        {sub && <span style={{ fontSize: 12, color: C.textMuted }}>{sub}</span>}
      </div>
    )}
  </Card>
);

const SectionTitle = ({ title, subtitle }) => (
  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 17, fontWeight: 600, color: C.text }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{subtitle}</p>}
  </div>
);

const Spinner = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.textMuted, fontSize: 14 }}>
    <div style={{
      width: 16, height: 16, border: `2px solid ${C.border}`, borderTop: `2px solid ${C.accent}`,
      borderRadius: "50%", animation: "spin 0.8s linear infinite",
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    Generating AI insights…
  </div>
);

// ─────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────
const NAV = [
  { id: "dashboard",  icon: "⊡", label: "Dashboard"     },
  { id: "students",   icon: "◈", label: "Student Risk"  },
  { id: "teachers",   icon: "◉", label: "Teacher Load"  },
  { id: "incidents",  icon: "◬", label: "Incidents"     },
  { id: "ai",         icon: "◆", label: "AI Insights"   },
];

const Sidebar = ({ active, setActive }) => (
  <div style={{
    width: 220, background: C.surface, borderRight: `1px solid ${C.border}`,
    display: "flex", flexDirection: "column", height: "100vh", position: "fixed",
    left: 0, top: 0, zIndex: 10,
  }}>
    {/* Logo */}
    <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, background: `linear-gradient(135deg, ${C.accent}, #818cf8)`,
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "#fff",
        }}>E</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>EduInsight</div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>AI Platform</div>
        </div>
      </div>
    </div>

    {/* School selector */}
    <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
      <div style={{
        background: C.bg, border: `1px solid ${C.borderLight}`, borderRadius: 8,
        padding: "8px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 11, color: C.textMuted }}>District</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Lincoln HS</div>
        </div>
        <span style={{ color: C.textMuted, alignSelf: "center" }}>⌄</span>
      </div>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
      <div style={{ fontSize: 10, color: C.textDim, padding: "4px 12px 8px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Navigation</div>
      {NAV.map(item => {
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => setActive(item.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
            background: isActive ? C.accentGlow : "transparent",
            color: isActive ? C.accent : C.textMuted,
            marginBottom: 2, textAlign: "left", transition: "all 0.15s",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: isActive ? 600 : 400,
          }}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
            {isActive && <span style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: C.accent }} />}
          </button>
        );
      })}
    </nav>

    {/* Footer */}
    <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: `linear-gradient(135deg, #6366f1, #a78bfa)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: "#fff",
        }}>P</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: C.text }}>Principal Adams</div>
          <div style={{ fontSize: 10, color: C.textMuted }}>Admin</div>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────
const Topbar = ({ title }) => (
  <div style={{
    height: 56, background: C.surface, borderBottom: `1px solid ${C.border}`,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 24px", position: "sticky", top: 0, zIndex: 5,
  }}>
    <div>
      <h1 style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{title}</h1>
      <p style={{ fontSize: 11, color: C.textMuted }}>Lincoln High School · Spring 2025</p>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{
        background: C.redBg, color: C.red, border: `1px solid rgba(239,68,68,0.3)`,
        padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer",
      }}>
        ⚠ 6 Active Alerts
      </div>
      <div style={{
        width: 32, height: 32, borderRadius: 8, background: C.bg,
        border: `1px solid ${C.border}`, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 14, cursor: "pointer",
      }}>🔔</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// DASHBOARD VIEW
// ─────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
      <div style={{ color: C.textMuted, marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, display: "inline-block" }} />
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

const DashboardView = () => {
  const highRisk = STUDENTS.filter(s => s.risk === "high").length;
  const burnoutHigh = TEACHERS.filter(t => t.burnout === "high").length;
  const totalIncidents = INCIDENTS_DETAIL.length;

  const groupIncidents = GROUPS.map(g => ({
    group: g,
    count: INCIDENTS_DETAIL.filter(i => i.group === g).length +
           STUDENTS.filter(s => s.group === g).reduce((a, s) => a + s.incidents, 0),
  })).sort((a, b) => b.count - a.count);

  return (
    <div>
      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard icon="⚠" label="Students At Risk" value={highRisk} sub="vs 5 last week" delta={12} color={C.red} />
        <StatCard icon="🔥" label="Teacher Burnout" value={`${burnoutHigh}/8`} sub="High risk teachers" color={C.yellow} />
        <StatCard icon="⚡" label="Incidents (7d)" value={totalIncidents} sub="Across all groups" delta={8} color={C.accent} />
        <StatCard icon="✦" label="At-Risk Groups" value="2B, 4B" sub="Need immediate attention" color={C.blue} />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
        <Card>
          <SectionTitle title="Incident Trend — Last 30 Days" subtitle="By group · daily count" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={INCIDENTS_TIMELINE.filter((_, i) => i % 3 === 0)}>
              <CartesianGrid stroke={C.border} vertical={false} />
              <XAxis dataKey="date" tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.textMuted }} />
              <Line type="monotone" dataKey="2B" stroke={C.red}    strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="3A" stroke={C.yellow} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="4A" stroke={C.blue}   strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="1C" stroke={C.green}  strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Incidents by Group" subtitle="Cumulative" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={groupIncidents} layout="vertical">
              <XAxis type="number" tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="group" type="category" tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill={C.accent} radius={[0, 4, 4, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Alert Panel */}
      <Card>
        <SectionTitle title="Active Alerts" subtitle="Requires immediate administrator review" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { level: "high",   msg: "Group 2B: 5 high-risk students detected — escalating behavioral incidents over 3 weeks.", time: "2h ago"  },
            { level: "high",   msg: "Mr. James Park (Math): Working 58+ hrs/week across 8 groups. Burnout imminent.",          time: "5h ago"  },
            { level: "high",   msg: "Darius Mitchell (4B): GPA 1.7, attendance 55%, 9 incidents this month.",                  time: "1d ago"  },
            { level: "medium", msg: "Ms. Sandra Rivera: Incident load 28 reports this month, above threshold of 20.",           time: "1d ago"  },
            { level: "medium", msg: "Group 4B attendance trending down for 2nd consecutive week.",                              time: "2d ago"  },
            { level: "low",    msg: "Noah Kim (2A): Late submissions increasing — may indicate home environment issues.",       time: "3d ago"  },
          ].map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              padding: "12px 14px", borderRadius: 8,
              background: a.level === "high" ? C.redBg : a.level === "medium" ? C.yellowBg : C.greenBg,
              border: `1px solid ${a.level === "high" ? "rgba(239,68,68,0.2)" : a.level === "medium" ? "rgba(245,158,11,0.2)" : "rgba(16,185,129,0.2)"}`,
            }}>
              <div style={{ marginTop: 2 }}>
                <Badge level={a.level} />
              </div>
              <div style={{ flex: 1, fontSize: 13, color: C.text, lineHeight: 1.5 }}>{a.msg}</div>
              <span style={{ fontSize: 11, color: C.textMuted, whiteSpace: "nowrap" }}>{a.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────
// STUDENTS VIEW
// ─────────────────────────────────────────────
const StudentsView = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = STUDENTS
    .filter(s => filter === "all" || s.risk === filter)
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const riskScore = s => {
    let score = 0;
    if (s.attendance < 70) score += 40;
    else if (s.attendance < 80) score += 20;
    if (s.gpa < 2.0) score += 35;
    else if (s.gpa < 2.5) score += 18;
    score += s.incidents * 4;
    return Math.min(score, 100);
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Search student…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "9px 14px", color: C.text,
            fontSize: 13, outline: "none", fontFamily: "'DM Sans', sans-serif",
          }}
        />
        {["all","high","medium","low"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "8px 16px", borderRadius: 8, border: `1px solid ${filter===f ? C.accent : C.border}`,
            background: filter===f ? C.accentGlow : "transparent",
            color: filter===f ? C.accent : C.textMuted, cursor: "pointer",
            fontSize: 12, fontWeight: 500, textTransform: "capitalize",
            fontFamily: "'DM Sans', sans-serif",
          }}>{f === "all" ? "All Students" : f}</button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "High Risk",   count: STUDENTS.filter(s=>s.risk==="high").length,   color: C.red    },
          { label: "Medium Risk", count: STUDENTS.filter(s=>s.risk==="medium").length, color: C.yellow },
          { label: "On Track",    count: STUDENTS.filter(s=>s.risk==="low").length,    color: C.green  },
        ].map(s => (
          <Card key={s.label} style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: s.color }}>{s.count}</div>
            <span style={{ fontSize: 13, color: C.textMuted }}>{s.label}</span>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Student Risk Registry</span>
          <span style={{ fontSize: 12, color: C.textMuted, marginLeft: 10 }}>{filtered.length} students</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Student","Group","Attendance","GPA","Incidents","Risk Score","Status","Trend"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", fontSize: 11, color: C.textMuted, textAlign: "left", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const score = riskScore(s);
                return (
                  <tr key={s.id} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "transparent" : `${C.bg}44` }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${s.risk==="high"?C.red:s.risk==="medium"?C.yellow:C.green}44, ${C.accent}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: C.text }}>
                          {s.name.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.accent }}>{s.group}</span></td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 48, height: 4, borderRadius: 2, background: C.border, overflow: "hidden" }}>
                          <div style={{ width: `${s.attendance}%`, height: "100%", background: s.attendance < 70 ? C.red : s.attendance < 80 ? C.yellow : C.green, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 12, color: s.attendance < 70 ? C.red : s.attendance < 80 ? C.yellow : C.text }}>{s.attendance}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: s.gpa < 2.0 ? C.red : s.gpa < 2.5 ? C.yellow : C.text, fontFamily: "'DM Mono', monospace" }}>{s.gpa.toFixed(1)}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: s.incidents > 5 ? C.red : s.incidents > 2 ? C.yellow : C.text }}>{s.incidents}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 60, height: 4, borderRadius: 2, background: C.border, overflow: "hidden" }}>
                          <div style={{ width: `${score}%`, height: "100%", background: score > 60 ? C.red : score > 35 ? C.yellow : C.green, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>{score}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}><Badge level={s.risk} /></td>
                    <td style={{ padding: "12px 16px", fontSize: 14, color: s.trend === "down" ? C.red : s.trend === "up" ? C.green : C.textMuted }}>
                      {s.trend === "down" ? "↘" : s.trend === "up" ? "↗" : "→"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────
// TEACHERS VIEW
// ─────────────────────────────────────────────
const TeachersView = () => {
  const radarData = TEACHERS.slice(0, 5).map(t => ({
    teacher: t.name.split(" ")[1],
    Groups: (t.groups / 9) * 100,
    Hours: (t.hours / 60) * 100,
    Incidents: (t.incidents / 35) * 100,
  }));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {TEACHERS.map(t => {
          const load = Math.min(Math.round((t.groups / 9 * 40) + (t.hours / 60 * 35) + (t.incidents / 35 * 25)), 100);
          return (
            <Card key={t.id} style={{ position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `linear-gradient(135deg, ${t.burnout==="high"?C.red:t.burnout==="medium"?C.yellow:C.green}33, ${C.accent}33)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, fontWeight: 700, color: C.text,
                  }}>
                    {t.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{t.subject} · {t.experience}y exp.</div>
                  </div>
                </div>
                <Badge level={t.burnout} />
              </div>

              {/* Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "Groups", value: t.groups, warn: t.groups > 6 },
                  { label: "Hrs/wk", value: t.hours,  warn: t.hours  > 50 },
                  { label: "Reports", value: t.incidents, warn: t.incidents > 20 },
                ].map(m => (
                  <div key={m.label} style={{ background: C.bg, borderRadius: 8, padding: "10px 12px", textAlign: "center", border: m.warn ? `1px solid ${C.red}44` : `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: m.warn ? C.red : C.text, fontFamily: "'DM Mono', monospace" }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Burnout bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: C.textMuted }}>Workload Index</span>
                  <span style={{ fontSize: 11, color: load > 70 ? C.red : load > 45 ? C.yellow : C.green, fontFamily: "'DM Mono', monospace" }}>{load}%</span>
                </div>
                <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 3, width: `${load}%`,
                    background: load > 70 ? `linear-gradient(90deg, ${C.yellow}, ${C.red})` : load > 45 ? C.yellow : C.green,
                    transition: "width 0.5s ease",
                  }} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// INCIDENTS VIEW
// ─────────────────────────────────────────────
const IncidentsView = () => {
  const types = ["Disruption","Absenteeism","Confrontation","Late Submission","Academic Concern"];
  const byType = types.map(t => ({ type: t, count: INCIDENTS_DETAIL.filter(i => i.type === t).length }));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <Card>
          <SectionTitle title="By Incident Type" subtitle="Last 30 days" />
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={byType}>
              <CartesianGrid stroke={C.border} vertical={false} />
              <XAxis dataKey="type" tick={{ fill: C.textMuted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill={C.accent} radius={[4,4,0,0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Severity Distribution" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
            {[
              { level: "high",   count: INCIDENTS_DETAIL.filter(i=>i.severity==="high").length,   label: "High severity" },
              { level: "medium", count: INCIDENTS_DETAIL.filter(i=>i.severity==="medium").length, label: "Medium severity" },
              { level: "low",    count: INCIDENTS_DETAIL.filter(i=>i.severity==="low").length,    label: "Low severity" },
            ].map(s => (
              <div key={s.level} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Badge level={s.level}>{s.label}</Badge>
                <div style={{ flex: 1, height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${(s.count / INCIDENTS_DETAIL.length) * 100}%`, height: "100%", background: s.level === "high" ? C.red : s.level === "medium" ? C.yellow : C.green, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "'DM Mono', monospace", width: 20 }}>{s.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Log */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Incident Log</span>
          <span style={{ fontSize: 11, color: C.textMuted }}>Recent 10 reports</span>
        </div>
        {INCIDENTS_DETAIL.map((inc, i) => (
          <div key={inc.id} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "12px 20px",
            borderBottom: i < INCIDENTS_DETAIL.length-1 ? `1px solid ${C.border}` : "none",
            background: i % 2 === 0 ? "transparent" : `${C.bg}44`,
          }}>
            <Badge level={inc.severity} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{inc.student}</span>
              <span style={{ fontSize: 12, color: C.textMuted, marginLeft: 8 }}>— {inc.type}</span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.accent }}>{inc.group}</span>
            <span style={{ fontSize: 11, color: C.textMuted }}>{inc.date}</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────
// AI INSIGHTS VIEW
// ─────────────────────────────────────────────
const AIView = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = useCallback(async () => {
    setLoading(true);
    setInsights([]);

    const context = `
School: Lincoln High School — Spring 2025 Analytics Snapshot

HIGH-RISK STUDENTS (${STUDENTS.filter(s=>s.risk==="high").length} total):
${STUDENTS.filter(s=>s.risk==="high").map(s=>`- ${s.name} (Group ${s.group}): ${s.attendance}% attendance, GPA ${s.gpa}, ${s.incidents} incidents`).join("\n")}

TEACHER BURNOUT RISK:
${TEACHERS.filter(t=>t.burnout!=="low").map(t=>`- ${t.name} (${t.subject}): ${t.groups} groups, ${t.hours}hrs/wk, ${t.incidents} incident reports — Status: ${t.burnout}`).join("\n")}

GROUP 2B CONCERN:
5 of 6 students in Group 2B are high risk. Incidents increased 40% over last 3 weeks.

DATA PATTERNS:
- Mr. James Park (Math): 8 groups, 58hrs/wk — highest workload of all staff
- Darius Mitchell: lowest attendance (55%) and GPA (1.7) in the school
- Group 4B: attendance trending down for 2 consecutive weeks
    `;

    const prompt = `You are an AI analytics engine for an educational SaaS platform called EduInsight AI. 
Analyze the following school data and generate EXACTLY 5 actionable insights as a JSON array.

Each insight must have:
- "type": one of "student", "teacher", "group", "system"
- "severity": one of "high", "medium", "low"  
- "title": short title (max 8 words)
- "insight": 2-3 sentence data-driven observation
- "recommendation": 1-2 sentence concrete action

Return ONLY a valid JSON array. No preamble, no markdown.

School data:
${context}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "[]";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setInsights(parsed);
    } catch (e) {
      // Fallback static insights
      setInsights([
        { type: "group",   severity: "high",   title: "Group 2B in Critical State",       insight: "Group 2B shows the highest concentration of at-risk students in the school, with 5 out of 6 students flagged as high risk. Incidents in this group have increased by 40% over the last three weeks, suggesting a systemic classroom environment issue rather than isolated individual problems.", recommendation: "Conduct an immediate classroom audit for Group 2B and consider temporarily co-teaching with a behavioral support specialist." },
        { type: "teacher", severity: "high",   title: "Mr. Park Approaching Burnout Point", insight: "Mr. James Park is managing 8 student groups while logging 58 hours per week — the highest workload in the entire faculty. His incident report count of 35 this month is also the highest among all teachers, compounding stress and reducing effective instructional capacity.", recommendation: "Reduce Mr. Park's group load to 5-6 immediately. Provide access to counseling resources and a 2-week check-in plan." },
        { type: "student", severity: "high",   title: "Darius Mitchell Needs Urgent Intervention", insight: "Darius Mitchell presents the school's most critical academic profile: 55% attendance, a 1.7 GPA, and 9 incidents in a single month. This pattern strongly correlates with elevated dropout risk within the next academic semester if no intervention occurs.", recommendation: "Initiate a family conference this week and assign a dedicated student success coach to Darius immediately." },
        { type: "group",   severity: "medium", title: "Group 4B Attendance Decline Pattern", insight: "Group 4B attendance has declined for two consecutive weeks and is now trending toward the critical threshold of 75%. Three students in this group are already flagged as medium risk, and one (Jordan Hayes) is approaching high-risk criteria.", recommendation: "Deploy targeted attendance outreach to 4B families and investigate potential scheduling or transportation barriers." },
        { type: "system",  severity: "medium", title: "Faculty Burnout Cluster Forming",    insight: "Three of eight teachers — Park, Rivera, and Sharma — simultaneously show high burnout indicators. This clustering suggests a systemic workload distribution problem rather than individual cases, potentially linked to understaffing or unequal group assignments.", recommendation: "Conduct an immediate faculty workload audit and consider redistribution of groups before the next quarter to prevent cascading burnout." },
      ]);
    } finally {
      setLoading(false);
      setGenerated(true);
    }
  }, []);

  const typeIcon = { student: "◈", teacher: "◉", group: "⬡", system: "◆" };
  const typeColor = { student: C.blue, teacher: C.yellow, group: C.accent, system: C.green };

  return (
    <div>
      {/* Header */}
      <Card style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>AI Analytics Engine</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Powered by Claude · Analyzes students, teachers, and behavioral patterns</div>
        </div>
        <button onClick={generate} disabled={loading} style={{
          padding: "10px 20px", borderRadius: 8, border: "none", cursor: loading ? "not-allowed" : "pointer",
          background: loading ? C.border : `linear-gradient(135deg, ${C.accent}, #818cf8)`,
          color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.2s",
          opacity: loading ? 0.6 : 1,
        }}>
          <span>{loading ? "⟳" : "◆"}</span>
          {loading ? "Analyzing…" : generated ? "Regenerate AI Report" : "Generate AI Report"}
        </button>
      </Card>

      {loading && (
        <Card style={{ display: "flex", justifyContent: "center", padding: 40 }}>
          <Spinner />
        </Card>
      )}

      {!loading && !generated && (
        <Card style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>◆</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 8 }}>AI Insights Ready</div>
          <div style={{ fontSize: 13, color: C.textMuted }}>Click "Generate AI Report" to analyze all school data and receive actionable recommendations.</div>
        </Card>
      )}

      {!loading && insights.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {insights.map((ins, i) => (
            <Card key={i} style={{
              borderLeft: `3px solid ${ins.severity === "high" ? C.red : ins.severity === "medium" ? C.yellow : C.green}`,
              animation: `fadeIn 0.4s ease ${i * 0.1}s both`,
            }}>
              <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18, color: typeColor[ins.type] || C.accent }}>{typeIcon[ins.type] || "◆"}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{ins.title}</div>
                    <div style={{ fontSize: 11, color: typeColor[ins.type] || C.accent, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{ins.type} insight</div>
                  </div>
                </div>
                <Badge level={ins.severity} />
              </div>
              <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.65, marginBottom: 14 }}>{ins.insight}</p>
              <div style={{ background: C.accentGlow, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "10px 14px" }}>
                <span style={{ fontSize: 11, color: C.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>◆ Recommendation · </span>
                <span style={{ fontSize: 13, color: C.text }}>{ins.recommendation}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
const TITLES = {
  dashboard: "Dashboard Overview",
  students:  "Student Risk Analyzer",
  teachers:  "Teacher Burnout Monitor",
  incidents: "Incident Tracker",
  ai:        "AI Insights Panel",
};

export default function App() {
  const [active, setActive] = useState("dashboard");

  const View = {
    dashboard: <DashboardView />,
    students:  <StudentsView />,
    teachers:  <TeachersView />,
    incidents: <IncidentsView />,
    ai:        <AIView />,
  }[active];

  return (
    <>
      <FontImport />
      <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
        <Sidebar active={active} setActive={setActive} />
        <div style={{ marginLeft: 220, flex: 1, display: "flex", flexDirection: "column" }}>
          <Topbar title={TITLES[active]} />
          <main style={{ flex: 1, padding: 24, overflowY: "auto" }}>
            {View}
          </main>
        </div>
      </div>
    </>
  );
}
