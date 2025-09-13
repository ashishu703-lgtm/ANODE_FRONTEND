import React, { useState } from 'react';
import MarketingSalespersonSidebar from './MarketingSalespersonSidebar';
import MarketingSalespersonDashboard from './MarketingSalespersonDashboard';

const MarketingSalespersonLayout = () => {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      <MarketingSalespersonSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
      />
      <div className="flex-1 overflow-hidden">
        <MarketingSalespersonDashboard activeView={activeView} />
      </div>
    </div>
  );
};

export default MarketingSalespersonLayout;
