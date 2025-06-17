import React from 'react';
import { InvestmentData } from '../types';
import TopCompaniesTable from './TopCompaniesTable';
import TopCompaniesByScoreTable from './TopCompaniesByScoreTable';
import TopCompaniesByMostInspiringPitch from './TopCompaniesByMostInspiringPitch';
import TopCompaniesByInspiringPitch from './TopCompaniesByInspiringPitch';
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Investment Based Rankings */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Investment Based Rankings</h2>
          <TopCompaniesTable investments={investments} />
          <TopCompaniesByScoreTable investments={investments} />
        </div>

        {/* Right Column - User Picked Rankings */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Picked Rankings</h2>
          <TopCompaniesByMostInspiringPitch />
          <TopCompaniesByInspiringPitch />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
