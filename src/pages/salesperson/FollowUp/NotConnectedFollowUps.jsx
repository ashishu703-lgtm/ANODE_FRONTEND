import React from 'react';
import FollowUpBase from './FollowUpBase';
import { useFollowUpData } from './FollowUpDataContext';

const NotConnectedFollowUps = () => {
  const { getLeadsByStatus, loading } = useFollowUpData();
  
  // Get not connected leads from the shared data context
  const notConnectedData = getLeadsByStatus('not-connected');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading not connected leads...</p>
        </div>
      </div>
    );
  }

  return <FollowUpBase status="not-connected" customData={notConnectedData} />;
};

export default NotConnectedFollowUps;
