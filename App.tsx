import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Shop } from './components/Shop';
import { Tournaments } from './components/Tournaments';
import { Home } from './components/Home';
import { Players } from './components/Players';
import PBBLTeamUpdates from './components/PBBLTeamUpdates'; // Import the new component
import SpecialtyAwards from './components/SpecialtyAwards'; // Import the new component
import UnmatchedDecks from './components/UnmatchedDecks'; // Import the new component
import { User } from './types';

const AppContent: React.FC = () => {
  // Open Source Mode: Default to a Guest/Viewer User
  const [currentUser] = useState<User>({
    id: 'guest',
    name: 'Guest Viewer',
    email: 'guest@upkeep.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest'
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Map URL paths to view names
  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path === '/shop') return 'shop';
    if (path === '/tournaments') return 'tournaments';
    if (path === '/players') return 'players';
    if (path === '/pbbl-team-updates') return 'pbblTeamUpdates';
    if (path === '/specialty-awards') return 'specialtyAwards';
    if (path === '/unmatched-decks') return 'unmatchedDecks';
    return 'home';
  };

  const handleNavigate = (view: string) => {
    const pathMap: { [key: string]: string } = {
      home: '/home',
      shop: '/shop',
      tournaments: '/tournaments',
      players: '/players',
      pbblTeamUpdates: '/pbbl-team-updates',
      specialtyAwards: '/specialty-awards',
      unmatchedDecks: '/unmatched-decks'
    };
    navigate(pathMap[view] || '/');
  };

  const currentView = getCurrentView();

  return (
    <Layout 
      user={currentUser} 
      currentView={currentView} 
      onNavigate={handleNavigate} 
      onLogout={() => {}}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop user={currentUser} />} />
        <Route path="/tournaments" element={<Tournaments user={currentUser} />} />
        <Route path="/players" element={<Players />} />
        <Route path="/pbbl-team-updates" element={<PBBLTeamUpdates />} />
        <Route path="/specialty-awards" element={<SpecialtyAwards />} />
        <Route path="/unmatched-decks" element={<UnmatchedDecks />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;