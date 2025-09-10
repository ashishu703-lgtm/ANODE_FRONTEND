import React, { useState } from 'react';
import { Search, Trash2, Filter, Upload, RefreshCw, Eye, MoreVertical, User, Mail, Building, Shield, Tag, Clock, Calendar, Phone, CheckCircle, XCircle } from 'lucide-react';

const AllLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);

  // Sample data
  const leads = [
    {
      id: 1,
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
        <p className="text-gray-600">Manage and track all your leads</p>
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
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import Leads</span>
            </button>
            <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-4 h-4" />
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
                    <User className="w-4 h-4" />
                    <span>Customer</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Business</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Lead Type</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>Category</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Sales Status</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Assigned</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Telecaller</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Telecaller Status</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4" />
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
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {lead.customer}
                  </td>
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
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
