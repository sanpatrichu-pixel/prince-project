# prince-cos106-portfolio

## COS 106: Introduction to Web Technologies &mdash; Practical Term Project (20 Marks)
### Project Title: Responsive Student Academic Portfolio & Academic Workload Management Architecture

**Student Information:**
- **Full Name:** PRINCE DANIEL
- **Matriculation Number:** 2025/C/CYB/1333
- **Student ID:** 301897306
- **Department:** Department of Cybersecurity
- **Faculty:** School of Computing and Applied Sciences
- **Institution:** MIVA Open University, Abuja, Nigeria
- **Email:** `p.daniel7306@miva.edu.ng`
- **Phone:** `+234 811 676 1295`
- **Assessment Target:** 20 / 20 Marks

---

## 🌟 Project Overview
This project is an accessible, multi-page responsive academic portfolio and interactive student task management platform engineered using pure **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. The design features a bespoke **Royal Navy Blue** theme (`#071324`, `#1D4ED8`, `#38BDF8`) reflecting modern software craftsmanship across web technologies and cross-platform mobile application development (Flutter/Dart).

---

## 📂 Multi-Page Architecture

1. **Homepage (`index.html`)**:
   - Asymmetric layout with the official student portrait card (`portrait.jpg`) positioned on the **LEFT SIDE**.
   - Executive welcome narrative and focus on mobile systems and security.
   - Sticky navigation bar with custom SVG University Crest (`[M] MIVA SCHOLAR`) and Dark/Light theme toggle.
   - 4 Academic KPI metric highlights: 4.80/5.00 GPA target, 8 Enrolled Courses, 100 Level standing, and 4 Active Projects.
   - Featured projects showcase cards (UniRide, DevPulse, EduTrack).

2. **About Me Page (`about.html`)**:
   - Educational trajectory and cybersecurity aspirations at MIVA Open University.
   - **Semantic Coursework `<table>`** listing all 8 registered 100-Level courses (CSC 106 / COS 106, COS 102, MIVA-COS 111, MTH 102, PHY 102, PHY 108, GST 112, GST 122) totaling 19 credit units with zero green badges (strictly royal navy/ice cyan).
   - 3-Phase Career Aspirations Roadmap (Mobile & Web Foundations, Secure Full-Stack Engineering, Senior App Security Architect).
   - Animated technical skill progress bars (Flutter, Dart, HTML5/CSS3, JavaScript, Network Security).
   - Extracurricular hobbies (UI/UX Prototyping in Figma, Basketball, Tactical Chess).
   - **Multimedia Requirement:** Embedded HTML5 `<audio controls>` voice introduction and `<video controls>` platform walkthrough.

3. **Projects Page (`projects.html`)**:
   - 4 Original software engineering and security applications:
     1. *UniRide — Campus Shuttle & Route Tracker* (Cross-platform Flutter & Dart transit mobile app)
     2. *DevPulse — Student Developer Community Forum* (Semantic HTML5, CSS Grid, Vanilla JS code sharing)
     3. *EduTrack — Semester Milestone & Task Planner* (Client-side CRUD & LocalStorage task scheduler)
     4. *KeyVault — Password Entropy & Hash Auditing Lab* (Web Crypto API SHA-256 client-side audit)
   - Dynamic category filter buttons (*All*, *Mobile Apps*, *Web Platforms*, *Security Labs*).
   - Interactive project demonstration sandbox modal.

4. **Academic Planner Page (`planner.html`)**:
   - Interactive task management system in vanilla JavaScript (`js/planner.js`).
   - Dynamic Add Milestone form (Title, Course dropdown, Target Due Date, Urgency Tier).
   - Mark tasks completed with dynamic strike-through styling.
   - Delete task with confirmation prompt.
   - Status filters (*All*, *Pending*, *Completed*).
   - Real-time task metrics (Total Scheduled, Completed Tasks, Pending Deadlines, and Dynamic Velocity Progress Bar).
   - Synchronous `localStorage['edutrack_prince_2025']` state persistence surviving page reloads and browser restarts.

5. **Contact Page (`contact.html`)**:
   - Institutional communication channels card (MIVA Abuja FCT, Student Email, Direct Phone Line).
   - Form with Full Name, Email Address, Phone Number, and Message.
   - **Strict Client-side JavaScript Validation (`js/contact.js`):**
     - Checks that no field is empty.
     - Validates email format using standard RFC regular expression.
     - Strictly enforces that phone numbers contain **only digits** (`/^[0-9]+$/`).
   - Animated submission confirmation dialog modal.

6. **Assessment PDF Report (`report.html`)**:
   - Ready-to-print academic submission document formatted for A4 PDF export.
   - Executive technical dossier header, compliance matrix, architecture, verified source code listings, and signed academic integrity declaration.

---

## 🚀 How to Run Locally
1. Open the project folder `prince cos 106` in any modern web browser or code editor.
2. Double-click `index.html` to open directly.
3. No build tools or npm installations are required &mdash; everything runs natively!

---

## ⚡ How to Deploy on Render (Free Static Site)
1. Push this repository to a new repository on your GitHub account (e.g. `prince-daniel-portfolio`).
2. Log in to [dashboard.render.com](https://dashboard.render.com/).
3. Click **New +** &rarr; select **Static Site**.
4. Connect your new GitHub repository.
5. Set Build Command: *(leave blank)*.
6. Set Publish Directory: `.` *(or leave blank)*.
7. Click **Create Static Site** to get your live SSL URL.
