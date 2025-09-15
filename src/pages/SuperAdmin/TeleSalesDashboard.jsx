import React, { useState } from 'react';
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
  ChevronDown,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Users,
  Mail,
  Headphones
} from 'lucide-react';

const TeleSalesDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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
    },
    {
      title: 'Revenue Generated',
      value: '₹1,85,000',
      description: 'Revenue from tele sales',
      icon: <IndianRupee className="w-5 h-5" />,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Follow-up Calls',
      value: '156',
      description: 'Pending follow-up calls',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200'
    }
  ];

  const teleSalesTeam = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@anocab.com',
      phone: '+1 (555) 111-2222',
      role: 'Senior Tele Sales Executive',
      status: 'Active',
      calls: 245,
      conversions: 18,
      revenue: '₹45,000'
    },
    {
      id: 2,
      name: 'Emily Davis',
      email: 'emily.davis@anocab.com',
      phone: '+1 (555) 222-3333',
      role: 'Tele Sales Specialist',
      status: 'Active',
      calls: 198,
      conversions: 15,
      revenue: '₹38,000'
    },
    {
      id: 3,
      name: 'Robert Brown',
      email: 'robert.brown@anocab.com',
      phone: '+1 (555) 333-4444',
      role: 'Lead Tele Sales Agent',
      status: 'Active',
      calls: 267,
      conversions: 22,
      revenue: '₹52,000'
    }
  ];

  const callLogs = [
    {
      id: 1,
      customer: 'ABC Corporation',
      phone: '+1 (555) 123-4567',
      duration: '12:45',
      status: 'Completed',
      outcome: 'Sale Made',
      salesperson: 'John Smith',
      time: '09:30 AM'
    },
    {
      id: 2,
      customer: 'XYZ Industries',
      phone: '+1 (555) 234-5678',
      duration: '08:20',
      status: 'Completed',
      outcome: 'Follow-up Required',
      salesperson: 'Emily Davis',
      time: '10:15 AM'
    },
    {
      id: 3,
      customer: 'Tech Solutions Ltd',
      phone: '+1 (555) 345-6789',
      duration: '15:30',
      status: 'Completed',
      outcome: 'Sale Made',
      salesperson: 'Robert Brown',
      time: '11:00 AM'
    },
    {
      id: 4,
      customer: 'Global Enterprises',
      phone: '+1 (555) 456-7890',
      duration: '06:15',
      status: 'Completed',
      outcome: 'Not Interested',
      salesperson: 'John Smith',
      time: '02:30 PM'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Tele Sales Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
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

      {/* Call Logs Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold text-green-600">Recent Call Logs</h2>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salesperson</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {call.salesperson}
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
                      {call.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tele Sales Team Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold text-green-600">Tele Sales Team Performance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teleSalesTeam.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Calls Made</span>
                  <span className="text-sm font-medium text-gray-900">{member.calls}</span>
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

export default TeleSalesDashboard;
