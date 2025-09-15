import React from 'react';
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
  RefreshCw,
  BarChart3,
  Activity,
  Target,
  Users,
  Mail,
  MapPin,
  FileText,
  FileSignature,
  Monitor
} from 'lucide-react';

const OfficeSalesPersonDashboard = ({ activeView }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <OfficeSalesDashboardContent />;
      case 'meetings':
        return <MeetingsContent />;
      case 'proposals':
        return <ProposalsContent />;
      case 'contracts':
        return <ContractsContent />;
      case 'presentations':
        return <PresentationsContent />;
      default:
        return <OfficeSalesDashboardContent />;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {renderContent()}
    </div>
  );
};

// Office Sales Dashboard Content
const OfficeSalesDashboardContent = () => {
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
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-600 mb-2">Office Sales Person Dashboard</h1>
            <p className="text-gray-600">Office sales team performance and meeting management</p>
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

      {/* Office Sales Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Calendar className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <h3 className="font-medium text-purple-800">Schedule Meeting</h3>
              <p className="text-sm text-purple-600">Plan a client meeting</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <FileText className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <h3 className="font-medium text-blue-800">Create Proposal</h3>
              <p className="text-sm text-blue-600">Draft a business proposal</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <FileSignature className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <h3 className="font-medium text-green-800">Finalize Contract</h3>
              <p className="text-sm text-green-600">Complete contract details</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Meetings Content
const MeetingsContent = () => {
  const meetings = [
    { id: 1, company: 'Global Tech Corp', contact: 'Mr. James Anderson', time: '10:00 AM', date: 'Today', location: 'Conference Room A', status: 'Scheduled' },
    { id: 2, company: 'Innovation Solutions', contact: 'Ms. Sarah Miller', time: '02:30 PM', date: 'Today', location: 'Meeting Room B', status: 'Confirmed' },
    { id: 3, company: 'Enterprise Systems', contact: 'Mr. Robert Johnson', time: '11:00 AM', date: 'Tomorrow', location: 'Board Room', status: 'Scheduled' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meetings</h1>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Schedule Meeting
        </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {meetings.map((meeting) => (
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
  );
};

// Proposals Content
const ProposalsContent = () => {
  const proposals = [
    { id: 1, company: 'Global Tech Corp', title: 'Enterprise Software Solution', value: '₹5,00,000', status: 'Draft', date: '2025-01-13' },
    { id: 2, company: 'Innovation Solutions', title: 'Digital Marketing Package', value: '₹2,50,000', status: 'Sent', date: '2025-01-12' },
    { id: 3, company: 'Enterprise Systems', title: 'Cloud Infrastructure Setup', value: '₹8,00,000', status: 'Under Review', date: '2025-01-11' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Proposals</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Proposal
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {proposal.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {proposal.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {proposal.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      proposal.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                      proposal.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      proposal.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {proposal.date}
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

// Contracts Content
const ContractsContent = () => {
  const contracts = [
    { id: 1, company: 'Global Tech Corp', type: 'Software License', value: '₹5,00,000', status: 'Active', startDate: '2025-01-01', endDate: '2025-12-31' },
    { id: 2, company: 'Innovation Solutions', type: 'Service Agreement', value: '₹2,50,000', status: 'Pending', startDate: '2025-02-01', endDate: '2025-08-31' },
    { id: 3, company: 'Enterprise Systems', type: 'Maintenance Contract', value: '₹1,00,000', status: 'Active', startDate: '2024-12-01', endDate: '2025-11-30' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contracts</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          New Contract
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contract.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contract.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {contract.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      contract.status === 'Active' ? 'bg-green-100 text-green-800' :
                      contract.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{contract.startDate}</div>
                      <div className="text-xs text-gray-400">to {contract.endDate}</div>
                    </div>
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

// Presentations Content
const PresentationsContent = () => {
  const presentations = [
    { id: 1, title: 'Company Overview', type: 'General', lastUsed: '2025-01-10', status: 'Ready' },
    { id: 2, title: 'Product Demo', type: 'Product', lastUsed: '2025-01-08', status: 'Ready' },
    { id: 3, title: 'Pricing Strategy', type: 'Sales', lastUsed: '2025-01-05', status: 'Needs Update' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Presentations</h1>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Create Presentation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <div key={presentation.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Monitor className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{presentation.title}</h3>
                <p className="text-sm text-gray-600">{presentation.type}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Used:</span>
                <span className="text-gray-900">{presentation.lastUsed}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  presentation.status === 'Ready' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {presentation.status}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors">
                Open
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeSalesPersonDashboard;
