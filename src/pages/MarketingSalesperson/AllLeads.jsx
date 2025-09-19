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
  Filter,
  Hash,
  Mail,
  Building,
  Shield,
  Tag,
  Users,
  Upload,
  Eye,
  Save,
  CreditCard,
  Clock,
  Download
} from 'lucide-react';

// Edit Lead Modal Component
const EditLeadModal = ({ lead, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: lead.name,
    phone: lead.phone,
    address: lead.address,
    gstNo: lead.gstNo,
    productType: lead.productType,
    state: lead.state,
    leadSource: lead.leadSource,
    customerType: lead.customerType,
    date: lead.date,
    visitingStatus: lead.visitingStatus,
    finalStatus: lead.finalStatus,
    paymentStatus: lead.paymentStatus
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...lead, ...formData });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Edit Lead - {lead.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST No.</label>
              <input
                type="text"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Industrial Equipment">Industrial Equipment</option>
                <option value="Commercial Lighting">Commercial Lighting</option>
                <option value="Power Solutions">Power Solutions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Rajasthan">Rajasthan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
              <select
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Social Media">Social Media</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
              <select
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="B2B">B2B</option>
                <option value="B2C">B2C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visiting Status</label>
              <select
                name="visitingStatus"
                value={formData.visitingStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Visited">Visited</option>
                <option value="Not Visited">Not Visited</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Final Status</label>
              <select
                name="finalStatus"
                value={formData.finalStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Interested">Interested</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Pending">Pending</option>
                <option value="Not Started">Not Started</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add Customer Modal Component
const AddCustomerModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    gstNo: '',
    productType: '',
    state: '',
    leadSource: '',
    customerType: '',
    date: new Date().toISOString().split('T')[0],
    visitingStatus: 'Not Visited',
    finalStatus: 'Pending',
    paymentStatus: 'Not Started'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Customer</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST No. *</label>
              <input
                type="text"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type *</label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Product Type</option>
                <option value="Industrial Equipment">Industrial Equipment</option>
                <option value="Commercial Lighting">Commercial Lighting</option>
                <option value="Power Solutions">Power Solutions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select State</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Rajasthan">Rajasthan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source *</label>
              <select
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Lead Source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Social Media">Social Media</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type *</label>
              <select
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Customer Type</option>
                <option value="B2B">B2B</option>
                <option value="B2C">B2C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visiting Status</label>
              <select
                name="visitingStatus"
                value={formData.visitingStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Not Visited">Not Visited</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Visited">Visited</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Final Status</label>
              <select
                name="finalStatus"
                value={formData.finalStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Interested">Interested</option>
                <option value="Not Interested">Not Interested</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Not Started">Not Started</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
                <option value="Paid">Paid</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Customer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Lead Import Modal Component
const LeadImportModal = ({ onImport, onClose }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setError('');
      parseCSV(file);
    } else {
      setError('Please select a valid CSV file');
    }
  };

  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim());
          const lead = {};
          headers.forEach((header, index) => {
            lead[header.toLowerCase().replace(/\s+/g, '')] = values[index] || '';
          });
          return lead;
        })
        .map(lead => ({
          name: lead.name || '',
          phone: lead.phone || '',
          address: lead.address || '',
          gstNo: lead.gstno || lead.gstno || '',
          productType: lead.producttype || lead.producttype || 'Industrial Equipment',
          state: lead.state || 'Madhya Pradesh',
          leadSource: lead.leadsource || lead.leadsource || 'Website',
          customerType: lead.customertype || lead.customertype || 'B2B',
          date: lead.date || new Date().toISOString().split('T')[0],
          visitingStatus: lead.visitingstatus || lead.visitingstatus || 'Not Visited',
          finalStatus: lead.finalstatus || lead.finalstatus || 'Pending',
          paymentStatus: lead.paymentstatus || lead.paymentstatus || 'Not Started'
        }));
      
      setCsvData(data);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (csvData.length > 0) {
      setIsProcessing(true);
      setTimeout(() => {
        onImport(csvData);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const downloadTemplate = () => {
    const template = [
      'Name,Phone,Address,GST No,Product Type,State,Lead Source,Customer Type,Date,Visiting Status,Final Status,Payment Status',
      'John Doe,+91 98765 43210,123 Main St,23ABCDE1234F1Z5,Industrial Equipment,Madhya Pradesh,Website,B2B,2025-01-20,Not Visited,Pending,Not Started',
      'Jane Smith,+91 87654 32109,456 Oak Ave,23FGHIJ5678K2L6,Commercial Lighting,Maharashtra,Referral,B2C,2025-01-21,Scheduled,Interested,Pending'
    ].join('\n');
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lead_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Import Leads from CSV</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Template Download */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">CSV Template</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download the template to see the required format for your CSV file.
            </p>
            <button
              onClick={downloadTemplate}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Template</span>
            </button>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload CSV File</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Click to upload CSV file or drag and drop
                </span>
                <span className="text-xs text-gray-500">
                  CSV files only
                </span>
              </label>
            </div>
            {csvFile && (
              <div className="mt-2 text-sm text-green-600">
                ✓ File selected: {csvFile.name}
              </div>
            )}
            {error && (
              <div className="mt-2 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          {/* Preview Data */}
          {csvData.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Preview ({csvData.length} leads found)
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500 mb-2">
                  <div>Name</div>
                  <div>Phone</div>
                  <div>Product Type</div>
                  <div>Status</div>
                </div>
                {csvData.slice(0, 5).map((lead, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 text-xs text-gray-700 py-1 border-b border-gray-200">
                    <div className="truncate">{lead.name}</div>
                    <div className="truncate">{lead.phone}</div>
                    <div className="truncate">{lead.productType}</div>
                    <div className="truncate">{lead.finalStatus}</div>
                  </div>
                ))}
                {csvData.length > 5 && (
                  <div className="text-xs text-gray-500 mt-2">
                    ... and {csvData.length - 5} more leads
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={csvData.length === 0 || isProcessing}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Importing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Import {csvData.length} Leads</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
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
  const [leads, setLeads] = useState([
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
      transferredLeads: 0,
      paymentStatus: 'Pending',
      meetings: [
        { date: '2025-01-20', time: '10:00 AM', type: 'Initial Meeting', status: 'Scheduled' },
        { date: '2025-01-25', time: '2:00 PM', type: 'Follow-up', status: 'Planned' }
      ]
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
      transferredLeads: 1,
      paymentStatus: 'Partial',
      meetings: [
        { date: '2025-01-18', time: '11:00 AM', type: 'Product Demo', status: 'Completed' },
        { date: '2025-01-22', time: '3:00 PM', type: 'Proposal Discussion', status: 'Scheduled' }
      ]
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
      transferredLeads: 0,
      paymentStatus: 'Not Started',
      meetings: [
        { date: '2025-01-21', time: '9:00 AM', type: 'Initial Contact', status: 'Planned' }
      ]
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
      transferredLeads: 0,
      paymentStatus: 'Paid',
      meetings: [
        { date: '2025-01-19', time: '2:30 PM', type: 'Site Visit', status: 'Completed' },
        { date: '2025-01-23', time: '10:30 AM', type: 'Final Discussion', status: 'Scheduled' }
      ]
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
      transferredLeads: 0,
      paymentStatus: 'Cancelled',
      meetings: [
        { date: '2025-01-17', time: '1:00 PM', type: 'Initial Meeting', status: 'Completed' }
      ]
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

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setActiveTab('Overview');
    setShowViewModal(true);
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setShowEditModal(true);
  };

  const handleSaveLead = (updatedLead) => {
    setLeads(leads.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
    setShowEditModal(false);
    setSelectedLead(null);
  };

  const handleAddLead = (newLead) => {
    const leadWithId = {
      ...newLead,
      id: Math.max(...leads.map(l => l.id)) + 1,
      transferredLeads: 0,
      meetings: []
    };
    setLeads([...leads, leadWithId]);
    setShowAddModal(false);
  };

  const handleImportLeads = (importedLeads) => {
    const leadsWithIds = importedLeads.map((lead, index) => ({
      ...lead,
      id: Math.max(...leads.map(l => l.id)) + index + 1,
      transferredLeads: 0,
      meetings: []
    }));
    setLeads([...leads, ...leadsWithIds]);
    setShowImportModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen pb-16">
      {/* Top Section - Search and Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, or business"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 ml-6">
            {/* Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <Filter className="w-5 h-5 text-purple-600" />
            </button>

            {/* Add Customer Button */}
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Customer</span>
            </button>

            {/* Lead Import Button */}
            <button 
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Lead Import</span>
            </button>

            {/* Refresh Button */}
            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
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
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-purple-600" />
                    <span>#</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>NAME & PHONE</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>ADDRESS</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>GST NO.</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-purple-600" />
                    <span>PRODUCT TYPE</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Map className="w-4 h-4 text-blue-600" />
                    <span>STATE</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-orange-600" />
                    <span>LEAD SOURCE</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>CUSTOMER TYPE</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span>DATE</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>VISITING STATUS</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>FINAL STATUS</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <ArrowUpDown className="w-4 h-4 text-purple-600" />
                    <span>TRANSFERRED LEADS</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Edit className="w-4 h-4 text-gray-600" />
                    <span>ACTION</span>
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
                    <td className="px-1 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getFinalStatusColor(lead.finalStatus)}`}>
                        {lead.finalStatus}
                      </span>
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {lead.transferredLeads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewLead(lead)}
                          className="w-8 h-8 rounded-full border-2 border-blue-500 bg-white hover:bg-blue-50 transition-colors flex items-center justify-center"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button 
                          onClick={() => handleEditLead(lead)}
                          className="w-8 h-8 rounded-full border-2 border-orange-500 bg-white hover:bg-orange-50 transition-colors flex items-center justify-center"
                          title="Edit Lead"
                        >
                          <Edit className="w-4 h-4 text-orange-500" />
                        </button>
                      </div>
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

      {/* View Lead Details Modal */}
      {showViewModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Lead Details - MKT-{selectedLead.id.toString().padStart(4, '0')}</h2>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('Overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'Overview'
                      ? 'border-blue-500 text-blue-600 bg-white rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('Payment Status')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'Payment Status'
                      ? 'border-blue-500 text-blue-600 bg-white rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Payment Status
                </button>
                <button
                  onClick={() => setActiveTab('Meetings')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'Meetings'
                      ? 'border-blue-500 text-blue-600 bg-white rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Meetings
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'Overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-gray-900 mt-1">{selectedLead.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-gray-900 mt-1">{selectedLead.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Address</label>
                      <p className="text-gray-900 mt-1">{selectedLead.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">GST No.</label>
                      <p className="text-gray-900 mt-1">{selectedLead.gstNo}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Product Type</label>
                      <p className="text-gray-900 mt-1">{selectedLead.productType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">State</label>
                      <p className="text-gray-900 mt-1">{selectedLead.state}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Lead Source</label>
                      <p className="text-gray-900 mt-1">{selectedLead.leadSource}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Customer Type</label>
                      <p className="text-gray-900 mt-1">{selectedLead.customerType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date</label>
                      <p className="text-gray-900 mt-1">{selectedLead.date}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Visiting Status</label>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getVisitingStatusColor(selectedLead.visitingStatus)}`}>
                        {selectedLead.visitingStatus}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Final Status</label>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getFinalStatusColor(selectedLead.finalStatus)}`}>
                        {selectedLead.finalStatus}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Status Tab */}
              {activeTab === 'Payment Status' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Current Payment Status</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedLead.paymentStatus)}`}>
                        {selectedLead.paymentStatus}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-xl font-semibold text-gray-900">₹50,000</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Paid Amount</p>
                        <p className="text-xl font-semibold text-gray-900">₹{selectedLead.paymentStatus === 'Paid' ? '50,000' : selectedLead.paymentStatus === 'Partial' ? '25,000' : '0'}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Pending Amount</p>
                        <p className="text-xl font-semibold text-gray-900">₹{selectedLead.paymentStatus === 'Paid' ? '0' : selectedLead.paymentStatus === 'Partial' ? '25,000' : '50,000'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Meetings Tab */}
              {activeTab === 'Meetings' && (
                <div className="space-y-4">
                  {selectedLead.meetings.map((meeting, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{meeting.type}</h4>
                          <p className="text-sm text-gray-500 mt-1">{meeting.date} at {meeting.time}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          meeting.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          meeting.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Lead Modal */}
      {showEditModal && selectedLead && (
        <EditLeadModal 
          lead={selectedLead} 
          onSave={handleSaveLead}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <AddCustomerModal 
          onSave={handleAddLead}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Lead Import Modal */}
      {showImportModal && (
        <LeadImportModal 
          onImport={handleImportLeads}
          onClose={() => setShowImportModal(false)}
        />
      )}
    </div>
  );
};

export default AllLeads;
