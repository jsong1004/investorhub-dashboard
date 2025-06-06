import React from 'react';
import { InvestmentData } from '../types';
import TopCompaniesTable from './TopCompaniesTable';
import TopCompaniesByScoreTable from './TopCompaniesByScoreTable';

interface DashboardProps {
  investments: InvestmentData[];
}

const PitchDescription: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-xl mb-8">
      <h2 className="text-3xl font-bold mb-3">Daejeon Techno Park Startups Mock Pitch</h2>
      <p className="text-indigo-100 leading-relaxed">
      An interactive event where emerging startups present their innovative business ideas to a panel of investors, industry experts, and mentors.

The event offers founders the opportunity to practice their pitches, receive constructive feedback, and connect with potential partners and investors.

The Mock Pitch Day aims to help entrepreneurs refine their business models and enhance their investor readiness in a supportive, collaborative environment.

Daejeon Techno Park is a hub designed to foster science and technology-based entrepreneurship.
      </p>
    </div>
  );
};


const Dashboard: React.FC<DashboardProps> = ({ investments }) => {
  return (
    <div className="space-y-8">
      <PitchDescription />
      <TopCompaniesTable investments={investments} />
      <TopCompaniesByScoreTable investments={investments} />
      {/* Future sections like "Investment Entry" form would go here */}
    </div>
  );
};

export default Dashboard;
