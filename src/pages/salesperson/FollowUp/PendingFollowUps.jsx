import React from 'react';
import FollowUpBase from './FollowUpBase';

const PendingFollowUps = () => {
  // Sample data for pending follow-ups
  const pendingData = [
    {
      id: 5,
      name: 'Michael Brown',
      customerId: 'CUST005',
      business: 'Brown Enterprises',
      address: '555 Corporate Dr, District',
      state: 'Florida',
      productType: 'Speaker Wires',
      customerType: 'Distributor',
      leadSource: 'Email Campaign',
      date: '2023-09-11',
      status: 'Pending',
      waitingSince: '2023-09-13',
      lastContact: '2023-09-13 09:30',
      nextAction: 'Follow up email'
    },
    {
      id: 6,
      name: 'Emily Davis',
      customerId: 'CUST006',
      business: 'Davis Electronics',
      address: '777 Tech Blvd, City',
      state: 'Washington',
      productType: 'HDMI Cables',
      customerType: 'Retailer',
      leadSource: 'Website Form',
      date: '2023-09-10',
      status: 'Pending',
      waitingSince: '2023-09-11',
      lastContact: '2023-09-11 14:15',
      nextAction: 'Send catalog'
    }
  ];

  return <FollowUpBase status="pending" customData={pendingData} />;
};

export default PendingFollowUps;
