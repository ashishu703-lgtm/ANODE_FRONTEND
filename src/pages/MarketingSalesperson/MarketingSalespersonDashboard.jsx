import React from 'react';
import { 
  Users, 
  Clock, 
  UserCheck, 
  Calendar, 
  CheckCircle, 
  XCircle,
  IndianRupee,
  TrendingDown,
  TrendingUp,
  CalendarCheck,
  AlertCircle,
  Percent,
  RefreshCw,
  BarChart3,
  Activity,
  Target,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const MarketingSalespersonDashboard = ({ activeView }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <MarketingDashboardContent />;
      case 'all-leads':
        return <AllLeadsContent />;
      case 'visits':
        return <VisitsContent />;
      case 'toolbox':
        return <ToolboxContent />;
      default:
        return <MarketingDashboardContent />;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {renderContent()}
    </div>
  );
};

// Marketing Dashboard Content
const MarketingDashboardContent = () => {
  const marketingCards = [
    {
      title: 'Total Marketing Leads',
      value: '156',
      description: 'All marketing leads generated',
      icon: <Users className="w-5 h-5" />,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Active Campaigns',
      value: '8',
      description: 'Currently running campaigns',
      icon: <Activity className="w-5 h-5" />,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Today\'s Visits',
      value: '12',
      description: 'Scheduled visits for today',
      icon: <Calendar className="w-5 h-5" />,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Conversion Rate',
      value: '24.5%',
      description: 'Lead to customer conversion',
      icon: <Percent className="w-5 h-5" />,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Marketing Salesperson Dashboard</h1>
            <p className="text-gray-600">Marketing team performance and lead management</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Live Updates</span>
            </div>
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Marketing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {marketingCards.map((card, index) => (
          <div key={index} className={`${card.bgColor} ${card.borderColor} border rounded-xl p-4 hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-medium ${card.textColor}`}>{card.title}</h3>
              <div className={card.textColor}>
                {card.icon}
              </div>
            </div>
            <div className={`text-2xl font-bold ${card.textColor} mb-1`}>
              {card.value}
            </div>
            <p className="text-xs text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <UserCheck className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <h3 className="font-medium text-blue-800">Add New Lead</h3>
              <p className="text-sm text-blue-600">Create a new marketing lead</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Calendar className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <h3 className="font-medium text-green-800">Schedule Visit</h3>
              <p className="text-sm text-green-600">Plan a customer visit</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Activity className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <h3 className="font-medium text-purple-800">View Reports</h3>
              <p className="text-sm text-purple-600">Check performance metrics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// All Leads Content
const AllLeadsContent = () => {
  const leads = [
    { id: 1, name: 'Tech Solutions Inc', status: 'New', priority: 'High', date: '2025-01-13' },
    { id: 2, name: 'Marketing Agency', status: 'Contacted', priority: 'Medium', date: '2025-01-12' },
    { id: 3, name: 'Startup Ventures', status: 'Qualified', priority: 'High', date: '2025-01-11' },
    { id: 4, name: 'Enterprise Solutions', status: 'Proposal Sent', priority: 'Low', date: '2025-01-10' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Leads</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add New Lead
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.priority}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Visits Content
const VisitsContent = () => {
  const visits = [
    { id: 1, customer: 'Tech Solutions Inc', time: '09:00 AM', address: '123 Business St, City', status: 'Scheduled' },
    { id: 2, customer: 'Marketing Agency', time: '11:30 AM', address: '456 Corporate Ave, City', status: 'In Progress' },
    { id: 3, customer: 'Startup Ventures', time: '02:00 PM', address: '789 Innovation Dr, City', status: 'Completed' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Visits</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Schedule Visit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {visit.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {visit.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {visit.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      visit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      visit.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {visit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Toolbox Content
const ToolboxContent = () => {
  const tools = [
    { name: 'Lead Generator', description: 'Generate new leads automatically', icon: <Users className="w-6 h-6" /> },
    { name: 'Email Templates', description: 'Pre-built email templates', icon: <Mail className="w-6 h-6" /> },
    { name: 'Call Scripts', description: 'Sales call scripts and guidelines', icon: <Phone className="w-6 h-6" /> },
    { name: 'Presentation Tools', description: 'Marketing presentation templates', icon: <BarChart3 className="w-6 h-6" /> }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Toolbox</h1>
        <p className="text-gray-600">Essential tools for marketing salesperson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-blue-600">
                  {tool.icon}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Open Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingSalespersonDashboard;
