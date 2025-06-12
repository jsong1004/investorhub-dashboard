import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { InvestmentData, InvestmentScore } from '../types';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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

  // Calculate average investment score (across all categories)
  const avgInvestmentScore =
    scoreCategories.length > 0
      ? (
          scoreCategories.reduce((sum, cat) => sum + (averageScores[cat] || 0), 0) / scoreCategories.length
        )
      : 0;

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

  // Mapping from score category keys to display labels
  const scoreCategoryLabels: Record<keyof InvestmentScore, string> = {
    "Innovation and Industry/Social Impact": "Innovation & Social Impact",
    "Team": "Team",
    "Presentation & Storytelling": "Presentation & Storytelling",
    "Business Model & Traction": "Business Model & Traction",
    "Market Opportunity": "Market Opportunity",
    "Competitive Advantage": "Competitive Advantage",
    "Financials & Ask": "Financials & Ask",
    "Problem and Solution": "Problem & Solution"
  };

  const radarLabels = scoreCategories.map(cat => scoreCategoryLabels[cat] || cat);
  const radarDataArray = scoreCategories.map(cat => 
    cat === "Innovation and Industry/Social Impact" 
      ? (averageScores[cat] || 0) / 3 
      : averageScores[cat] || 0
  );

  const radarData = {
    labels: radarLabels,
    datasets: [
      {
        label: 'Average Score',
        data: radarDataArray,
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(79, 70, 229, 1)',
      },
    ],
  };
  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: { stepSize: 2, color: '#64748b' },
        pointLabels: {
          color: '#334155',
          font: { size: 10 },
          padding: 40,
          callback: function(label: string) {
            if (!label) return '';
            // Split long labels into multiple lines for better display
            const words = label.split(' ');
            if (words.length <= 2) return label;
            
            // For labels with more than 2 words, split them
            const midPoint = Math.ceil(words.length / 2);
            const firstLine = words.slice(0, midPoint).join(' ');
            const secondLine = words.slice(midPoint).join(' ');
            return [firstLine, secondLine];
          }
        },
        grid: { color: '#e5e7eb' },
        angleLines: { color: '#e5e7eb' },
      },
    },
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
      }
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {avgInvestmentScore.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Investment Score</div>
          </div>
        </div>
      </div>

      {/* Average Scores and Investment Motivation - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Average Scores Across All Criteria */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Average Scores Across All Criteria</h2>
          <div className="flex justify-center">
            <div style={{ width: 400, height: 400 }}>
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </div>

        {/* Investment Motivation Insights */}
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
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ranking Across Evaluation Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scoreCategories.map(category => {
            const metrics = companyRankings[category];
            const isTopThree = metrics.rank <= 3;
            return (
              <div key={category} className={`p-4 rounded-lg border-2 ${isTopThree ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
                <h3 className="font-semibold text-sm text-gray-800 mb-2">{category}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-2xl font-bold ${isTopThree ? 'text-yellow-600' : 'text-gray-600'}`}>#{metrics.rank}</span>
                    <span className="text-sm text-gray-500 ml-1">of {metrics.totalCompanies}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">{metrics.average.toFixed(1)}</div>
                    <div className="text-xs text-gray-500">avg score</div>
                  </div>
                </div>
                {isTopThree && (
                  <div className="mt-2">
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Top 3 Performance</span>
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