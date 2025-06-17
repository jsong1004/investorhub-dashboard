import React, { useEffect, useState } from 'react';
import { InvestmentData } from '../types';

interface CompanyScoreSummary {
  rank: number;
  companyName: string;
  averageScore: number;
}

interface TopCompaniesByScoreTableProps {
  investments: InvestmentData[];
}

const TopCompaniesByScoreTable: React.FC<TopCompaniesByScoreTableProps> = ({ investments }) => {
  const [rankedCompanies, setRankedCompanies] = useState<CompanyScoreSummary[]>([]);

  useEffect(() => {
    // Group investments by company
    const companyScores: { [key: string]: number[] } = {};
    investments.forEach(inv => {
      const totalScore = Object.values(inv.scores).reduce((sum, val) => sum + val, 0);
      if (!companyScores[inv.companyName]) {
        companyScores[inv.companyName] = [];
      }
      companyScores[inv.companyName].push(totalScore);
    });

    // Calculate average score for each company
    const companyAverages = Object.entries(companyScores).map(([companyName, scores]) => ({
      companyName,
      averageScore: scores.reduce((sum, val) => sum + val, 0) / scores.length,
    }));

    // Sort and rank
    companyAverages.sort((a, b) => b.averageScore - a.averageScore);
    const ranked = companyAverages
      .slice(0, 3) // Get only top 3
      .map((company, index) => ({
        ...company,
        rank: index + 1,
      }));

    setRankedCompanies(ranked);
  }, [investments]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
        <span role="img" aria-label="star" className="mr-2">⭐</span>
        Top 3 Average Investment Score
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Score (0-100)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rankedCompanies.length > 0 ? (
              rankedCompanies.map(company => (
                <tr key={company.companyName} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.rank}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{company.companyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                    {company.averageScore.toFixed(1)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                  No investment data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCompaniesByScoreTable; 