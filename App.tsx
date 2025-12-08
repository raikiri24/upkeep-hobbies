import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Shop } from './components/Shop';
import { Tournaments } from './components/Tournaments';
import { Home } from './components/Home';
import { Players } from './components/Players';
import PBBLTeamUpdates from './components/PBBLTeamUpdates'; // Import the new component
import { User } from './types';

const App: React.FC = () => {
  // Open Source Mode: Default to a Guest/Viewer User
  const [currentUser] = useState<User>({
    id: 'guest',
    name: 'Guest Viewer',
    email: 'guest@upkeep.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest'
  });
  
  const [currentView, setCurrentView] = useState('home');

  // Routing Logic
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop user={currentUser} />;
      case 'tournaments':
        return <Tournaments user={currentUser} />;
      case 'players':
        return <Players />;
      case 'pbblTeamUpdates': // New case for PBBL Team Updates
        return <PBBLTeamUpdates />; 
      default:
        return <Home />;
    }
  };

  return (
    <Layout 
      user={currentUser} 
      currentView={currentView} 
      onNavigate={setCurrentView} 
      onLogout={() => {}}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;