# InvestorHub Dashboard

A comprehensive dashboard for tracking and analyzing startup investments and pitch competitions.

## Features

### Investment Based Rankings
- **Top Companies by Total Investment Secured**: Displays the top 3 companies based on total investment amounts secured
- **Top Companies by Average Investment Score**: Shows the top 3 companies based on their average investment scores across all criteria

### User Picked Rankings
- **Top Companies by Most Investable Startup**: Lists the top 3 companies voted as most investable by users
- **Top Companies by Inspiring Pitch**: Shows the top 3 companies with the most inspiring pitches based on user votes

### Company Details
- Detailed company profiles with:
  - Investment summary
  - Average scores across evaluation criteria
  - Radar chart visualization of scores
  - Investment motivation insights
  - Rankings across different metrics

## Technology Stack

- React 19 with TypeScript
- Firebase Firestore for data persistence
- Chart.js with react-chartjs-2 for data visualization
- React Router for navigation
- Tailwind CSS for styling

## Data Structure

### Investment Records
- 10 scoring categories (1-10 scale):
  - Problem and Solution
  - Market Opportunity
  - Team
  - Business Model & Traction
  - Competitive Advantage
  - Financials & Ask
  - Presentation & Storytelling
  - Innovation and Industry/Social Impact
- Investment amounts
- Confidence levels
- Custom rationale text
- Predefined rationale tags
- Investor and company identification
- Submission timestamps

### Vote Records
- Company votes from Startup World Cup Seattle Regional
- Most investable startup votes
- Inspiring pitch votes

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase configuration in `firebaseConfig.ts`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `components/`: React components
  - `Dashboard.tsx`: Main dashboard layout
  - `TopCompaniesTable.tsx`: Investment-based rankings
  - `TopCompaniesByScoreTable.tsx`: Score-based rankings
  - `TopCompaniesByMostInspiringPitch.tsx`: Most investable rankings
  - `TopCompaniesByInspiringPitch.tsx`: Inspiring pitch rankings
  - `CompanyDetail.tsx`: Detailed company view
- `types.ts`: TypeScript interfaces
- `constant.ts`: Configuration constants
- `firebaseConfig.ts`: Firebase initialization

## Firebase Integration

- Uses custom Firestore database named "investorhub"
- Collections:
  - Investment records
  - Startup World Cup Seattle Regional votes
- Auto-seeds mock data if collections are empty
- Comprehensive error handling for Firebase operations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Run Locally

**Prerequisites:**
- Node.js (v18+ recommended)
- npm
- A Firebase project with Firestore enabled

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd investorhub-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the project root and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Configure Firebase
- Update `firebaseConfig.ts` with your Firebase project credentials.
- Make sure Firestore is enabled in your Firebase console.
- If using a secondary Firestore database, ensure the database ID is set in `firebaseConfig.ts`.

### 5. Security
- Sensitive files like `.env.local` and `serviceAccountKey.json` are included in `.gitignore` and should **not** be committed to version control.
- For development, you may use open Firestore rules, but restrict them before deploying to production.

### 6. Run the app
```bash
npm run dev
```
Visit the local URL shown in your terminal (usually http://localhost:5173).

## Investment Scoring Categories

The dashboard uses the following investment scoring categories (as shown in the radar chart):

- Business Model & Traction
- Competitive Advantage
- Financials & Ask
- Innovation and Industry/Social Impact *(normalized: divided by 3 for chart display)*
- Market Opportunity
- Presentation & Storytelling
- Problem and Solution
- Team

These categories are used for both data entry and visualization. The radar chart automatically wraps long labels for clarity.

## Build for Production
```bash
npm run build
```

## License
MIT
