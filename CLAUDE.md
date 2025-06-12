# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npx tsc --noEmit` - Type check without emitting files

## Deployment

### Google Cloud Run
- `Dockerfile` - Multi-stage build with Node.js serve for SPA routing
- `cloudbuild.yaml` - Automated deployment via Cloud Build
- Uses port 8080 (Cloud Run default)
- Deploys to `us-central1` region with public access

## Environment Setup

Requires `GEMINI_API_KEY` in `.env.local` file for the application to function.

## Architecture Overview

This is a React + TypeScript investment dashboard for startup pitch events (currently configured for "The Startup World Cup Seattle Regional"). The app displays investment data from multiple investors evaluating startups across various scoring categories.

### Core Data Flow
- Investment data is stored in Firebase Firestore (database: "investorhub")
- App.tsx handles data seeding and fetching from Firestore
- Mock data is generated in `data/investmentData.ts` and seeded automatically if no data exists
- Dashboard displays two main tables: ranked companies by total investment and by average scores
- React Router handles navigation between dashboard and company detail views

### Key Components
- **App.tsx**: Main app with Firebase integration, auto-seeding, error handling, and routing
- **Dashboard.tsx**: Main dashboard layout with pitch event description and two summary tables
- **TopCompaniesTable.tsx**: Displays ranked companies by total investment secured
- **TopCompaniesByScoreTable.tsx**: Displays companies ranked by average investment scores with radar charts
- **CompanyDetail.tsx**: Individual company view with detailed investment breakdown
- **firebaseConfig.ts**: Firebase initialization with "investorhub" database connection

### Data Structure
Investment records (InvestmentData interface) contain:
- 10 scoring categories (1-10 scale): Product/Technology Innovation, Team Strength, Go-to-Market Strategy, etc.
- Investment amounts, confidence levels, custom rationale text
- Predefined rationale tags from constant.ts
- Investor and company identification
- Submission timestamps

### Key Configuration Files
- **constant.ts**: Contains scoring categories, descriptions, rationale tags, and project configuration
- **types.ts**: TypeScript interfaces for InvestmentData, InvestmentScore, and CompanyInvestmentSummary
- **firebaseConfig.ts**: Firebase project configuration (currently pointing to "myresume-457817" project)

### Firebase Integration
- Uses custom Firestore database named "investorhub" 
- Auto-seeds mock data for 7 companies × 5 investors = 35 investment records if collection is empty
- Firebase config points to "myresume-457817" project (not "startup-consulting" as mentioned in comments)
- Includes comprehensive error handling for Firebase initialization and data fetching

### Technology Stack
- React 19 with TypeScript and Vite
- Firebase Firestore for data persistence
- Chart.js with react-chartjs-2 for radar charts
- React Router for navigation
- Tailwind CSS for styling