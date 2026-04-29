# Vizag International School — Smart Management System

A modern, full-stack school management platform built for Vizag International School, Visakhapatnam.

## Features

- **Public Website** — Home, About, Admissions, Gallery, Contact pages with animations
- **Parent Dashboard** — Attendance, marks, announcements, and progress tracking
- **Teacher Dashboard** — Class schedules, student management, performance analytics
- **Admin Dashboard** — School-wide analytics, staff, admissions, fee tracking, CSV reports
- **Role-based Authentication** — Secure login with automatic dashboard redirect
- **SEO Ready** — Full metadata, OpenGraph, sitemap, and robots.txt
- **Responsive** — Mobile-first design that works on all screen sizes

## Demo Credentials

| Role    | Email                    | Password   |
|---------|--------------------------|------------|
| Parent  | parent@vizag.edu         | parent123  |
| Teacher | teacher@vizag.edu        | teacher123 |
| Admin   | admin@vizag.edu          | admin123   |

## Tech Stack

| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| Framework    | Next.js 16 (App Router), React 19, TypeScript 5 |
| Styling      | Tailwind CSS v4, Framer Motion                  |
| Auth         | NextAuth.js v4                                  |
| Charts       | Recharts                                        |
| Forms        | React Hook Form                                 |
| Icons        | Lucide React                                    |
| Fonts        | Playfair Display, DM Sans (Google Fonts)        |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Then fill in your values in .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_SCHOOL_NAME=Vizag International School
NEXT_PUBLIC_SCHOOL_EMAIL=info@vizaginternational.edu.in
NEXT_PUBLIC_SCHOOL_PHONE=+91 891 234 5678
```

## Project Structure

```
app/
├── (public pages)  about/ admissions/ gallery/ contact/
├── dashboard/
│   ├── admin/      Full admin suite with reports
│   ├── teacher/    Class and student management
│   └── parent/     Child progress tracking
├── api/auth/       NextAuth route handler
├── layout.tsx      Root layout with SEO metadata
├── loading.tsx     Global loading state
├── not-found.tsx   404 page
├── error.tsx       Error boundary
├── sitemap.ts      Auto-generated sitemap
└── robots.ts       Robots.txt

components/
├── public/         Navbar, Hero, Footer, etc.
└── ui/             Toast, ScrollToTop, PageTransition
```

## Deployment (Vercel)

```bash
# Build for production
npm run build

# Preview production build locally
npm run start
```

Deploy to Vercel by connecting the GitHub repository. Set the environment variables in the Vercel dashboard. The `vercel.json` is pre-configured for the **sin1 (Singapore)** region, closest to India.

## School Info

**Vizag International School**
NH-16, Bheemunipatnam, Visakhapatnam – 531 163, Andhra Pradesh
Phone: +91 891 234 5678 | Email: info@vizaginternational.edu.in
