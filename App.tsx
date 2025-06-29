import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import CompanyDetail from './components/CompanyDetail';
import { InvestmentData } from './types';
import { db } from './firebaseConfig'; // Ensure this path is correct
import { collection, addDoc, getDocs, writeBatch, query, limit, where } from 'firebase/firestore';
import { PROJECT_ID } from './constant';

import { allInvestmentData } from './data/investmentData';
import { initializeApp } from "firebase/app";

const App: React.FC = () => {
  const [investments, setInvestments] = useState<InvestmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const investmentsCollectionRef = collection(db, 'investments');

    const seedDataToFirestore = async () => {
      try {
        console.log('Starting to seed data...');
        const batch = writeBatch(db);
        allInvestmentData.forEach(investment => {
          const docRef = collection(db, 'investments'); // This creates a reference within the collection
          // For addDoc, we'd call it directly, but for batch, we need a DocumentReference
          // Since Document ID is part of the data, we can use it if we want to set custom IDs.
          // However, addDoc generates IDs. Let's assume addDoc behavior for seeding if IDs aren't critical path.
          // For batching with auto-generated IDs, it's a bit more complex.
          // Easiest for seeding is individual addDoc if performance isn't an issue for 35 docs.
          // Let's use individual addDoc for simplicity for this one-time seed.
          // await addDoc(investmentsCollectionRef, investment);
          // Firestore's addDoc doesn't fit directly in writeBatch if you want Firestore to generate IDs.
          // If we want to use the "Document ID" from our objects:
          // const docRef = doc(db, "investments", investment["Document ID"]);
          // batch.set(docRef, investment);
          // For now, let's use multiple addDoc calls as it's simpler for seeding.
        });
        // await batch.commit(); // if using batch

        // Simpler: loop and addDoc
        for (const investment of allInvestmentData) {
          await addDoc(investmentsCollectionRef, investment);
        }
        console.log('Data seeded successfully!');
      } catch (e) {
        console.error("Error seeding data: ", e);
        // Don't set global error for seeding, as fetching might still work or data might exist
      }
    };

    const fetchInvestments = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch data filtered by PROJECT_ID
        const investmentsQuery = query(
          investmentsCollectionRef,
          where("projectId", "==", PROJECT_ID)
        );
        const dataSnapshot = await getDocs(investmentsQuery);
        const investmentsList = dataSnapshot.docs.map(doc => ({
          ...doc.data(),
        } as InvestmentData));
        
        console.log(`Fetched ${investmentsList.length} investments for project ID ${PROJECT_ID}`);
        setInvestments(investmentsList);
      } catch (e) {
        console.error("Error fetching investments: ", e);
        setError("Failed to fetch investment data. Please try again later.");
        if (e instanceof Error) {
            setError(`Failed to fetch investment data: ${e.message}. Please check your Firebase setup and security rules.`);
        } else {
            setError("An unknown error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div>
              <p className="ml-4 text-xl text-gray-700">Loading Investments for Project {PROJECT_ID}...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-md shadow-md" role="alert">
              <h3 className="font-bold text-xl mb-2">Error</h3>
              <p>{error}</p>
              <p className="mt-2 text-sm">Please ensure your Firebase configuration is correct and the Firestore database is accessible.</p>
            </div>
          )}
          {!loading && !error && (
            <Routes>
              <Route path="/" element={<Dashboard investments={investments} />} />
              <Route path="/company/:companyName" element={<CompanyDetail investments={investments} />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;