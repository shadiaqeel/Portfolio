# Products Brief

## 1. Shadi Akil — Personal Portfolio

**Type:** Static, bilingual (EN/AR) single-page web application
**Live URL:** https://shadiaqeel.github.io/Portfolio/
**Repository:** https://github.com/shadiaqeel/Portfolio

### Purpose
A self-promotion and recruiting surface for Shadi Akil, a Senior Full Stack .NET Developer and Acting Team Lead. The site consolidates resume, experience, skills, projects, and certifications into a single web experience, with a printable CV variant for offline distribution.

### Target Audience
- Recruiters and hiring managers screening senior .NET / full-stack candidates
- Engineering leaders evaluating team-lead candidates in Saudi Arabia / MENA
- Collaborators looking for open-source .NET contributors

### Core Capabilities
- **Bilingual content (English / Arabic)** with RTL support, driven by JSON content files in `data/`
- **Vue.js SPA** rendered from `index.html` (`js/app.js`)
- **Printable CV** at `cv-download.html` with dedicated stylesheet (`css/cv.css`)
- **Offline-ready** via service worker (`sw.js`) and `offline.html` fallback
- **PWA manifest** (`manifest.json`) for installability
- **Analytics** module (`js/analytics.js`) for Google Analytics tracking
- **SEO-ready** with `sitemap.xml` and `robots.txt`

### Tech Stack
HTML5, CSS3, Tailwind utility patterns, Vue.js, vanilla JavaScript, Prettier, live-server (dev).

### Content Architecture
All resume data is decoupled from markup as JSON in `data/`:
`profile.json`, `experience.json`, `projects.json`, `skills.json`, `education.json`, `certifications.json` — making content updates a data-only change.

### Success Signals
- Profile views badge on README
- Inbound recruiter contact via email / LinkedIn
- Successful PDF CV downloads

---

## 2. RiCH — Enterprise Communication Platform (Featured Project)

**Type:** Multi-tenant enterprise SaaS (operated by T2 — Business Research & Development)
**Live URL:** https://t2.sa/rich-en
**Role:** Senior Full Stack .NET Developer / Acting Team Lead

### Purpose
Centralize and orchestrate every outbound communication channel an enterprise uses — SMS, Voice, Fax, Email, and WhatsApp — into a single secure platform, with enterprise-grade encryption and confidentiality guarantees.

### Target Audience
- Government sector entities in Saudi Arabia
- Banking and financial institutions
- Large enterprises with high-volume, multi-channel customer messaging

### Market Position
| Metric | Value |
|---|---|
| Share of SMS traffic in KSA | **70%+** |
| Banking sector coverage | **95%** |
| Communication channels supported | **5+** |

Positioned as "the most powerful communication platform in Saudi Arabia."

### Core Capabilities
- Unified multi-channel messaging (SMS, Voice, Fax, Email, WhatsApp)
- Sophisticated encryption for confidentiality and regulatory compliance
- High-throughput delivery suitable for nationwide government and bank traffic
- Centralized campaign and audience management

### Tech Stack
- **Backend:** ASP.NET Core, Entity Framework, SignalR
- **Frontend:** Vue.js
- **Data:** SQL Server, Cassandra, Redis
- **Search:** Elasticsearch
- **Messaging:** RabbitMQ
- **Architecture:** Clean Architecture, microservices, distributed systems

### Differentiators
- Channel breadth in a single pane of glass
- Proven scale (majority share of KSA SMS volume)
- Trust posture suitable for government and banking workloads
