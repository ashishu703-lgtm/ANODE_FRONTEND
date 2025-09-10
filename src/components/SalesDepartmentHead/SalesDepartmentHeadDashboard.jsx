import React from 'react';
import SalesHeadDashboard from './salesHeadDashboard';
import Leads from './Leads';
import UserPerformance from './UserPerformance';
import PaymentInfo from './PaymentInfo';
import SalesDepartmentUser from './SalesDepartmentUser';

const SalesDepartmentHeadDashboard = ({ activeView, setActiveView }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'sales-dashboard':
        return <SalesHeadDashboard />;
      case 'leads':
        return <Leads />;
      case 'user-performance':
        return <UserPerformance />;
      case 'payment-info':
        return <PaymentInfo />;
      case 'sales-department-users':
        return <SalesDepartmentUser />;
      default:
        return <SalesHeadDashboard />;
    }
  };

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  );
};

export default SalesDepartmentHeadDashboard;
