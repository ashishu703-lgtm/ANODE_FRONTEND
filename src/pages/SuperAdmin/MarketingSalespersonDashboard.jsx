import React, { useState } from 'react';
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
  ChevronDown,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const MarketingSalespersonDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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
    },
    {
      title: 'Revenue Generated',
      value: '₹2,45,000',
      description: 'This month\'s revenue',
      icon: <IndianRupee className="w-5 h-5" />,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Pending Follow-ups',
      value: '23',
      description: 'Leads requiring follow-up',
      icon: <Clock className="w-5 h-5" />,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200'
    }
  ];

  const marketingTeam = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@anocab.com',
      phone: '+1 (555) 123-4567',
      role: 'Senior Marketing Executive',
      status: 'Active',
      leads: 45,
      conversions: 12,
      revenue: '₹85,000'
    },
    {
      id: 2,
      name: 'Mike Wilson',
      email: 'mike.wilson@anocab.com',
      phone: '+1 (555) 234-5678',
      role: 'Marketing Specialist',
      status: 'Active',
      leads: 38,
      conversions: 9,
      revenue: '₹72,000'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      email: 'lisa.chen@anocab.com',
      phone: '+1 (555) 345-6789',
      role: 'Digital Marketing Lead',
      status: 'Active',
      leads: 52,
      conversions: 15,
      revenue: '₹98,000'
    }
  ];

  const todayVisits = [
    {
      id: 1,
      customer: 'Tech Solutions Inc',
      time: '09:00 AM',
      address: '123 Business St, City',
      status: 'Scheduled',
      salesperson: 'Sarah Johnson'
    },
    {
      id: 2,
      customer: 'Marketing Agency',
      time: '11:30 AM',
      address: '456 Corporate Ave, City',
      status: 'In Progress',
      salesperson: 'Mike Wilson'
    },
    {
      id: 3,
      customer: 'Startup Ventures',
      time: '02:00 PM',
      address: '789 Innovation Dr, City',
      status: 'Completed',
      salesperson: 'Lisa Chen'
    },
    {
      id: 4,
      customer: 'Enterprise Solutions',
      time: '04:30 PM',
      address: '321 Enterprise Way, City',
      status: 'Scheduled',
      salesperson: 'Sarah Johnson'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Marketing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
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

      {/* Today's Visits Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-600">Today's Visits</h2>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salesperson</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todayVisits.map((visit) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {visit.salesperson}
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

      {/* Marketing Team Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-600">Marketing Team Performance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketingTeam.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Leads</span>
                  <span className="text-sm font-medium text-gray-900">{member.leads}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conversions</span>
                  <span className="text-sm font-medium text-gray-900">{member.conversions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="text-sm font-medium text-green-600">{member.revenue}</span>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{member.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{member.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingSalespersonDashboard;
