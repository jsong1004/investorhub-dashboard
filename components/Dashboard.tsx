import React from 'react';
import { InvestmentData } from '../types';
import TopCompaniesTable from './TopCompaniesTable';
import TopCompaniesByScoreTable from './TopCompaniesByScoreTable';
import { PROJECTS } from '../constant';

interface DashboardProps {
  investments: InvestmentData[];
}

const PitchDescription: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-xl mb-8">
      <h2 className="text-3xl font-bold mb-3"> {PROJECTS[0].name}</h2>
      <p className="text-indigo-100 leading-relaxed">
        {PROJECTS[0].description}
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
