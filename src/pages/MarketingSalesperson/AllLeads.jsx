import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  User, 
  MapPin, 
  FileText, 
  Package, 
  Map, 
  Globe, 
  Calendar, 
  ArrowUpDown, 
  Edit, 
  Plus,
  X,
  Filter
} from 'lucide-react';

const AllLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    gstNo: '',
    visitingStatus: '',
    finalStatus: '',
    leadSource: '',
    customerType: '',
    productType: '',
    state: '',
    date: ''
  });
  const [leads] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      address: '123 MG Road, Indore, MP',
      gstNo: '23ABCDE1234F1Z5',
      productType: 'Industrial Equipment',
      state: 'Madhya Pradesh',
      leadSource: 'Website',
      customerType: 'B2B',
      date: '2025-01-17',
      visitingStatus: 'Scheduled',
      finalStatus: 'Pending',
      transferredLeads: 0
    },
    {
      id: 2,
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      address: '456 Business Park, Bhopal, MP',
      gstNo: '23FGHIJ5678K2L6',
      productType: 'Commercial Lighting',
      state: 'Madhya Pradesh',
      leadSource: 'Referral',
      customerType: 'B2B',
      date: '2025-01-16',
      visitingStatus: 'Visited',
      finalStatus: 'Interested',
      transferredLeads: 1
    },
    {
      id: 3,
      name: 'Amit Patel',
      phone: '+91 76543 21098',
      address: '789 Industrial Area, Jabalpur, MP',
      gstNo: '23KLMNO9012P3M7',
      productType: 'Power Solutions',
      state: 'Madhya Pradesh',
      leadSource: 'Cold Call',
      customerType: 'B2B',
      date: '2025-01-15',
      visitingStatus: 'Not Visited',
      finalStatus: 'Pending',
      transferredLeads: 0
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      phone: '+91 65432 10987',
      address: '321 Tech Hub, Gwalior, MP',
      gstNo: '23PQRST3456U4V8',
      productType: 'Industrial Equipment',
      state: 'Madhya Pradesh',
      leadSource: 'Social Media',
      customerType: 'B2C',
      date: '2025-01-14',
      visitingStatus: 'Scheduled',
      finalStatus: 'Interested',
      transferredLeads: 0
    },
    {
      id: 5,
      name: 'Vikram Singh',
      phone: '+91 54321 09876',
      address: '654 Corporate Plaza, Ujjain, MP',
      gstNo: '23WXYZ7890A5B9',
      productType: 'Commercial Lighting',
      state: 'Madhya Pradesh',
      leadSource: 'Website',
      customerType: 'B2B',
      date: '2025-01-13',
      visitingStatus: 'Visited',
      finalStatus: 'Not Interested',
      transferredLeads: 0
    }
  ]);

  const filteredLeads = leads.filter(lead => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.address.toLowerCase().includes(searchTerm) ||
      lead.gstNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.productType.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter conditions
    const matchesFilters = 
      (filters.name === '' || lead.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.address === '' || lead.address.toLowerCase().includes(filters.address.toLowerCase())) &&
      (filters.gstNo === '' || lead.gstNo.toLowerCase().includes(filters.gstNo.toLowerCase())) &&
      (filters.visitingStatus === '' || lead.visitingStatus === filters.visitingStatus) &&
      (filters.finalStatus === '' || lead.finalStatus === filters.finalStatus) &&
      (filters.leadSource === '' || lead.leadSource === filters.leadSource) &&
      (filters.customerType === '' || lead.customerType === filters.customerType) &&
      (filters.productType === '' || lead.productType === filters.productType) &&
      (filters.state === '' || lead.state === filters.state) &&
      (filters.date === '' || lead.date === filters.date);
    
    return matchesSearch && matchesFilters;
  });

  const getVisitingStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Visited': return 'bg-green-100 text-green-800';
      case 'Not Visited': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFinalStatusColor = (status) => {
    switch (status) {
      case 'Interested': return 'bg-green-100 text-green-800';
      case 'Not Interested': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">All Leads</h1>
            <p className="text-sm text-gray-600">Manage and track your sales leads.</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              showFilters 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>


      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {/* Filter Row */}
              {showFilters && (
                <tr className="bg-blue-50">
                  <th className="px-6 py-2">
                    {/* # Column - No filter */}
                  </th>
                  <th className="px-6 py-2">
                    <input
                      type="text"
                      placeholder="Filter customer"
                      value={filters.name || ''}
                      onChange={(e) => setFilters({...filters, name: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-2">
                    <input
                      type="text"
                      placeholder="Filter address"
                      value={filters.address || ''}
                      onChange={(e) => setFilters({...filters, address: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-2">
                    <input
                      type="text"
                      placeholder="Filter GST"
                      value={filters.gstNo || ''}
                      onChange={(e) => setFilters({...filters, gstNo: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-2">
                    <select
                      value={filters.productType}
                      onChange={(e) => setFilters({...filters, productType: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">All Type</option>
                      <option value="Industrial Equipment">Industrial Equipment</option>
                      <option value="Commercial Lighting">Commercial Lighting</option>
                      <option value="Power Solutions">Power Solutions</option>
                    </select>
                  </th>
                  <th className="px-6 py-2">
                    <select
                      value={filters.state}
                      onChange={(e) => setFilters({...filters, state: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">All St</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                  </th>
                  <th className="px-6 py-2">
                    <select
                      value={filters.leadSource}
                      onChange={(e) => setFilters({...filters, leadSource: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">All Sou</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Social Media">Social Media</option>
                    </select>
                  </th>
                  <th className="px-6 py-2">
                    <select
                      value={filters.customerType}
                      onChange={(e) => setFilters({...filters, customerType: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">All Types</option>
                      <option value="B2B">B2B</option>
                      <option value="B2C">B2C</option>
                    </select>
                  </th>
                  <th className="px-6 py-2">
                    <input
                      type="date"
                      value={filters.date || ''}
                      onChange={(e) => setFilters({...filters, date: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-2">
                    <select
                      value={filters.visitingStatus}
                      onChange={(e) => setFilters({...filters, visitingStatus: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">All Statuses</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Visited">Visited</option>
                      <option value="Not Visited">Not Visited</option>
                    </select>
                  </th>
                  <th className="px-6 py-2">
                    <select
                      value={filters.finalStatus}
                      onChange={(e) => setFilters({...filters, finalStatus: e.target.value})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">All Sta</option>
                      <option value="Interested">Interested</option>
                      <option value="Not Interested">Not Interested</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </th>
                  <th className="px-6 py-2">
                    {/* Transferred Leads - No filter */}
                  </th>
                  <th className="px-6 py-2">
                    {/* Action - No filter */}
                  </th>
                </tr>
              )}
              
              {/* Header Row */}
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Name & Phone</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>Address</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>GST No.</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4" />
                    <span>Product Type</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <Map className="w-4 h-4" />
                    <span>State</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>Lead Source</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Customer Type</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Date</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>Visiting Status</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>Final Status</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <ArrowUpDown className="w-4 h-4" />
                    <span>Transferred Leads</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <Edit className="w-4 h-4" />
                    <span>Action</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="truncate">{lead.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.gstNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.productType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.leadSource}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.customerType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getVisitingStatusColor(lead.visitingStatus)}`}>
                        {lead.visitingStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getFinalStatusColor(lead.finalStatus)}`}>
                        {lead.finalStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.transferredLeads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Search className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">No customers available</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllLeads;
