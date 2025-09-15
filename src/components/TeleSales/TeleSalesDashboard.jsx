import React from 'react';
import { 
  Phone, 
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
  Users,
  Mail,
  Headphones
} from 'lucide-react';

const TeleSalesDashboard = ({ activeView }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <TeleSalesDashboardContent />;
      case 'call-center':
        return <CallCenterContent />;
      case 'call-logs':
        return <CallLogsContent />;
      case 'follow-ups':
        return <FollowUpsContent />;
      case 'performance':
        return <PerformanceContent />;
      default:
        return <TeleSalesDashboardContent />;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {renderContent()}
    </div>
  );
};

// Tele Sales Dashboard Content
const TeleSalesDashboardContent = () => {
  const teleSalesCards = [
    {
      title: 'Total Calls Made',
      value: '1,245',
      description: 'Calls made this month',
      icon: <Phone className="w-5 h-5" />,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Connected Calls',
      value: '892',
      description: 'Successfully connected calls',
      icon: <UserCheck className="w-5 h-5" />,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Call Duration',
      value: '2.5 hrs',
      description: 'Average call duration',
      icon: <Clock className="w-5 h-5" />,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Conversion Rate',
      value: '18.7%',
      description: 'Call to sale conversion',
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
            <h1 className="text-3xl font-bold text-green-600 mb-2">Tele Sales Dashboard</h1>
            <p className="text-gray-600">Tele sales team performance and call management</p>
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

      {/* Tele Sales Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {teleSalesCards.map((card, index) => (
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
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Phone className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <h3 className="font-medium text-green-800">Make Call</h3>
              <p className="text-sm text-green-600">Start a new sales call</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Headphones className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <h3 className="font-medium text-blue-800">Call Center</h3>
              <p className="text-sm text-blue-600">Access call center tools</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Activity className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <h3 className="font-medium text-purple-800">View Reports</h3>
              <p className="text-sm text-purple-600">Check call performance</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Call Center Content
const CallCenterContent = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Call Center</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Start Calling
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Queue</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Call</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-gray-600">+1 (555) 234-5678</p>
              </div>
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Call</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Scripts</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
              <p className="font-medium">Cold Call Script</p>
              <p className="text-sm text-gray-600">Standard cold calling script</p>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
              <p className="font-medium">Follow-up Script</p>
              <p className="text-sm text-gray-600">Follow-up call script</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Call Logs Content
const CallLogsContent = () => {
  const callLogs = [
    { id: 1, customer: 'ABC Corporation', phone: '+1 (555) 123-4567', duration: '12:45', status: 'Completed', outcome: 'Sale Made' },
    { id: 2, customer: 'XYZ Industries', phone: '+1 (555) 234-5678', duration: '08:20', status: 'Completed', outcome: 'Follow-up Required' },
    { id: 3, customer: 'Tech Solutions Ltd', phone: '+1 (555) 345-6789', duration: '15:30', status: 'Completed', outcome: 'Sale Made' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Call Logs</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Export Logs
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {callLogs.map((call) => (
                <tr key={call.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {call.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      call.outcome === 'Sale Made' ? 'bg-green-100 text-green-800' :
                      call.outcome === 'Follow-up Required' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {call.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
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

// Follow-ups Content
const FollowUpsContent = () => {
  const followUps = [
    { id: 1, customer: 'ABC Corporation', date: '2025-01-14', time: '10:00 AM', priority: 'High', notes: 'Interested in premium package' },
    { id: 2, customer: 'XYZ Industries', date: '2025-01-15', time: '02:30 PM', priority: 'Medium', notes: 'Requested pricing information' },
    { id: 3, customer: 'Tech Solutions Ltd', date: '2025-01-16', time: '11:00 AM', priority: 'High', notes: 'Ready to make decision' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Follow-ups</h1>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
          Schedule Follow-up
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {followUps.map((followUp) => (
                <tr key={followUp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {followUp.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{followUp.date}</div>
                      <div className="text-xs text-gray-400">{followUp.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      followUp.priority === 'High' ? 'bg-red-100 text-red-800' :
                      followUp.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {followUp.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {followUp.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">Call Now</button>
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

// Performance Content
const PerformanceContent = () => {
  const performanceData = [
    { metric: 'Calls Made Today', value: '45', target: '50', status: 'good' },
    { metric: 'Conversion Rate', value: '18.7%', target: '20%', status: 'warning' },
    { metric: 'Average Call Duration', value: '12:30', target: '15:00', status: 'good' },
    { metric: 'Revenue Generated', value: '₹25,000', target: '₹30,000', status: 'warning' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Performance</h1>
        <p className="text-gray-600">Your tele sales performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {performanceData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.metric}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'good' ? 'bg-green-100 text-green-800' :
                item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.status === 'good' ? 'Good' : item.status === 'warning' ? 'Needs Improvement' : 'Poor'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                <span className="text-sm text-gray-500">Target: {item.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${
                  item.status === 'good' ? 'bg-green-500' :
                  item.status === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeleSalesDashboard;
