export interface InvestmentScore {
  "Product/Technology Innovation": number;
  "Team Strength & Experience": number;
  "Go-to-Market Strategy": number;
  "Personal Connection/Passion": number;
  "Business Model Viability": number;
  "Market Opportunity Size": number;
  "Competitive Advantage": number;
  "Scalability Potential": number;
  "Risk Assessment": number;
  "Financial Projections Realism": number;
}

export interface InvestmentData {
  "Document ID": string;
  companyName: string;
  confidenceLevel: number;
  customRationale: string;
  investmentAmount: number;
  investorName: string;
  projectId: number;
  rationaleTags: string[];
  scores: InvestmentScore;
  submissionTimestamp: string; 
}

export interface CompanyInvestmentSummary {
  rank: number;
  companyName: string;
  totalInvestment: number;
}