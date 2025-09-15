import React from 'react';
import FollowUpBase from './FollowUpBase';

const ClosedFollowUps = () => {
  // Sample data for closed follow-ups
  const closedData = [
    {
      id: 9,
      name: 'Taylor Swift',
      customerId: 'CUST009',
      business: 'Swift Enterprises',
      address: '123 Music Row, Nashville',
      state: 'Tennessee',
      productType: 'Audio Cables',
      customerType: 'Retailer',
      leadSource: 'Referral',
      date: '2023-09-10',
      status: 'Closed',
      closeDate: '2023-09-10',
      closeReason: 'Deal Won',
      amount: '$2,500.00'
    },
    {
      id: 10,
      name: 'David Miller',
      customerId: 'CUST010',
      business: 'Miller Electronics',
      address: '456 Tech Park, Silicon Valley',
      state: 'California',
      productType: 'Networking Equipment',
      customerType: 'Reseller',
      leadSource: 'Website',
      date: '2023-09-05',
      status: 'Closed',
      closeDate: '2023-09-08',
      closeReason: 'Deal Lost',
      reasonDetails: 'Went with competitor'
    }
  ];

  return <FollowUpBase status="closed" customData={closedData} />;
};

export default ClosedFollowUps;
