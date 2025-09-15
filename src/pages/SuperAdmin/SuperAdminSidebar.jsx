import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  BarChart3, 
  Users, 
  Building2, 
  UserCheck, 
  Settings, 
  TrendingUp,
  Menu,
  X,
  LogOut
} from 'lucide-react';

const Sidebar = ({ onLogout, activeView, setActiveView }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState({
    dashboard: false,
    department: false
  });

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setOpenDropdowns({ dashboard: false, department: false });
    }
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <BarChart3 className="w-5 h-5" />,
      hasDropdown: true,
      dropdownItems: [
        { label: 'Sales Department', active: true },
        { label: 'HR Department', active: false },
        { label: 'Production Department', active: false },
        { label: 'Gate Entry Department', active: false }
      ]
    },
    {
      id: 'customer-list',
      label: 'Customer List',
      icon: <Users className="w-5 h-5" />,
      hasDropdown: false
    },
    {
      id: 'department',
      label: 'Department',
      icon: <Building2 className="w-5 h-5" />,
      hasDropdown: false
    },
    {
      id: 'leads',
      label: 'Leads',
      icon: <UserCheck className="w-5 h-5" />,
      hasDropdown: false
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: <Settings className="w-5 h-5" />,
      hasDropdown: false
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: <TrendingUp className="w-5 h-5" />,
      hasDropdown: false
    }
  ];

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'} h-screen flex flex-col border-r border-gray-200`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isExpanded && (
            <div className="flex items-center space-x-3">
              <img 
                src="https://res.cloudinary.com/drpbrn2ax/image/upload/v1757416761/logo2_kpbkwm-removebg-preview_jteu6d.png" 
                alt="ANOCAB Logo" 
                className="w-8 h-8 object-contain"
              />
              <div>
                <h1 className="font-bold text-gray-800 text-lg">ANOCAB</h1>
              </div>
            </div>
          )}
          {!isExpanded && (
            <div className="flex justify-center w-full">
              <img 
                src="https://res.cloudinary.com/drpbrn2ax/image/upload/v1757416761/logo2_kpbkwm-removebg-preview_jteu6d.png" 
                alt="ANOCAB Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isExpanded ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

    

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  activeView === item.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
                }`}
                onClick={() => {
                  if (item.hasDropdown) {
                    toggleDropdown(item.id);
                  } else {
                    setActiveView(item.id);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={activeView === item.id ? 'text-blue-600' : 'text-gray-500'}>
                    {item.icon}
                  </div>
                  {isExpanded && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
                {isExpanded && item.hasDropdown && (
                  <div className={item.id === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}>
                    {openDropdowns[item.id] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Dropdown Items */}
              {isExpanded && item.hasDropdown && openDropdowns[item.id] && (
                <ul className="ml-8 mt-1 space-y-1">
                  {item.dropdownItems.map((subItem, index) => (
                    <li key={index}>
                      <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        subItem.active ? 'bg-blue-500 text-white' : 'hover:bg-gray-50 text-gray-600'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            subItem.active ? 'bg-white' : 'bg-gray-400'
                          }`}></div>
                          <span className="text-sm">{subItem.label}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {isExpanded && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
