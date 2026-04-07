# EduInsight AI — Teacher \& Student Analytics Platform

> AI-powered SaaS platform that helps K-12 schools detect at-risk students and prevent teacher burnout before they become dropout or resignation statistics.

!\[Status](https://img.shields.io/badge/status-live-brightgreen)
!\[Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20Tailwind%20%7C%20Claude%20AI-6366f1)
!\[License](https://img.shields.io/badge/license-MIT-blue)

\---

## 🔗 Live Demo

[**eduinsight-ai.vercel.app**](https://eduinsight-ai.vercel.app)

\---

## 🎯 Problem

Schools react to academic failure after it's already too late. Administrators have no real-time visibility into student risk levels or staff wellbeing — decisions are made based on end-of-semester reports, not live data.

## 💡 Solution

EduInsight AI is a unified analytics dashboard that surfaces behavioral, academic, and workload data in real time — with AI-generated recommendations so principals can act in days, not months.

## 📈 Impact

* Early identification reduces student dropout risk
* Workload monitoring helps prevent teacher turnover
* AI insights replace manual data analysis for administrators

\---

## ✨ Features

* **Student Risk Analyzer** — Automated risk scoring based on attendance, GPA, and behavioral incidents
* **Teacher Burnout Monitor** — Workload index calculated from groups, hours, and incident reports
* **Incident Tracker** — Log and classify behavioral incidents with trend visualization
* **AI Insights Panel** — Claude AI generates actionable recommendations from real school data
* **Smart Alerts** — Color-coded alert system (critical / warning / stable)
* **30-Day Trend Analysis** — Incident timelines per group over the last month

\---

## 🧱 Tech Stack

|Layer|Technology|
|-|-|
|Frontend|Next.js 14 (App Router)|
|Styling|Tailwind CSS|
|Charts|Recharts|
|AI Engine|Anthropic Claude API|
|Deploy|Vercel|

\---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/gabrieljcruzg/eduinsight-ai.git
cd eduinsight-ai

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

\---

## 🤖 AI Integration

The AI Insights Panel connects to the Anthropic Claude API and analyzes:

* High-risk student profiles
* Teacher workload patterns
* Group-level behavioral trends

It returns 5 structured insights with severity levels and concrete recommendations — automatically, on demand.

\---

## 📁 Project Structure

```
eduinsight-ai/
├── app/
│   └── page.js          # Main application (all modules)
├── public/
├── tailwind.config.js
└── package.json
```

\---

## 📊 Sample Data

The platform includes a realistic simulated dataset:

* **20 students** across 8 groups with varied risk profiles
* **8 teachers** with differentiated workloads
* **30 days** of incident history per group
* Logical internal patterns (Group 2B = critical, Mr. Park = burnout risk)

\---

## 🧩 Modules

|Module|Description|
|-|-|
|Dashboard|KPIs, alerts, and 30-day incident trend chart|
|Student Risk Analyzer|Filterable table with calculated risk scores|
|Teacher Burnout Monitor|Cards with workload index per teacher|
|Incident Tracker|Log with severity filters and type breakdown|
|AI Insights Panel|Claude-powered analysis and recommendations|

\---

## 👤 Author

Built by **Gabriel** — educator and hobbyist developer.

Designed as a portfolio project for EdTech, Product Management, and Instructional Design roles.

\---

## 📄 License

MIT — free to use, modify, and distribute.

