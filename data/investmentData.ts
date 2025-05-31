import { InvestmentData, InvestmentScore } from '../types';
import { getFirestore } from "firebase/firestore";

const companyNames = ["AI Control", "Blue Signal", "DolbomDream", "EMCT", "INNATURE", "Lasker", "WiPowerOne"];
const investorNames = ["1", "2", "3", "4", "5"];
const rationaleTagOptions = ["Founder Quality", "Market Size", "High Returns", "Disruptive Tech", "Social Impact", "Personal Interest", "Strategic Fit"];

const generateDocumentId = (): string => {
  return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
};

const generateScores = (): InvestmentScore => ({
  "Product/Technology Innovation": Math.floor(Math.random() * 10) + 1,
  "Team Strength & Experience": Math.floor(Math.random() * 10) + 1,
  "Go-to-Market Strategy": Math.floor(Math.random() * 10) + 1,
  "Personal Connection/Passion": Math.floor(Math.random() * 10) + 1,
  "Business Model Viability": Math.floor(Math.random() * 10) + 1,
  "Market Opportunity Size": Math.floor(Math.random() * 10) + 1,
  "Competitive Advantage": Math.floor(Math.random() * 10) + 1,
  "Scalability Potential": Math.floor(Math.random() * 10) + 1,
  "Risk Assessment": Math.floor(Math.random() * 10) + 1,
  "Financial Projections Realism": Math.floor(Math.random() * 10) + 1,
});

const generateTimestamp = (offsetMinutes: number): string => {
  const baseDate = new Date(Date.UTC(2025, 5, 2, 0, 0, 0)); // June 2, 2025
  baseDate.setUTCMinutes(baseDate.getUTCMinutes() + offsetMinutes);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: '2-digit', second: '2-digit',
    hour12: true, timeZone: 'UTC'
  };
  return new Intl.DateTimeFormat('en-US', options).format(baseDate).replace(',', ' at');
};

export const allInvestmentData: InvestmentData[] = [];
let timestampCounter = 0;

investorNames.forEach(investorName => {
  companyNames.forEach(companyName => {
    timestampCounter++; // Increment for unique timestamp
    allInvestmentData.push({
      "Document ID": generateDocumentId(),
      companyName,
      investorName,
      confidenceLevel: Math.floor(Math.random() * 10) + 1,
      customRationale: String(Math.floor(Math.random() * 10) + 1),
      investmentAmount: Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000,
      projectId: 1001,
      rationaleTags: [rationaleTagOptions[Math.floor(Math.random() * rationaleTagOptions.length)]],
      scores: generateScores(),
      submissionTimestamp: generateTimestamp(timestampCounter * 5) // Spread timestamps by 5 mins
    });
  });
});
