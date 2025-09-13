import React, { useState } from 'react';
import TeleSalesSidebar from './TeleSalesSidebar';
import TeleSalesDashboard from './TeleSalesDashboard';

const TeleSalesLayout = () => {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      <TeleSalesSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
      />
      <div className="flex-1 overflow-hidden">
        <TeleSalesDashboard activeView={activeView} />
      </div>
    </div>
  );
};

export default TeleSalesLayout;
