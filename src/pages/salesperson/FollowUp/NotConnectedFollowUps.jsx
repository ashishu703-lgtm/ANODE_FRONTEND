import React from 'react';
import FollowUpBase from './FollowUpBase';

const NotConnectedFollowUps = () => {
  // Sample data for not connected follow-ups
  const notConnectedData = [
    {
      id: 3,
      name: 'Alex Smith',
      customerId: 'CUST003',
      business: 'Smith & Co',
      address: '789 Market St, Village',
      state: 'New York',
      productType: 'Coaxial Cables',
      customerType: 'Retailer',
      leadSource: 'Cold Call',
      date: '2023-09-10',
      status: 'Not Connected',
      lastAttempt: '2023-09-13 15:45',
      nextAttempt: '2023-09-15 10:00'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      customerId: 'CUST004',
      business: 'Tech Solutions Inc',
      address: '321 Tech Park, Metro',
      state: 'Illinois',
      productType: 'Networking Cables',
      customerType: 'Reseller',
      leadSource: 'Trade Show',
      date: '2023-09-12',
      status: 'Not Connected',
      lastAttempt: '2023-09-14 11:30',
      nextAttempt: '2023-09-16 14:00'
    }
  ];

  return <FollowUpBase status="not-connected" customData={notConnectedData} />;
};

export default NotConnectedFollowUps;
