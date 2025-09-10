import React, { useState } from 'react';
import SuperAdminSalesDashboard from './SuperAdmin/SuperAdminSalesDashboard';
import AllcustomerList from './SuperAdmin/AllcustomerList';
import SuperAdminDepartmentList from './SuperAdmin/SuperAdminDepartmentList';
import AllLeads from './SuperAdmin/AllLeads';
import Configuration from './SuperAdmin/Configuration';
import Performance from './SuperAdmin/Performance';

const MainDashboard = ({ activeView, setActiveView, onSalesDepartmentHeadLogin }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <SuperAdminSalesDashboard />;
      case 'customer-list':
        return <AllcustomerList />;
      case 'department':
        return <SuperAdminDepartmentList onSalesDepartmentHeadLogin={onSalesDepartmentHeadLogin} />;
      case 'leads':
        return <AllLeads />;
      case 'configuration':
        return <Configuration />;
      case 'performance':
        return <Performance />;
      default:
        return <SuperAdminSalesDashboard />;
    }
  };

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  );
};

export default MainDashboard;
