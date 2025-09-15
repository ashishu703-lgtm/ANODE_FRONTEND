import React, { useState } from 'react';
import { Search, Filter, Download, User, DollarSign, Clock, Calendar, Link, Copy, Eye, MoreHorizontal, CreditCard, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const PaymentsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  
  const [payments, setPayments] = useState([
    {
      id: 1,
      customer: {
        name: 'na',
        email: 'bharatfincappvtltd@gmail.com',
        phone: '8451868999'
      },
      amount: 12000,
      status: 'Pending',
      created: '10 Sept 2025, 11:33 am',
      paymentLink: 'https://rzp.io/rzp/...'
    },
    {
      id: 2,
      customer: {
        name: 'na',
        email: 'projapatienterprisesag@gmail.com',
        phone: '8871863773'
      },
      amount: 12000,
      status: 'Expired',
      created: '09 Sept 2025, 05:00 pm',
      paymentLink: 'https://rzp.io/rzp/...'
    },
    {
      id: 3,
      customer: {
        name: 'na',
        email: 'projapatienterprisesag@gmail.com',
        phone: '8871863773'
      },
      amount: 12000,
      status: 'Expired',
      created: '09 Sept 2025, 03:31 pm',
      paymentLink: 'https://rzp.io/rzp/...'
    },
    {
      id: 4,
      customer: {
        name: 'na',
        email: 'shadakshari.chikmath@gmail.com',
        phone: '9741456971'
      },
      amount: 12000,
      status: 'Expired',
      created: '09 Sept 2025, 10:39 am',
      paymentLink: 'https://rzp.io/rzp/...'
    },
    {
      id: 5,
      customer: {
        name: 'na',
        email: 'vikramvermakrd@gmail.com',
        phone: '7014131224'
      },
      amount: 9000,
      status: 'Expired',
      created: '08 Sept 2025, 05:10 pm',
      paymentLink: 'https://rzp.io/rzp/...'
    }
  ]);

  // Calculate stats
  const stats = {
    allPayments: payments.length,
    totalValue: payments.reduce((sum, payment) => sum + payment.amount, 0),
    created: payments.filter(p => p.status === 'Created').length,
    pending: payments.filter(p => p.status === 'Pending').length,
    paid: payments.filter(p => p.status === 'Paid').length,
    expired: payments.filter(p => p.status === 'Expired').length
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.phone.includes(searchTerm) ||
      payment.amount.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All Status' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Expired':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Created':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'Expired':
        return <XCircle className="w-4 h-4" />;
      case 'Created':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
  };

  const handleViewPayment = (id) => {
    console.log('View payment:', id);
  };

  const StatCard = ({ title, value, subtitle, color, bgColor, icon: Icon }) => (
    <div className={`${bgColor} rounded-lg border p-4 shadow-sm`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        </div>
      </div>
      <div className="mb-1">
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
      </div>
      <p className="text-xs text-gray-600">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="All Payments"
          value={stats.allPayments}
          subtitle={`₹${stats.totalValue.toLocaleString('en-IN')} total value`}
          color="text-blue-600"
          bgColor="bg-blue-50 border-blue-200"
          icon={CreditCard}
        />
        <StatCard
          title="Created"
          value={stats.created}
          subtitle="Created payments"
          color="text-purple-600"
          bgColor="bg-purple-50 border-purple-200"
          icon={Clock}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          subtitle="Money awaiting"
          color="text-yellow-600"
          bgColor="bg-yellow-50 border-yellow-200"
          icon={Clock}
        />
        <StatCard
          title="Paid"
          value={stats.paid}
          subtitle="₹0 received"
          color="text-green-600"
          bgColor="bg-green-50 border-green-200"
          icon={CheckCircle}
        />
        <StatCard
          title="Expired"
          value={stats.expired}
          subtitle="Expired payments"
          color="text-red-600"
          bgColor="bg-red-50 border-red-200"
          icon={XCircle}
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer name, email, or payment ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            />
          </div>
          
          <div className="flex items-center gap-3 ml-6">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All Status">All Status</option>
                <option value="Created">Created</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <User className="w-4 h-4 text-blue-500" />
                    Customer
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    Amount
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    Status
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    Created
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Link className="w-4 h-4 text-cyan-500" />
                    Payment Link
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <MoreHorizontal className="w-4 h-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900 mb-1">{payment.customer.name}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <span>✉</span>
                        <span className="truncate max-w-[200px]">{payment.customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>📞</span>
                        <span>{payment.customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-green-600 font-semibold text-lg">
                      {formatCurrency(payment.amount)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{payment.created}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 font-mono text-sm truncate max-w-[150px]">
                        {payment.paymentLink}
                      </span>
                      <button
                        onClick={() => handleCopyLink(payment.paymentLink)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="Copy link"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleViewPayment(payment.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No results message */}
        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Table Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredPayments.length} of {payments.length} payments
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">1</span>
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsDashboard;