import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { NUM_DISPLAY } from '../constant';

interface VoteData {
  companyName: string;
  voteCount: number;
  rank: number;
}

const TopCompaniesByMostInspiringPitch: React.FC = () => {
  const [rankedCompanies, setRankedCompanies] = useState<VoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const votesRef = collection(db, 'Startup-World-Cup-Seattle-Regional-Votes');
        const querySnapshot = await getDocs(votesRef);
        
        // Count votes for each company based on most_investable field
        const voteCounts: { [key: string]: number } = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const companyName = data.most_investable; // Changed from companyName to most_investable
          if (companyName) { // Only count if most_investable field exists
            voteCounts[companyName] = (voteCounts[companyName] || 0) + 1;
          }
        });

        // Convert to array and sort by vote count
        const sortedCompanies = Object.entries(voteCounts)
          .map(([companyName, voteCount]) => ({ companyName, voteCount }))
          .sort((a, b) => b.voteCount - a.voteCount)
          .slice(0, NUM_DISPLAY)
          .map((company, index) => ({
            ...company,
            rank: index + 1
          }));

        setRankedCompanies(sortedCompanies);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch vote data');
        setLoading(false);
        console.error('Error fetching votes:', err);
      }
    };

    fetchVotes();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        <span role="img" aria-label="trophy" className="mr-2">🏆</span>
        Top {NUM_DISPLAY} Most Investable Companies
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Votes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rankedCompanies.length > 0 ? (
              rankedCompanies.map((company) => (
                <tr key={company.companyName} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {company.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Link 
                      to={`/company/${encodeURIComponent(company.companyName)}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      {company.companyName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                    {company.voteCount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                  No vote data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCompaniesByMostInspiringPitch; 