# Werah Frontend - Intelligent Job Platform

- The modern, responsive client interface for the Werah Job Ecosystem.

## 📖 Project Overview

- This frontend application serves as the user interface for the Werah Backend API. It is designed as a Single Page Application (SPA) that provides distinct, role-based experiences for Candidates and Recruiters.

### Key UX Goals:

- Zero-Latency Feel: Aggressive caching strategies ensure instant page loads.
- Role-Based Security: Dynamic routing protects Recruiter tools from Candidates.
- Seamless Application: One-click apply workflow via modal integration.

## 🚀 Key Features

### 🔐 Authentication & Security

- Custom Auth Flow: Integrated with the backend's JWT system, handling Access/Refresh token rotation transparently via Axios interceptors.
- Role-Based Access Control (RBAC):
- Public: Landing page, Job Search, Login/Register.
- Candidate: Profile management, "My Applications" history.
- Recruiter: Dashboard stats, "Post a Job" wizard, Applicant tracking.
- Secure Route Guards: Custom <ProtectedRoute> wrapper redirects unauthorized users instantly.

### 💼 Job Discovery (Public)

- Instant Search: Real-time search with debouncing (500ms) to prevent API spam.
- Infinite Scroll: Pagination logic implemented with useInfiniteQuery for browsing thousands of jobs smoothly.
- Smart Job Details: Checks local cache first for job details (initialData) to render instantly before fetching fresh data in the background.

### 👤 Candidate Experience

- One-Click Apply: If logged in, candidates can apply via a modal that summarizes their profile.
- External Redirects: Smartly detects scraped jobs and redirects users to the original company site (e.g., "Apply on LinkedIn").

### 🏢 Recruiter Experience

- Job Creation Wizard: Multi-step form built with Formik and Yup validation, including a custom tag input for skills.
- Applicant Dashboard: View candidates ranked by the backend's Match Score algorithm.

## 🛠️ Tech Stack

- Core: React 18, Vite.
- Styling: Tailwind CSS, Lucide React (Icons).

### State Management:

- Server State: TanStack Query (React Query) v5 - Handles caching, loading states, and deduplication.
- Client State: Zustand - Handles synchronous session data (User User, Token, Role).
- Forms: Formik + Yup.
- Routing: React Router v6 (Nested Routes & Layouts).

## 🏗️ Architecture

### Hybrid State Management

- I chose a hybrid approach to avoid the complexity of Redux while maintaining robustness.
- Zustand acts as the "Session Store." It persists the JWT token and User Role to localStorage. This allows the app to know who you are instantly on refresh.
- React Query acts as the "Data Store." It fetches business data (Jobs, Applications) and caches it. It automatically refetches data when it becomes stale or when the user refocuses the window.

### Component Structure

src/
├── components/ # Reusable UI (Buttons, Cards, Modals)
├── pages/ # Page views (JobDetails, PostJob, etc.)
├── store/ # Zustand stores (AuthStore)
├── utils.js # Constants & Helpers
└── App.jsx # Routing & Route Guards

## ⚡ Getting Started

### Prerequisites

Node.js 18+
The Werah Backend running locally or remotely.

1. Clone & Install
   git clone [https://github.com/](https://github.com/)[Pascal7601]/[werah].git
   cd [werah]
   npm install

2. Configure Environment
   Create a .env file in the root:
   API_BASE_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api) # Or your deployed backend URL

3. Run Development Server
   npm run dev

Open http://localhost:5173 to view the app. 4. Build for Production
npm run build
