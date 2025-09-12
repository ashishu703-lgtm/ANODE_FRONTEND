import React from 'react';
import FollowUpBase from './FollowUpBase';

const ConnectedFollowUps = () => {
  // Override sample data for connected follow-ups
  const connectedData = [
    {
      id: 1,
      name: 'John Doe',
      customerId: 'CUST001',
      business: 'ABC Corporation',
      address: '123 Business St, City',
      state: 'California',
      productType: 'Industrial Cables',
      customerType: 'Wholesaler',
      leadSource: 'Website',
      date: '2023-09-15',
      status: 'Connected'
    },
    {
      id: 2,
      name: 'Jane Smith',
      customerId: 'CUST002',
      business: 'XYZ Industries',
      address: '456 Industry Ave, Town',
      state: 'Texas',
      productType: 'Fiber Optics',
      customerType: 'Contractor',
      leadSource: 'Referral',
      date: '2023-09-14',
      status: 'Connected'
    }
  ];

  return <FollowUpBase status="connected" customData={connectedData} />;
};

export default ConnectedFollowUps;
