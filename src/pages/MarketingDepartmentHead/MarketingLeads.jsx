import React, { useRef, useState, useEffect } from 'react';
import { Search, Filter, Upload, RefreshCw, User, Mail, Building, Shield, Tag, Clock, Calendar, Phone, CheckCircle, XCircle, Hash, MapPin, Info, Plus, TrendingUp, Target, Users, BarChart3, ChevronDown, Download } from 'lucide-react';
import AddCustomerForm from '../salesperson/salespersonaddcustomer.jsx';

const MarketingLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewLead, setPreviewLead] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef(null);
  const [leadsData, setLeadsData] = useState(null);
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showImportDropdown, setShowImportDropdown] = useState(false);
  const [columnFilters, setColumnFilters] = useState({
    customerId: '',
    customer: '',
    email: '',
    business: '',
    leadType: '',
    category: '',
    salesStatus: '',
    createdAt: '',
    assigned: '',
    telecaller: '',
    telecallerStatus: '',
    paymentStatus: ''
  });

  // Sample data for marketing leads
  const leads = [
    {
      id: 1,
      customerId: 'MKT-0001',
      customer: 'John Smith',
      email: 'john.smith@example.com',
      business: 'Tech Solutions Inc',
      leadType: 'Website Inquiry',
      category: 'Hot Lead',
      salesStatus: 'PENDING',
      createdAt: '2024-01-15',
      assigned: 'Sarah Johnson',
      telecaller: 'Mike Wilson',
      telecallerStatus: 'ACTIVE',
      paymentStatus: 'PENDING'
    },
    {
      id: 2,
      customerId: 'MKT-0002',
      customer: 'Emily Davis',
      email: 'emily.davis@company.com',
      business: 'Marketing Agency',
      leadType: 'Social Media',
      category: 'Warm Lead',
      salesStatus: 'FOLLOW_UP',
      createdAt: '2024-01-16',
      assigned: 'David Lee',
      telecaller: 'Lisa Chen',
      telecallerStatus: 'ACTIVE',
      paymentStatus: 'IN_PROGRESS'
    },
    {
      id: 3,
      customerId: 'MKT-0003',
      customer: 'Robert Brown',
      email: 'robert.brown@business.com',
      business: 'Manufacturing Co',
      leadType: 'Referral',
      category: 'Cold Lead',
      salesStatus: 'PENDING',
      createdAt: '2024-01-17',
      assigned: 'Anna Garcia',
      telecaller: 'Tom Davis',
      telecallerStatus: 'INACTIVE',
      paymentStatus: 'PENDING'
    },
    {
      id: 4,
      customerId: 'MKT-0004',
      customer: 'Maria Rodriguez',
      email: 'maria.rodriguez@enterprise.com',
      business: 'Enterprise Solutions',
      leadType: 'Email Campaign',
      category: 'Hot Lead',
      salesStatus: 'MEETING_SCHEDULED',
      createdAt: '2024-01-18',
      assigned: 'Chris Miller',
      telecaller: 'Emma Taylor',
      telecallerStatus: 'ACTIVE',
      paymentStatus: 'COMPLETED'
    },
    {
      id: 5,
      customerId: 'MKT-0005',
      customer: 'James Wilson',
      email: 'james.wilson@startup.com',
      business: 'Startup Ventures',
      leadType: 'Trade Show',
      category: 'Warm Lead',
      salesStatus: 'PENDING',
      createdAt: '2024-01-19',
      assigned: 'Alex Johnson',
      telecaller: 'Sarah Smith',
      telecallerStatus: 'ACTIVE',
      paymentStatus: 'PENDING'
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

  useEffect(() => {
    if (!showPreview) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setShowPreview(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showPreview]);

  const getStatusBadge = (status, type) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    
    switch (type) {
      case 'sales':
        return (
          <span className={`${baseClasses} ${
            status === 'PENDING' 
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : status === 'FOLLOW_UP'
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : status === 'MEETING_SCHEDULED'
              ? 'bg-purple-100 text-purple-800 border border-purple-200'
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}>
            {status.replace('_', ' ')}
          </span>
        );
      case 'telecaller':
        return (
          <span className={`${baseClasses} ${
            status === 'ACTIVE' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {status}
          </span>
        );
      case 'payment':
        return (
          <span className={`${baseClasses} ${
            status === 'COMPLETED' 
              ? 'bg-green-100 text-green-800 border border-green-200'
              : status === 'IN_PROGRESS'
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
          }`}>
            {status.replace('_', ' ')}
          </span>
        );
      default:
        return <span className={baseClasses}>{status}</span>;
    }
  };

  const importedLeads = Array.isArray(leadsData) && leadsData.length > 0 ? leadsData : leads;

  const matchesGlobal = (lead) => {
    if (!searchTerm) return true;
    const t = searchTerm.toLowerCase();
    return (
      (lead.customer || '').toLowerCase().includes(t) ||
      (lead.email || '').toLowerCase().includes(t) ||
      (lead.business || '').toLowerCase().includes(t)
    );
  };

  const matchesColumnFilters = (lead) => {
    const cf = columnFilters;
    const includes = (val, q) => String(val || '').toLowerCase().includes(String(q || '').toLowerCase());
    return (
      (!cf.customerId || includes(lead.customerId, cf.customerId)) &&
      (!cf.customer || includes(lead.customer, cf.customer)) &&
      (!cf.email || includes(lead.email, cf.email)) &&
      (!cf.business || includes(lead.business, cf.business)) &&
      (!cf.leadType || includes(lead.leadType, cf.leadType)) &&
      (!cf.category || includes(lead.category, cf.category)) &&
      (!cf.salesStatus || includes(lead.salesStatus, cf.salesStatus)) &&
      (!cf.createdAt || includes(lead.createdAt, cf.createdAt)) &&
      (!cf.assigned || includes(lead.assigned, cf.assigned)) &&
      (!cf.telecaller || includes(lead.telecaller, cf.telecaller)) &&
      (!cf.telecallerStatus || includes(lead.telecallerStatus, cf.telecallerStatus)) &&
      (!cf.paymentStatus || includes(lead.paymentStatus, cf.paymentStatus))
    );
  };

  const filteredLeads = importedLeads.filter(lead => matchesGlobal(lead) && matchesColumnFilters(lead));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Marketing Leads</h1>
        </div>
        <p className="text-gray-600">Manage and track marketing department leads</p>
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
                placeholder="Search by name, email, or business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 rounded-full bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white shadow-inner"
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
              <Filter className="w-4 h-4 text-indigo-600" />
            </button>
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() => setShowAddCustomer(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Add Customer</span>
            </button>
            <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setLeadsData(null)}>
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
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span>Email</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-indigo-600" />
                    <span>Business</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-orange-600" />
                    <span>Lead Type</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-pink-600" />
                    <span>Category</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Sales Status</span>
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
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">{lead.customerId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{lead.customer}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{lead.email}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{lead.business}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{lead.leadType}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{lead.category}</td>
                  <td className="px-4 py-4">{getStatusBadge(lead.salesStatus, 'sales')}</td>
                  <td className="px-4 py-4">
                    <button
                      className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-full hover:bg-indigo-50 transition-colors"
                      title="Info"
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

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <AddCustomerForm onClose={() => setShowAddCustomer(false)} />
      )}

      {/* Pagination or Empty State */}
      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No leads found</div>
          <div className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  );
};

export default MarketingLeads;
