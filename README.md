# 🎓 ShikshaSetu AI — Smart Rural Education Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Empowering rural education through AI-driven personalized learning, virtual STEM labs, multilingual support, offline-first access, and teacher management tools.**

---

## 🌟 Overview

**ShikshaSetu AI** (Smart Rural Education Platform) is designed to bridge the digital and educational divide in rural and remote communities. It addresses key challenges like limited internet connectivity, shortage of specialized teachers, lack of physical science laboratories, and language barriers by providing a lightweight, high-performance, and accessible digital learning ecosystem.

---

## 🚀 Key Features

### 1. 🤖 24/7 AI Personal Tutor (`/tutor`)
- **Multilingual Support**: Supports English, Hindi, Marathi, Telugu, Tamil, and more regional languages.
- **Concept Explanations**: Step-by-step breakdown of complex topics with intuitive real-world examples.
- **Interactive Practice & Quiz Generation**: Real-time evaluation and adaptive difficulty.
- **Voice & Text Interactions**: Accessible for students of all literacy levels.

### 2. 📚 Offline-Ready Modular Courses (`/courses`)
- **Class 6th to 12th & Vocational Tracks**: Mathematics, Science, Social Studies, English, and Digital Literacy.
- **Bandwidth Optimization**: Low-data consumption mode and one-click offline packet download.
- **Progress Tracking**: Automatic sync when connectivity is restored.

### 3. 🔬 Virtual Interactive STEM Labs (`/labs`)
- **No Physical Equipment Needed**: Conduct hands-on science experiments directly in the browser.
- **Simulations Include**:
  - *Physics*: Simple Harmonic Motion, Electrical Circuit Builder, Optics & Refraction.
  - *Chemistry*: Acid-Base Titration, Chemical Reaction Visualizer, Periodic Trends.
  - *Biology*: 3D Cell Explorer, Photosynthesis Simulation, Human Anatomy.

### 4. 🧭 Rural Career Guidance & Vocational Hub (`/careers`)
- **Career Pathways Explorer**: Guidance on Agriculture Tech, Healthcare, Digital Freelancing, Defense, and Government Exams.
- **Scholarship & Scheme Finder**: Direct links and eligibility checks for rural student scholarships.
- **Aptitude & Skill Assessment**: AI-driven questionnaire recommending tailored career paths.

### 5. 👨‍🏫 Teacher & School Administration Portal (`/teacher`)
- **Smart Classroom Analytics**: Track attendance, student strengths, and subject-wise difficulty areas.
- **AI Lesson Planner**: Automatically generate localized teaching material, worksheets, and tests.
- **Offline Attendance & Grading**: Sync records whenever school internet is available.

### 6. 🔐 Role-Based Authentication & Profiles (`/login`, `/register`)
- Distinct workspaces for **Students**, **Teachers**, and **Community Mentors**.
- Secure, lightweight session management.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16 (Turbopack, App Router)](https://nextjs.org/)
- **Frontend Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 📂 Project Structure

```bash
Smart-Rural-Education-Platform/
├── package.json         # Project dependencies & scripts
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
├── .gitignore           # Git ignore rules
├── README.md            # Comprehensive project documentation
├── public/              # Static assets, icons, and logos
└── src/
    ├── app/             # App Router Pages
    │   ├── layout.tsx   # Root layout & meta configuration
    │   ├── page.tsx     # Modern interactive landing page
    │   ├── login/       # User sign-in page
    │   ├── register/    # New account registration
    │   ├── tutor/       # AI Multilingual Tutor workspace
    │   ├── courses/     # Interactive course catalog & reader
    │   ├── labs/        # Virtual STEM lab simulations
    │   ├── careers/     # Vocational guidance & scholarships
    │   └── teacher/     # Teacher dashboard & classroom management
    ├── components/      # Reusable UI components
    │   ├── auth/        # Protected routes & auth guards
    │   ├── landing/     # Hero, features, statistics, CTA
    │   ├── layout/      # Universal Header, Navigation, Footer
    │   └── ui/          # Accessible buttons, cards, dialogs, dropdowns
    └── lib/             # Data stores, state management & utilities
        ├── auth-store.ts# Authentication state (Zustand)
        └── data-store.ts# Course data, lab simulations & mock DB
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm**, **yarn**, or **pnpm**

### Step-by-Step Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Krishna8208863439/Smart-Rural-Education-Platform.git
   cd Smart-Rural-Education-Platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit **[http://localhost:3000](http://localhost:3000)** to explore the platform.

---

## 📱 Responsive & Low-Bandwidth Design

- **Optimized for Mobile Devices**: Fully responsive layouts tailored for budget smartphones and tablets commonly used in rural households.
- **Lightweight Assets**: Minimal bundle size ensuring rapid load times even on 2G/3G networks.
- **High Contrast & Accessible UI**: Clean typography and intuitive icons for users with varying digital literacy.

---

## 🤝 Contributing

Contributions make the open-source community a wonderful place to learn, inspire, and create:
1. **Fork** the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ to bridge the education gap in rural communities.
</p>
