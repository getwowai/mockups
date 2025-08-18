import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatSectionAI from './components/ChatSectionAI';
import { BottomNav } from './components/BottomNav';
import InsightDetail from './components/InsightDetail';
import './App.css';
import InsightsOverview from './components/InsightsOverview';
import AgentsPage from './components/AgentsPage';
import AgentDetail from './components/AgentDetail';
import MissionCenter from './components/MissionCenter';
import MissionPage from './components/MissionPage';
import WeeklyRecap from './components/WeeklyRecap';

import LessonsPage from './components/LessonsPage';
import AdminAnalytics from './components/AdminAnalytics';
import BrandAnalytics from './components/BrandAnalytics';
import FinancialDashboard from './components/FinancialDashboard';
import AuditPage from './components/AuditPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<ChatSectionAI />} />
            <Route path="/insights" element={<InsightsOverview />} />
            <Route path="/insights/:category" element={<InsightDetail />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/agents/:agentId" element={<AgentDetail />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/missions" element={<MissionCenter />} />
            <Route path="/missions/:category" element={<MissionPage />} />
            <Route path="/progress" element={<WeeklyRecap />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/me" element={<AdminAnalytics />} />
            <Route path="/brand" element={<BrandAnalytics />} />
            <Route path="/backoffice" element={<FinancialDashboard />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
