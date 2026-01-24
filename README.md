# Bridge to STEM (Gen-Connect)

Bridge to STEM is a marketing site for the Gen-Connect initiative, showcasing a STEM mentorship platform that connects corporates, schools, mentors, and students. The site highlights the mission, impact metrics, and program details while capturing interest through dedicated audience landing pages and application/intake forms.

## ✨ Key Features

- **Multi-audience landing experiences** for corporates, schools, mentors, and students.
- **Storytelling sections** (impact stats, “how it works,” student stories, program comparisons) to communicate outcomes.
- **Client-side forms with validation** using `zod` and `react-hook-form` patterns.
- **Responsive layout** with Tailwind CSS and shadcn/ui components.
- **Accessible UI primitives** from Radix UI and icons from Lucide.

## 🧭 Routes

| Route | Description |
| --- | --- |
| `/` | Main marketing landing page with hero, audience selection, impact, and CTA sections. |
| `/for-corporates` | Corporate-focused pitch, benefits, and pilot request form. |
| `/for-schools` | School partnership information and inquiry sections. |
| `/for-mentors` | Mentor journey, benefits, FAQs, and application flow. |
| `/for-students` | Student opportunity, journey overview, stories, and application form. |
| `*` | Not found page. |

## 🛠 Tech Stack

- **React 18 + TypeScript** for UI development.
- **Vite** for fast local development and builds.
- **React Router** for multi-page navigation.
- **Tailwind CSS** and **shadcn/ui** for styling and design system components.
- **Radix UI** primitives and **Lucide** icons.
- **TanStack React Query** for client data utilities.
- **Vitest** for unit testing.

## 📂 Project Structure

```
src/
  components/         # Reusable UI sections and shadcn/ui components
  hooks/              # Custom hooks (e.g., toast helpers)
  lib/                # Utility helpers
  pages/              # Route-level page compositions
  assets/             # Images and static assets
```

## ✅ Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm (or compatible package manager)

### Install & Run

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## 🔍 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run build:dev` | Build using the development mode. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the codebase. |
| `npm run test` | Run the Vitest test suite once. |
| `npm run test:watch` | Watch tests with Vitest. |

## 🧾 Notes on Forms

Forms in the marketing flows (corporate pilot request, mentor/student applications, etc.) currently validate inputs client-side. If you plan to persist submissions, wire them to an API endpoint or a form service and update the submit handlers accordingly.

## 📦 Deployment

This is a standard Vite project. Any static hosting provider (Netlify, Vercel, S3, etc.) can serve the `dist/` output created by `npm run build`.
