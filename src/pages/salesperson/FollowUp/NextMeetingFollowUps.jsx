import React from 'react';
import FollowUpBase from './FollowUpBase';
import { useFollowUpData } from './FollowUpDataContext';

const NextMeetingFollowUps = () => {
  const { getLeadsByStatus, loading } = useFollowUpData();
  
  // Get next meeting leads from the shared data context
  const nextMeetingData = getLeadsByStatus('next-meeting');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading next meeting leads...</p>
        </div>
      </div>
    );
  }

  return <FollowUpBase status="next-meeting" customData={nextMeetingData} />;
};

export default NextMeetingFollowUps;
