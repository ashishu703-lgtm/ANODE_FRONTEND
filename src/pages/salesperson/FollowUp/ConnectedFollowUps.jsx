import React from 'react';
import FollowUpBase from './FollowUpBase';
import { useFollowUpData } from './FollowUpDataContext';

const ConnectedFollowUps = () => {
  const { getLeadsByStatus, loading, getStatusCounts } = useFollowUpData();
  
  // Get connected leads from the shared data context
  const connectedData = getLeadsByStatus('connected');
  
  // Debug: Log status counts
  React.useEffect(() => {
    if (!loading) {
      getStatusCounts();
      console.log('Connected Follow Ups - Data:', connectedData);
      console.log('Connected Follow Ups - Data length:', connectedData.length);
      console.log('Connected Follow Ups - First item:', connectedData[0]);
    }
  }, [loading, connectedData, getStatusCounts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading connected leads...</p>
        </div>
      </div>
    );
  }

  // Debug: Show data info
  console.log('ConnectedFollowUps - About to render with data:', connectedData);

  return <FollowUpBase status="connected" customData={connectedData} />;
};

export default ConnectedFollowUps;
