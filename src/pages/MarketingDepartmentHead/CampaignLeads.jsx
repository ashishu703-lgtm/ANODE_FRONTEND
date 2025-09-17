import React, { useRef, useState, useEffect } from 'react';
import { Search, Filter, Upload, RefreshCw, User, Mail, Building, Shield, Tag, Clock, Calendar, Phone, CheckCircle, XCircle, Hash, MapPin, Info, Plus, TrendingUp, Target, Users, BarChart3, Megaphone } from 'lucide-react';

const CampaignLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewLead, setPreviewLead] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [columnFilters, setColumnFilters] = useState({
    customerId: '',
    customer: '',
    email: '',
    campaign: '',
    leadSource: '',
    category: '',
    status: '',
    createdAt: ''
  });

  // Sample data for campaign leads
  const leads = [
    {
      id: 1,
      customerId: 'CAM-0001',
      customer: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      business: 'Digital Solutions Ltd',
      campaign: 'Summer Sale 2024',
      leadSource: 'Google Ads',
      category: 'Hot Lead',
      status: 'NEW',
      createdAt: '2024-01-15',
      clickThroughRate: '3.2%',
      conversionRate: '12%',
      cost: 125.50
    },
    {
      id: 2,
      customerId: 'CAM-0002',
      customer: 'Bob Martinez',
      email: 'bob.martinez@company.com',
      business: 'Tech Innovations',
      campaign: 'Product Launch Q1',
      leadSource: 'Facebook Ads',
      category: 'Warm Lead',
      status: 'CONTACTED',
      createdAt: '2024-01-16',
      clickThroughRate: '2.8%',
      conversionRate: '8%',
      cost: 89.25
    },
    {
      id: 3,
      customerId: 'CAM-0003',
      customer: 'Carol Williams',
      email: 'carol.williams@business.com',
      business: 'Enterprise Corp',
      campaign: 'Brand Awareness',
      leadSource: 'LinkedIn Ads',
      category: 'Cold Lead',
      status: 'QUALIFIED',
      createdAt: '2024-01-17',
      clickThroughRate: '4.1%',
      conversionRate: '15%',
      cost: 245.75
    },
    {
      id: 4,
      customerId: 'CAM-0004',
      customer: 'David Chen',
      email: 'david.chen@startup.com',
      business: 'Innovation Hub',
      campaign: 'Early Bird Special',
      leadSource: 'Email Campaign',
      category: 'Hot Lead',
      status: 'CONVERTED',
      createdAt: '2024-01-18',
      clickThroughRate: '5.3%',
      conversionRate: '22%',
      cost: 67.80
    },
    {
      id: 5,
      customerId: 'CAM-0005',
      customer: 'Eva Rodriguez',
      email: 'eva.rodriguez@agency.com',
      business: 'Creative Agency',
      campaign: 'Holiday Campaign',
      leadSource: 'Instagram Ads',
      category: 'Warm Lead',
      status: 'NURTURING',
      createdAt: '2024-01-19',
      clickThroughRate: '2.9%',
      conversionRate: '10%',
      cost: 156.40
    }
  ];

  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  };

  const handleSelectLead = (leadId) => {
    if (selectedLeads.includes(leadId)) {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const openPreview = (lead) => {
    setPreviewLead(lead);
    setShowPreview(true);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    
    switch (status) {
      case 'NEW':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`}>NEW</span>;
      case 'CONTACTED':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`}>CONTACTED</span>;
      case 'QUALIFIED':
        return <span className={`${baseClasses} bg-purple-100 text-purple-800 border border-purple-200`}>QUALIFIED</span>;
      case 'CONVERTED':
        return <span className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}>CONVERTED</span>;
      case 'NURTURING':
        return <span className={`${baseClasses} bg-orange-100 text-orange-800 border border-orange-200`}>NURTURING</span>;
      default:
        return <span className={baseClasses}>{status}</span>;
    }
  };

  const matchesGlobal = (lead) => {
    if (!searchTerm) return true;
    const t = searchTerm.toLowerCase();
    return (
      (lead.customer || '').toLowerCase().includes(t) ||
      (lead.email || '').toLowerCase().includes(t) ||
      (lead.campaign || '').toLowerCase().includes(t) ||
      (lead.leadSource || '').toLowerCase().includes(t)
    );
  };

  const filteredLeads = leads.filter(lead => matchesGlobal(lead));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Megaphone className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Campaign Leads</h1>
        </div>
        <p className="text-gray-600">Track and manage leads from marketing campaigns</p>
      </div>

      {/* Campaign Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Total Leads</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {leads.length}
          </div>
          <p className="text-xs text-gray-500">From all campaigns</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Converted</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {leads.filter(lead => lead.status === 'CONVERTED').length}
          </div>
          <p className="text-xs text-gray-500">Successfully converted</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Avg. CTR</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            3.7%
          </div>
          <p className="text-xs text-gray-500">Click-through rate</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Total Spend</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            ${leads.reduce((sum, lead) => sum + lead.cost, 0).toFixed(2)}
          </div>
          <p className="text-xs text-gray-500">Campaign investment</p>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          {/* Left: Search */}
          <div className="flex items-center gap-3 w-full max-w-xl">
            <div className="relative w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by customer, campaign, or source..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 rounded-full bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white shadow-inner"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            <button
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Toggle column filters"
              onClick={() => setShowColumnFilters(v => !v)}
            >
              <Filter className="w-4 h-4 text-purple-600" />
            </button>
            <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === leads.length && leads.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-purple-600" />
                    <span>Customer ID</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Customer</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Megaphone className="w-4 h-4 text-green-600" />
                    <span>Campaign</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-orange-600" />
                    <span>Source</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-red-600" />
                    <span>CTR</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    <span>Conversion</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Status</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">{lead.customerId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{lead.customer}</div>
                      <div className="text-xs text-gray-500">{lead.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{lead.campaign}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{lead.leadSource}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{lead.clickThroughRate}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{lead.conversionRate}</td>
                  <td className="px-4 py-4">{getStatusBadge(lead.status)}</td>
                  <td className="px-4 py-4">
                    <button
                      className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-purple-600 border border-purple-200 rounded-full hover:bg-purple-50 transition-colors"
                      title="View Details"
                      onClick={() => openPreview(lead)}
                    >
                      i
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No campaign leads found</div>
          <div className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  );
};

export default CampaignLeads;
