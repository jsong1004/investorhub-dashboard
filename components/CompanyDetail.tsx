import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { InvestmentData, InvestmentScore } from '../types';

interface CompanyDetailProps {
  investments: InvestmentData[];
}

interface ScoreMetrics {
  average: number;
  rank: number;
  totalCompanies: number;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ investments }) => {
  const { companyName } = useParams<{ companyName: string }>();
  
  if (!companyName) {
    return <div>Company not found</div>;
  }

  const companyInvestments = investments.filter(inv => inv.companyName === companyName);
  
  if (companyInvestments.length === 0) {
    return <div>No investment data found for {companyName}</div>;
  }

  // Calculate average scores across all criteria
  const scoreCategories = Object.keys(companyInvestments[0].scores) as (keyof InvestmentScore)[];
  const averageScores: Record<keyof InvestmentScore, number> = {} as Record<keyof InvestmentScore, number>;
  
  scoreCategories.forEach(category => {
    const totalScore = companyInvestments.reduce((sum, inv) => sum + inv.scores[category], 0);
    averageScores[category] = totalScore / companyInvestments.length;
  });

  // Calculate rankings for each metric
  const allCompanies = Array.from(new Set(investments.map(inv => inv.companyName)));
  const companyRankings: Record<keyof InvestmentScore, ScoreMetrics> = {} as Record<keyof InvestmentScore, ScoreMetrics>;
  
  scoreCategories.forEach(category => {
    const companyAverages = allCompanies.map(company => {
      const companyInvs = investments.filter(inv => inv.companyName === company);
      const avgScore = companyInvs.reduce((sum, inv) => sum + inv.scores[category], 0) / companyInvs.length;
      return { company, avgScore };
    });
    
    companyAverages.sort((a, b) => b.avgScore - a.avgScore);
    const rank = companyAverages.findIndex(c => c.company === companyName) + 1;
    
    companyRankings[category] = {
      average: averageScores[category],
      rank,
      totalCompanies: allCompanies.length
    };
  });

  // Custom rationale distribution
  const rationaleDistribution: Record<string, number> = {};
  companyInvestments.forEach(inv => {
    inv.rationaleTags.forEach(tag => {
      rationaleDistribution[tag] = (rationaleDistribution[tag] || 0) + 1;
    });
  });

  const totalRationales = Object.values(rationaleDistribution).reduce((sum, count) => sum + count, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{companyName}</h1>
        <p className="text-gray-600">Investment Analysis & Investor Feedback</p>
      </div>

      {/* Investment Summary */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Investment Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              ${companyInvestments.reduce((sum, inv) => sum + inv.investmentAmount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Investment</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {companyInvestments.length}
            </div>
            <div className="text-sm text-gray-600">Investor Evaluations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {(companyInvestments.reduce((sum, inv) => sum + inv.confidenceLevel, 0) / companyInvestments.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Confidence Level</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Investor Feedback Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Average Scores Across All Criteria</h2>
          <div className="space-y-4">
            {scoreCategories.map(category => (
              <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-700">{category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600">
                    {averageScores[category].toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500">/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Rationale Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Investment Motivation Insights</h2>
          <div className="space-y-3">
            {Object.entries(rationaleDistribution)
              .sort(([,a], [,b]) => b - a)
              .map(([rationale, count]) => (
                <div key={rationale} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{rationale}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(count / totalRationales) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {count} ({Math.round((count / totalRationales) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Ranking Across Metrics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ranking Across Evaluation Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scoreCategories.map(category => {
            const metrics = companyRankings[category];
            const isTopThree = metrics.rank <= 3;
            
            return (
              <div key={category} className={`p-4 rounded-lg border-2 ${
                isTopThree ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className="font-semibold text-sm text-gray-800 mb-2">{category}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-2xl font-bold ${
                      isTopThree ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      #{metrics.rank}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      of {metrics.totalCompanies}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">
                      {metrics.average.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">avg score</div>
                  </div>
                </div>
                {isTopThree && (
                  <div className="mt-2">
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                      Top 3 Performance
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default CompanyDetail;