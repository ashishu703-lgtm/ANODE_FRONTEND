import React, { useState } from 'react';
import { 
  Building2, 
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
  Phone,
  MapPin,
  FileText
} from 'lucide-react';

const OfficeSalesPersonDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const officeSalesCards = [
    {
      title: 'Office Meetings',
      value: '45',
      description: 'Meetings conducted this month',
      icon: <Building2 className="w-5 h-5" />,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Proposals Sent',
      value: '28',
      description: 'Business proposals submitted',
      icon: <FileText className="w-5 h-5" />,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Contracts Signed',
      value: '12',
      description: 'Contracts finalized',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Success Rate',
      value: '42.8%',
      description: 'Proposal to contract rate',
      icon: <Percent className="w-5 h-5" />,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    },
    {
      title: 'Revenue Generated',
      value: '₹3,25,000',
      description: 'Revenue from office sales',
      icon: <IndianRupee className="w-5 h-5" />,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Pending Follow-ups',
      value: '18',
      description: 'Meetings requiring follow-up',
      icon: <Clock className="w-5 h-5" />,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200'
    }
  ];

  const officeSalesTeam = [
    {
      id: 1,
      name: 'David Wilson',
      email: 'david.wilson@anocab.com',
      phone: '+1 (555) 444-5555',
      role: 'Senior Office Sales Manager',
      status: 'Active',
      meetings: 15,
      contracts: 5,
      revenue: '₹125,000'
    },
    {
      id: 2,
      name: 'Jennifer Lee',
      email: 'jennifer.lee@anocab.com',
      phone: '+1 (555) 555-6666',
      role: 'Office Sales Executive',
      status: 'Active',
      meetings: 12,
      contracts: 4,
      revenue: '₹98,000'
    },
    {
      id: 3,
      name: 'Michael Taylor',
      email: 'michael.taylor@anocab.com',
      phone: '+1 (555) 666-7777',
      role: 'Business Development Manager',
      status: 'Active',
      meetings: 18,
      contracts: 3,
      revenue: '₹102,000'
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      company: 'Global Tech Corp',
      contact: 'Mr. James Anderson',
      time: '10:00 AM',
      date: 'Today',
      location: 'Conference Room A',
      status: 'Scheduled',
      salesperson: 'David Wilson'
    },
    {
      id: 2,
      company: 'Innovation Solutions',
      contact: 'Ms. Sarah Miller',
      time: '02:30 PM',
      date: 'Today',
      location: 'Meeting Room B',
      status: 'Confirmed',
      salesperson: 'Jennifer Lee'
    },
    {
      id: 3,
      company: 'Enterprise Systems',
      contact: 'Mr. Robert Johnson',
      time: '11:00 AM',
      date: 'Tomorrow',
      location: 'Board Room',
      status: 'Scheduled',
      salesperson: 'Michael Taylor'
    },
    {
      id: 4,
      company: 'Digital Solutions Ltd',
      contact: 'Ms. Lisa Brown',
      time: '03:00 PM',
      date: 'Tomorrow',
      location: 'Conference Room C',
      status: 'Pending Confirmation',
      salesperson: 'David Wilson'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Office Sales Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {officeSalesCards.map((card, index) => (
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

      {/* Upcoming Meetings Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-purple-600">Upcoming Meetings</h2>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salesperson</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingMeetings.map((meeting) => (
                  <tr key={meeting.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {meeting.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {meeting.contact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>{meeting.date}</div>
                        <div className="text-xs text-gray-400">{meeting.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {meeting.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {meeting.salesperson}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        meeting.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        meeting.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {meeting.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Office Sales Team Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-purple-600">Office Sales Team Performance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {officeSalesTeam.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Meetings</span>
                  <span className="text-sm font-medium text-gray-900">{member.meetings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Contracts</span>
                  <span className="text-sm font-medium text-gray-900">{member.contracts}</span>
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

export default OfficeSalesPersonDashboard;
