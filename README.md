# InvestorHub Dashboard

A dashboard to track and analyze startup investments, featuring top companies by total investment secured.

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

## Build for Production
```bash
npm run build
```

## License
MIT
