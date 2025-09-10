import React, { useState, useMemo } from 'react';
import { Calendar, Users, MessageSquare, Clock, CheckCircle, XCircle, TrendingDown, Filter, BarChart3, PieChart, RefreshCw } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesDashboard = () => {
  const [selectedExecutive, setSelectedExecutive] = useState('All Executives');
  const [dateRange, setDateRange] = useState('');
  const [showCharts, setShowCharts] = useState(false);

  // Sample data for different time periods
  const sampleData = {
    'All Executives': {
      totalLeads: 156,
      pendingLeads: 24,
      followUpLeads: 18,
      meetingScheduled: 12,
      completedLeads: 89,
      notConnected: 13,
      overallRevenue: 1547727,
      totalRevenue: 245000,
      currentMonthEarnings: 1135064,
      monthGrowth: -67.8,
      conversionRate: 57.1,
      meetingConversion: 75.0,
      pendingRate: 15.4
    },
    'John Smith': {
      totalLeads: 89,
      pendingLeads: 15,
      followUpLeads: 12,
      meetingScheduled: 8,
      completedLeads: 45,
      notConnected: 9,
      overallRevenue: 890000,
      totalRevenue: 125000,
      currentMonthEarnings: 675000,
      monthGrowth: -45.2,
      conversionRate: 50.6,
      meetingConversion: 66.7,
      pendingRate: 16.9
    }
  };

  const [currentData, setCurrentData] = useState(sampleData['All Executives']);

  const executives = ['All Executives', 'John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Chen'];

  const handleExecutiveChange = (executive) => {
    setSelectedExecutive(executive);
    setCurrentData(sampleData[executive] || sampleData['All Executives']);
  };

  // Chart data
  const pieChartData = useMemo(() => [
    { name: 'Completed', value: currentData.completedLeads, color: '#10B981' },
    { name: 'Pending', value: currentData.pendingLeads, color: '#F59E0B' },
    { name: 'Follow-up', value: currentData.followUpLeads, color: '#F97316' },
    { name: 'Meeting', value: currentData.meetingScheduled, color: '#EF4444' },
    { name: 'Not Connected', value: currentData.notConnected, color: '#DC2626' }
  ], [currentData]);

  const barChartData = useMemo(() => [
    { name: 'Total', value: currentData.totalLeads, color: '#8B5CF6' },
    { name: 'Pending', value: currentData.pendingLeads, color: '#3B82F6' },
    { name: 'Follow-up', value: currentData.followUpLeads, color: '#F59E0B' },
    { name: 'Meeting', value: currentData.meetingScheduled, color: '#EF4444' },
    { name: 'Completed', value: currentData.completedLeads, color: '#10B981' },
    { name: 'Not Connected', value: currentData.notConnected, color: '#DC2626' }
  ], [currentData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, bgColor }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );

  const MetricCard = ({ icon: Icon, title, value, subtitle, trend, trendColor }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <div className="mb-3">
        <span className={`text-2xl font-bold ${trendColor || 'text-gray-900'}`}>{value}</span>
        {trend && (
          <span className="ml-2 text-sm font-medium text-gray-500">
            <TrendingDown className="w-4 h-4 inline mr-1" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold text-purple-600">Sales Dashboard</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Live Updates</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Connected</span>
            </div>
          </div>
          <p className="text-gray-600">Sales Department Performance Overview</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCharts(!showCharts)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {showCharts ? <PieChart className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
            {showCharts ? 'Show Stats' : 'Show Charts'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sales Executive</label>
          <div className="relative">
            <select 
              value={selectedExecutive}
              onChange={(e) => handleExecutiveChange(e.target.value)}
              className="w-48 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {executives.map(exec => (
                <option key={exec} value={exec}>{exec}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <input
            type="text"
            placeholder="Select date range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-48 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {showCharts ? (
        /* Charts View */
        <div className="space-y-6">
          {/* Lead Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <StatCard 
              icon={Users} 
              title="Total Leads" 
              value={currentData.totalLeads} 
              subtitle="All leads in the system"
              color="text-purple-600"
            />
            <StatCard 
              icon={Clock} 
              title="Pending Leads" 
              value={currentData.pendingLeads} 
              subtitle="Leads awaiting action"
              color="text-blue-600"
            />
            <StatCard 
              icon={MessageSquare} 
              title="Follow-up Leads" 
              value={currentData.followUpLeads} 
              subtitle="Leads in follow-up stage"
              color="text-orange-600"
            />
            <StatCard 
              icon={Calendar} 
              title="Meeting Scheduled" 
              value={currentData.meetingScheduled} 
              subtitle="Meeting scheduled leads"
              color="text-red-600"
            />
            <StatCard 
              icon={CheckCircle} 
              title="Completed Leads" 
              value={currentData.completedLeads} 
              subtitle="Converted leads"
              color="text-green-600"
            />
            <StatCard 
              icon={XCircle} 
              title="Not Connected" 
              value={currentData.notConnected} 
              subtitle="Unreached leads"
              color="text-red-600"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Statistics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        /* Original Dashboard View */
        <>
          {/* Lead Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <StatCard 
              icon={Users} 
              title="Total Leads" 
              value={currentData.totalLeads} 
              subtitle="All leads in the system"
              color="text-purple-600"
            />
            <StatCard 
              icon={Clock} 
              title="Pending Leads" 
              value={currentData.pendingLeads} 
              subtitle="Leads awaiting action"
              color="text-blue-600"
            />
            <StatCard 
              icon={MessageSquare} 
              title="Follow-up Leads" 
              value={currentData.followUpLeads} 
              subtitle="Leads in follow-up stage"
              color="text-orange-600"
            />
            <StatCard 
              icon={Calendar} 
              title="Meeting Scheduled" 
              value={currentData.meetingScheduled} 
              subtitle="Meeting scheduled leads"
              color="text-red-600"
            />
            <StatCard 
              icon={CheckCircle} 
              title="Completed Leads" 
              value={currentData.completedLeads} 
              subtitle="Converted leads"
              color="text-green-600"
            />
            <StatCard 
              icon={XCircle} 
              title="Not Connected" 
              value={currentData.notConnected} 
              subtitle="Unreached leads"
              color="text-red-600"
            />
          </div>

          {/* Revenue Overview */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-purple-600">Revenue Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Overall Revenue */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-600">₹</div>
                  <h3 className="text-sm font-medium text-gray-900">Overall Revenue</h3>
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatCurrency(currentData.overallRevenue)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Total Revenue (All Time)</p>
              </div>

              {/* Total Revenue */}
              <div className="bg-gray-100 rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <h3 className="text-sm font-medium text-gray-900">Total Revenue</h3>
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(currentData.totalRevenue)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Filtered Revenue</p>
              </div>

              {/* Current Month */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <h3 className="text-sm font-medium text-gray-900">Current month earnings</h3>
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(currentData.currentMonthEarnings)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">September Revenue</p>
              </div>

              {/* Month Growth */}
              <div className="bg-red-50 rounded-lg border border-red-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  <h3 className="text-sm font-medium text-gray-900">Month-over-Month Growth</h3>
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-red-600">
                    {currentData.monthGrowth}%
                  </span>
                  <TrendingDown className="w-4 h-4 inline ml-2 text-red-600" />
                </div>
                <p className="text-xs text-gray-500">Revenue decreased compared to August</p>
              </div>
            </div>
          </div>

          {/* Conversion Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              icon={Users}
              title="Conversion Rate"
              value={`${currentData.conversionRate}%`}
              subtitle={`${Math.round(currentData.totalLeads * currentData.conversionRate / 100)} of ${currentData.totalLeads} leads converted`}
              trendColor="text-green-600"
            />
            
            <MetricCard
              icon={Calendar}
              title="Meeting Scheduled Conversion"
              value={`${currentData.meetingConversion}%`}
              subtitle={`${Math.round(currentData.meetingScheduled * currentData.meetingConversion / 100)} of ${currentData.meetingScheduled} leads scheduled`}
              trendColor="text-purple-600"
            />
            
            <MetricCard
              icon={Clock}
              title="Pending Rate"
              value={`${currentData.pendingRate}%`}
              subtitle={`${Math.round(currentData.totalLeads * currentData.pendingRate / 100)} of ${currentData.totalLeads} leads pending`}
              trendColor="text-orange-600"
            />
          </div>

          {/* Performance Insights */}
          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>Higher conversion rates indicate better sales performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>Higher meeting scheduled rates indicate better lead engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>Lower pending rates indicate more efficient processing</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesDashboard;