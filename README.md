<div align="center">

# 🧬 ZooLearn

**A modern biology learning platform that makes biological sciences easier to understand through interactive learning experiences.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#-license)

[Live Website](https://zoolearn.in) · [Report Bug](https://github.com/ZooLearnAcademy/zoolearn-platform/issues) · [Request Feature](https://github.com/ZooLearnAcademy/zoolearn-platform/issues)

</div>

---

## 📖 About the Project

ZooLearn is an open-source biology learning platform designed to bridge the gap between traditional textbook learning and modern interactive education. The platform provides structured courses covering biological sciences — from cell biology to ecology — with interactive 3D visualizations, quizzes, and progress tracking to help students learn at their own pace.

Built with Next.js and backed by Supabase, ZooLearn delivers a fast, responsive experience across all devices.

---

## ✨ Features

- **Structured Courses** — Organized biology curriculum with progressive difficulty levels
- **Interactive 3D Visualizations** — Explore biological structures and processes in 3D
- **Quizzes & Assessments** — Test understanding with topic-specific quizzes
- **Progress Tracking** — Track learning progress across courses and topics
- **Responsive Design** — Seamless experience on desktop, tablet, and mobile
- **User Authentication** — Secure sign-up and login via Supabase Auth
- **Search & Discovery** — Find topics and courses quickly
- **Bookmarks & Notes** — Save important topics for later review

---

## 🛠️ Technology Stack

| Layer         | Technology                     |
| ------------- | ------------------------------ |
| Frontend      | Next.js (App Router)           |
| Language      | TypeScript                     |
| Styling       | Tailwind CSS                   |
| Backend       | Supabase                       |
| Database      | PostgreSQL                     |
| Image Storage | Cloudinary                     |
| Deployment    | AWS                            |
| Version Control | Git & GitHub                 |

---

## 📁 Project Folder Structure

```
zoolearn-platform/
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable UI components
├── lib/                # Shared libraries and configurations
├── services/           # API service layers and data fetching
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
├── public/             # Static assets (images, icons, fonts)
├── styles/             # Global styles and Tailwind config
├── supabase/           # Supabase migrations and seed data
├── docs/               # Project documentation
├── tests/              # Unit and integration tests
├── .github/            # GitHub Actions workflows and templates
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

---

## 🏗️ System Architecture

```
                    ┌─────────────┐
                    │    Users    │
                    │  (Browser)  │
                    └──────┬──────┘
                           │
                           ▼
                ┌──────────────────────┐
                │  Next.js Frontend    │
                │  (App Router + SSR)  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │  Supabase Backend    │
                │                      │
                │  ├── PostgreSQL DB   │
                │  ├── Authentication  │
                │  └── Edge Functions  │
                └──────────┬───────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
          ┌──────────────┐  ┌──────────┐
          │  Cloudinary  │  │   AWS    │
          │  (Images)    │  │ Hosting  │
          └──────────────┘  └──────────┘
```

---

## 🚀 Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (optional, for local development)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/ZooLearnAcademy/zoolearn-platform.git
   cd zoolearn-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required values (see [Environment Variables](#-environment-variables) below).

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note:** Never commit `.env.local` to version control. The `.env.example` file is provided as a template.

---

## 💻 Running the Project

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Run tests
npm run test
```

---

## 📚 Documentation Structure

```
docs/
├── architecture.md       # System architecture overview
├── api-reference.md      # API endpoints and usage
├── database-schema.md    # PostgreSQL schema documentation
├── deployment.md         # Deployment guide for AWS
├── contributing.md       # Detailed contributing guidelines
└── style-guide.md        # Code style and conventions
```

---

## 🗺️ Development Roadmap

- [x] Project scaffolding and initial setup
- [x] Supabase integration and authentication
- [x] Core course pages and content structure
- [ ] Interactive 3D visualizations for biology topics
- [ ] Quiz engine with scoring and feedback
- [ ] User dashboard with progress tracking
- [ ] Bookmark and note-taking functionality
- [ ] Search with filtering and autocomplete
- [ ] Admin panel for content management
- [ ] PWA support for offline access
- [ ] Multi-language support

---

## 🤝 Contributing Guidelines

Contributions are welcome and appreciated. To contribute:

1. **Fork** the repository
2. **Create** a feature branch

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit** your changes with clear messages

   ```bash
   git commit -m "feat: add quiz scoring logic"
   ```

4. **Push** to your fork

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open** a Pull Request against the `main` branch

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix     | Usage                          |
| ---------- | ------------------------------ |
| `feat:`    | New feature                    |
| `fix:`     | Bug fix                        |
| `docs:`    | Documentation changes          |
| `style:`   | Formatting, no logic change    |
| `refactor:`| Code restructuring             |
| `test:`    | Adding or updating tests       |
| `chore:`   | Build process or tooling       |

### Code Standards

- Write TypeScript with strict mode enabled
- Follow the existing code style and project structure
- Add tests for new features where applicable
- Ensure `npm run lint` passes before submitting

---

## 📄 License

This project is **proprietary** and owned by **ZooLearn Academy**. All rights reserved.

Unauthorized copying, distribution, modification, or use of this codebase — in whole or in part — is strictly prohibited without prior written permission from the ZooLearn Academy team.

---

## 👥 Development Team

Built and maintained by the **ZooLearn Academy** team.

- GitHub: [@ZooLearnAcademy](https://github.com/ZooLearnAcademy)

---

## 🌐 Official Website

**[https://zoolearn.in](https://zoolearn.in)**

---

<div align="center">

Made with ❤️ for biology learners everywhere

</div>
