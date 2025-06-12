
export const SCORING_CATEGORIES: string[] = [
  'Problem and Solution',
  'Market Opportunity',
  'Team',
  'Business Model & Traction',
  'Competitive Advantage',
  'Financials & Ask',
  'Presentation & Storytelling',
  'Innovation and Industry/Social Impact',
];

export const SCORING_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Problem and Solution': 'How clearly and compellingly is the problem defined? Is it a significant pain point for a large enough target audience? How innovative, effective, and unique is the proposed solution? Does it offer a clear value proposition that differentiates it from existing alternatives?',
  'Market Opportunity': 'What is the size and growth potential of the target market? Is there a clear customer need and demand for the product/service? How well does the team understand the market dynamics and trends?',
  'Team': 'Does the founding team possess the necessary skills, experience, and expertise to execute the business plan? Is there a strong, complementary team with a clear division of responsibilities? Do they demonstrate passion, commitment, and the ability to adapt?',
  'Business Model & Traction': 'How will the startup generate revenue and achieve profitability? Is the revenue model clear, sustainable, and scalable? What traction has the startup already achieved (e.g., customers, users, sales, partnerships, product development milestones)?',
  'Competitive Advantage': 'Who are the competitors, and how does the startup differentiate itself? What are the sustainable competitive advantages (e.g., proprietary technology, unique intellectual property, strong brand, network effects, cost advantage)?',
  'Financials & Ask': 'Are the financial projections realistic and well-supported? What is the funding ask, and how will the funds be used? Is there a clear roadmap for achieving milestones with the requested investment? Does the startup have a clear path to significant returns for investors?',
  'Presentation & Storytelling': 'Is the pitch clear, concise, and engaging? Does it tell a compelling story? Are the visuals professional and easy to understand? Does the presenter exude confidence, enthusiasm, and credibility? Can they effectively answer questions and address concerns?',
  'Innovation and Industry/Social Impact': 'How innovative is the solution in terms of technology, business model, or approach? What is the potential industry or social impact of the solution? How does it contribute to solving broader societal or environmental challenges?',
};

export const PREDEFINED_RATIONALE_TAGS: string[] = [
  'Founder Quality',
  'Market Size',
  'High Returns',
  'Disruptive Tech',
  'Social Impact',
  'Personal Interest',
  'Strategic Fit',
];

export const MAX_INVESTMENT_AMOUNT: number = 1000000;
export const MIN_RATING: number = 0;
export const MAX_RATING: number = 10;

export const PROJECTS = [
  {
    id: 1001,
    name: 'The Startup World Cup Seattle Regional',
    description: `The event brings together the brightest entrepreneurs, investors, and industry leaders to witness Seattle’s top startups compete for a chance to represent the region at the global Startup World Cup finals and win a $1 million investment prize.`
  }
];
