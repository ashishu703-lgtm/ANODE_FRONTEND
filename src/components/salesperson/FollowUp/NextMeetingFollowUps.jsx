import React from 'react';
import FollowUpBase from './FollowUpBase';

const NextMeetingFollowUps = () => {
  // Sample data for next meeting follow-ups
  const nextMeetingData = [
    {
      id: 7,
      name: 'Robert Kim',
      customerId: 'CUST007',
      business: 'Kim Technologies',
      address: '888 Innovation Way, Tech City',
      state: 'California',
      productType: 'Fiber Optic Cables',
      customerType: 'Enterprise',
      leadSource: 'Referral',
      date: '2023-09-16',
      status: 'Next Meeting',
      meetingTime: '2023-09-16 14:00',
      meetingType: 'Video Call',
      duration: '1 hour'
    },
    {
      id: 8,
      name: 'Lisa Wong',
      customerId: 'CUST008',
      business: 'Wong Solutions',
      address: '999 Business Center, Downtown',
      state: 'New York',
      productType: 'Ethernet Cables',
      customerType: 'Corporate',
      leadSource: 'Cold Call',
      date: '2023-09-17',
      status: 'Next Meeting',
      meetingTime: '2023-09-17 11:00',
      meetingType: 'In-Person',
      duration: '2 hours'
    }
  ];

  return <FollowUpBase status="next-meeting" customData={nextMeetingData} />;
};

export default NextMeetingFollowUps;
