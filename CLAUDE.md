# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

### Google Cloud Run
- `Dockerfile` - Multi-stage build with Node.js serve for SPA routing
- `cloudbuild.yaml` - Automated deployment via Cloud Build
- Uses port 8080 (Cloud Run default)
- Deploys to `us-central1` region with public access

## Environment Setup

Requires `GEMINI_API_KEY` in `.env.local` file for the application to function.

## Architecture Overview

This is a React + TypeScript investment dashboard for Daejeon Techno Park startup pitch events. The app displays investment data from multiple investors evaluating startups.

### Core Data Flow
- Investment data is stored in Firebase Firestore (database: "investorhub")
- App.tsx handles data seeding and fetching from Firestore
- Mock data is generated in `data/investmentData.ts` and seeded automatically if no data exists
- Dashboard displays aggregated investment summaries via TopCompaniesTable component

### Key Components
- **App.tsx**: Main app with Firebase integration, auto-seeding, and error handling
- **Dashboard.tsx**: Main dashboard layout with pitch event description
- **TopCompaniesTable.tsx**: Displays ranked companies by total investment
- **firebaseConfig.ts**: Firebase initialization with "investorhub" database connection

### Data Structure
Investment records contain company evaluations with:
- 10 scoring categories (1-10 scale)
- Investment amounts, confidence levels, rationale tags
- Investor and company identification
- Submission timestamps

### Firebase Integration
- Uses custom Firestore database named "investorhub"
- Auto-seeds mock data if collection is empty
- Firebase config is hardcoded for "startup-consulting" project