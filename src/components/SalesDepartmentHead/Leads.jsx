import React, { useState, useEffect } from 'react';
import { Search, Trash2, Filter, Upload, RefreshCw, Eye, User, Mail, Building, Shield, Tag, Clock, Calendar, Phone, CheckCircle, XCircle, Hash, MapPin, Info } from 'lucide-react';

const AllLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewLead, setPreviewLead] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'paymentQuotation' | 'meetings'

  // Sample data
  const leads = [
    {
      id: 1,
      customerId: 'CUST-0001',
      customer: 'na 9769334242',
      email: 'tejaldrive@gmail.com',
      business: 'na',
      leadType: '999 7 aug',
      category: 'na',
      salesStatus: 'PENDING',
      createdAt: '2024-01-15',
      assigned: 'John Doe',
      telecaller: 'Sarah Smith',
      telecallerStatus: 'ACTIVE',
      paymentStatus: 'PENDING'
    },
    {
      id: 2,
      customerId: 'CUST-0002',
      customer: 'na 9769868287',
      email: 'Shilpawadkar29@gmail.com',
      business: 'na',
      leadType: '999 7 aug',
      category: 'na',
      salesStatus: 'PENDING',
      createdAt: '2024-01-16',
      assigned: 'Mike Johnson',
      telecaller: 'Alex Brown',
      telecallerStatus: 'INACTIVE',
      paymentStatus: 'COMPLETED'
    },
    {
      id: 3,
      customerId: 'CUST-0003',
      customer: 'na 9840457999',
      email: 'rahul.44@gmail.com',
      business: 'na',
      leadType: '999 7 aug',
      category: 'na',
      salesStatus: 'PENDING',
      createdAt: '2024-01-17',
      assigned: 'Lisa Wilson',
      telecaller: 'Tom Davis',
      telecallerStatus: 'ACTIVE',
      paymentStatus: 'PENDING'
    },
    {
      id: 4,
      customerId: 'CUST-0004',
      customer: 'na 9876543210',
      email: 'bluestarindustriespvtltd@gmail.com',
      business: 'na',
      leadType: '999 7 aug',
      category: 'na',
      salesStatus: 'PENDING',
      createdAt: '2024-01-18',
      assigned: 'David Lee',
      telecaller: 'Emma Taylor',
      telecallerStatus: 'ACTIVE',
      paymentStatus: 'IN_PROGRESS'
    },
    {
      id: 5,
      customerId: 'CUST-0005',
      customer: 'na 9123456789',
      email: 'testuser@gmail.com',
      business: 'na',
      leadType: '999 7 aug',
      category: 'na',
      salesStatus: 'PENDING',
      createdAt: '2024-01-19',
      assigned: 'Anna Garcia',
      telecaller: 'Chris Miller',
      telecallerStatus: 'INACTIVE',
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
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`}>
            {status}
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
            {status}
          </span>
        );
      default:
        return <span className={baseClasses}>{status}</span>;
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.business.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">All Leads</h1>
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2">
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>Delete</span>
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>Filters</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Upload className="w-4 h-4 text-white" />
              <span>Import Leads</span>
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
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>Created</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-sky-600" />
                    <span>Assigned</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-cyan-600" />
                    <span>Telecaller</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Telecaller Status</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Payment Status</span>
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
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {lead.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {lead.business}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {lead.leadType}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {lead.category}
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(lead.salesStatus, 'sales')}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {lead.createdAt}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {lead.assigned}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {lead.telecaller}
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(lead.telecallerStatus, 'telecaller')}
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(lead.paymentStatus, 'payment')}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View" onClick={() => openPreview(lead)}>
                        <Eye className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-full hover:bg-indigo-50 transition-colors"
                        title="Info"
                        aria-label="Info"
                        onClick={() => openPreview(lead)}
                      >
                        i
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && previewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-3xl max-h-[70vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200" role="dialog" aria-modal="true">
            {/* Header */}
            <div className="flex items-start justify-between px-6 md:px-8 py-5 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">{previewLead.customer}</h2>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${previewLead.salesStatus === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                    {previewLead.salesStatus}
                  </span>
                </div>
                <div className="text-gray-600">{previewLead.business}</div>
              </div>
              <button
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPreview(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 md:px-8 pt-4">
              <div className="flex items-center gap-3">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'paymentQuotation', label: 'Payment & Quotation' },
                  { key: 'meetings', label: 'Meetings' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === tab.key ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="px-6 md:px-8 py-5">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Lead Summary - mirrors All Leads table columns */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500">Customer ID</div>
                        <div className="text-sm text-gray-900">{previewLead.customerId || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Customer</div>
                        <div className="text-sm text-gray-900">{previewLead.customer || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Email</div>
                        <div className="text-sm text-gray-900 truncate">{previewLead.email || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Business</div>
                        <div className="text-sm text-gray-900">{previewLead.business || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Lead Type</div>
                        <div className="text-sm text-gray-900">{previewLead.leadType || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Category</div>
                        <div className="text-sm text-gray-900">{previewLead.category || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Sales Status</div>
                        <div className="mt-1">{getStatusBadge(previewLead.salesStatus, 'sales')}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Created</div>
                        <div className="text-sm text-gray-900">{previewLead.createdAt || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Assigned</div>
                        <div className="text-sm text-gray-900">{previewLead.assigned || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Telecaller</div>
                        <div className="text-sm text-gray-900">{previewLead.telecaller || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Telecaller Status</div>
                        <div className="mt-1">{getStatusBadge(previewLead.telecallerStatus, 'telecaller')}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500">Payment Status</div>
                        <div className="mt-1">{getStatusBadge(previewLead.paymentStatus, 'payment')}</div>
                      </div>
                    </div>
                  </div>
                  {/* Lead Information */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Contact Person</div>
                          <div className="text-sm text-gray-600">N/A</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Tag className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Lead Type</div>
                          <div className="text-xs inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{previewLead.leadType}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Business Name</div>
                          <div className="text-sm text-gray-600">{previewLead.business || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Category</div>
                          <div className="text-xs inline-flex items-center px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{previewLead.category || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Location</div>
                          <div className="text-sm text-gray-600">N/A</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Created Date</div>
                          <div className="text-sm text-gray-600">{previewLead.createdAt || 'Invalid date'}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Contact</div>
                          <div className="text-sm text-gray-600">N/A</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Last Updated</div>
                          <div className="text-sm text-gray-600">{new Date().toDateString()}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Description</div>
                          <div className="text-sm text-gray-600">N/A</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assignment */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment</h3>
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">A</div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Assigned To</div>
                          <div className="text-sm text-gray-600 truncate max-w-xs">{previewLead.assigned}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">N</div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Telecaller Assigned</div>
                          <div className="text-sm text-gray-600">{previewLead.telecaller || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Telecaller Status</div>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${previewLead.telecallerStatus === 'ACTIVE' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                            {previewLead.telecallerStatus}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'paymentQuotation' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment</h3>
                    <div className="text-sm text-gray-600">No payment information available.</div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quotation</h3>
                    <div className="text-sm text-gray-600">No quotations available.</div>
                  </div>
                </div>
              )}
              {activeTab === 'meetings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Meeting / Remark</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Meeting</option>
                          <option>Call</option>
                          <option>Follow-up</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
                      <textarea rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Add meeting notes or remarks..."></textarea>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save</button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-md font-semibold text-gray-900 mb-2">Previous Meetings / Remarks</h4>
                    <div className="text-sm text-gray-600">No meetings or remarks yet.</div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 md:px-8 py-4 border-t border-gray-100 flex items-center justify-end">
              <button
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setShowPreview(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
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

export default AllLeads;
