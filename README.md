# prince-cos106-portfolio

## COS 106: Introduction to Web Technologies &mdash; Practical Term Project (20 Marks)
### Project Title: Responsive Student Academic Portfolio & Management Platform

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
This project is an accessible, multi-page responsive academic portfolio and interactive student task management platform engineered using pure **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. The design features a professional **Royal Navy Blue** theme (`#0A192F`, `#1E3A8A`, `#38BDF8`) reflecting modern software craftsmanship across web technologies and cross-platform mobile application development.

---

## 📂 Multi-Page Architecture

1. **Homepage (`index.html`)**:
   - Left-aligned official portrait card (`portrait.jpg`) and student metadata.
   - Welcoming introduction and focus on secure interfaces and mobile experiences.
   - Sticky navigation bar with Dark/Light theme switcher.
   - Academic KPI highlights: Target GPA 4.80/5.00, Enrolled Load (8 courses), 100 Level standing.
   - Featured projects teaser cards and quick links.

2. **About Me Page (`about.html`)**:
   - Educational background at MIVA Open University.
   - **Semantic Coursework `<table>`** listing all 8 registered 100-Level courses (COS 106 / CSC 106, COS 102, MIVA-COS 111, MTH 102, PHY 102, PHY 108, GST 112, GST 122) totaling 19 credit units.
   - 3-Phase Career Aspirations Roadmap (Mobile/Web Foundations, Secure Full-Stack Engineering, Senior App Security Architect).
   - Animated technical skill progress bars.
   - Extracurricular hobbies (UI/UX Prototyping in Figma, Basketball, Tactical Chess).
   - **Multimedia Requirement:** Embedded HTML5 `<audio controls>` voice introduction and `<video controls>` platform walkthrough.

3. **Projects Page (`projects.html`)**:
   - 4 Applied software and security systems:
     1. *ApexPay Mobile Wallet & Airtime Hub* (Flutter & Dart cross-platform mobile fintech app)
     2. *CampusConnect Event & Ticket Hub* (Semantic HTML5, CSS Grid, Vanilla JS)
     3. *MIVA Scholar Task Planner* (Dynamic JavaScript task management)
     4. *AuthShield Password Security & Input Validator* (Client-side regex auditing & entropy calculation)
   - Dynamic category filter buttons (*All*, *Mobile Apps*, *Web Engineering*, *Security & Auth*).
   - Interactive project demonstration modal.

4. **Academic Planner Page (`planner.html`)**:
   - Interactive task management system in vanilla JavaScript.
   - Dynamic Add Task form (Title, Course dropdown, Target Due Date, Priority).
   - Mark tasks completed with dynamic strike-through styling.
   - Delete task with confirmation prompt.
   - Status filters (*All*, *Pending*, *Completed*).
   - Real-time task metrics (Total Scheduled, Completed, Pending Deadlines, and Dynamic Progress Bar).
   - `localStorage` persistence keeping tasks saved across browser sessions.

5. **Contact Page (`contact.html`)**:
   - Student contact channels card (Abuja FCT, Student Email, Direct Phone, Office Hours).
   - Form with Full Name, Email Address, Phone Number, and Message.
   - **Strict Client-side JavaScript Validation:**
     - Checks that no field is empty.
     - Validates email format using standard RFC regular expression.
     - Strictly enforces that phone numbers contain **only digits** (`/^[0-9]+$/`).
   - Animated submission confirmation modal.

6. **Assessment PDF Report (`report.html`)**:
   - Ready-to-print academic submission document formatted for A4 PDF export.
   - Contains student metadata, compliance matrix, architecture, and code listings.

---

## 🚀 How to Run Locally
1. Open the project folder `prince cos 106` in any browser or code editor.
2. Double-click `index.html` to open directly.
3. No build tools or installations are required—everything runs natively!

---

## ⚡ How to Deploy on Render (Free Static Site)
1. Log in to [dashboard.render.com](https://dashboard.render.com/).
2. Click **New +** &rarr; select **Static Site**.
3. Connect your GitHub repository.
4. Set Build Command: *(leave blank)*.
5. Set Publish Directory: `.` *(or leave blank)*.
6. Click **Create Static Site** to get your free live SSL URL.
