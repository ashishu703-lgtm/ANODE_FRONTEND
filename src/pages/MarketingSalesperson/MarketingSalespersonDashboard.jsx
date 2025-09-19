import React, { useState } from 'react';
import { 
  Users, 
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
  Phone,
  Mail,
  MapPin,
  UserPlus,
  CalendarDays,
  DollarSign,
  TrendingUp as TrendingUpIcon,
  ShoppingCart,
  Hash,
  User,
  FileText,
  Package,
  Map,
  Globe,
  MessageCircle
} from 'lucide-react';
import AllLeads from './AllLeads';
import Visits from './Visits';

const MarketingSalespersonDashboard = ({ activeView }) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <MarketingDashboardContent selectedTab={selectedTab} setSelectedTab={setSelectedTab} />;
      case 'all-leads':
        return <AllLeads />;
      case 'visits':
        return <Visits />;
      case 'orders':
        return <OrdersContent />;
      case 'toolbox':
        return <ToolboxContent />;
      default:
        return <MarketingDashboardContent selectedTab={selectedTab} setSelectedTab={setSelectedTab} />;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {renderContent()}
    </div>
  );
};

// Marketing Dashboard Content
const MarketingDashboardContent = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen overflow-y-auto max-h-screen">
        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`flex items-center space-x-2 pb-2 font-medium text-sm transition-colors ${
                selectedTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setSelectedTab('performance')}
              className={`flex items-center space-x-2 pb-2 font-medium text-sm transition-colors ${
                selectedTab === 'performance'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Performance</span>
            </button>
          </nav>
        </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && <OverviewContent />}
      {selectedTab === 'performance' && <PerformanceContent />}
    </div>
  );
};

// Overview Content
const OverviewContent = () => {
  // Overview Data - same structure as salesperson dashboard
  const overviewData = {
    metrics: [
      {
        title: "Total Leads",
        value: "0",
        subtitle: "No leads assigned yet",
        icon: UserPlus,
        color: "bg-blue-50 text-blue-600 border-blue-200",
        trend: "0%",
        trendUp: true
      },
      {
        title: "Conversion Rate",
        value: "0%",
        subtitle: "No conversions yet",
        icon: CheckCircle,
        color: "bg-green-50 text-green-600 border-green-200",
        trend: "0%",
        trendUp: true
      },
      {
        title: "Pending Rate",
        value: "0%",
        subtitle: "No pending leads",
        icon: Clock,
        color: "bg-orange-50 text-orange-600 border-orange-200",
        trend: "0%",
        trendUp: false
      },
      {
        title: "Total Revenue",
        value: "₹0",
        subtitle: "No revenue generated yet",
        icon: IndianRupee,
        color: "bg-purple-50 text-purple-600 border-purple-200",
        trend: "0%",
        trendUp: true
      },
    ],
    leadStatuses: [
      {
        title: "Pending",
        count: "0",
        subtitle: "No pending leads",
        icon: Clock,
        color: "bg-orange-50 text-orange-600 border-orange-200"
      },
      {
        title: "Meeting scheduled",
        count: "0",
        subtitle: "No meetings scheduled",
        icon: Calendar,
        color: "bg-purple-50 text-purple-600 border-purple-200"
      },
      {
        title: "Follow Up",
        count: "0",
        subtitle: "No follow-ups required",
        icon: TrendingUp,
        color: "bg-blue-50 text-blue-600 border-blue-200"
      },
      {
        title: "Win Leads",
        count: "0",
        subtitle: "No successful conversions",
        icon: CheckCircle,
        color: "bg-green-50 text-green-600 border-green-200"
      },
      {
        title: "Not Interested",
        count: "0",
        subtitle: "No declined leads",
        icon: XCircle,
        color: "bg-red-50 text-red-600 border-red-200"
      },
      {
        title: "Loose Leads",
        count: "0",
        subtitle: "No unreachable leads",
        icon: AlertCircle,
        color: "bg-gray-50 text-gray-600 border-gray-200"
      }
    ]
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewData.metrics.map((metric, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-sm border p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 ${metric.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>
              </div>
              <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center">
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {metric.trendUp ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${metric.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lead Status Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Lead Status Summary</h3>
          </div>
          <p className="text-sm text-gray-500">Overview of your leads by status</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {overviewData.leadStatuses.map((status, index) => (
            <div key={index} className={`flex items-center p-4 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-1 ${status.color}`}>
              <div className="w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center mr-3">
                <status.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{status.title}</p>
                <p className="text-xl font-bold text-gray-900">{status.count}</p>
                <p className="text-xs text-gray-500">{status.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Leads Card */}
        <div className="bg-white rounded-lg shadow-sm border border-indigo-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-indigo-800">Transfer Leads</h3>
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600 mb-2">0</p>
            <p className="text-sm text-gray-500">No transferred leads</p>
          </div>
        </div>

        {/* Weekly Leads Activity Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Weekly Leads Activity</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end h-24">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mb-2">
                    <span className="text-xs text-blue-600 font-medium">0</span>
                  </div>
                  <div className="w-6 h-6 bg-blue-200 rounded"></div>
                  <span className="text-xs text-gray-600 mt-1">{day}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center">Leads Generated This Week</p>
          </div>
        </div>

        {/* Lead Sources Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Lead Sources</h3>
          </div>
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Website', color: 'bg-blue-500', count: 0 },
              { label: 'Social Media', color: 'bg-orange-500', count: 0 },
              { label: 'Email Campaign', color: 'bg-purple-500', count: 0 },
              { label: 'Referrals', color: 'bg-green-500', count: 0 },
              { label: 'Cold Calls', color: 'bg-red-500', count: 0 },
              { label: 'Other', color: 'bg-gray-500', count: 0 }
            ].map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${source.color} mr-2`}></div>
                  <span className="text-sm text-gray-600">{source.label}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{source.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Trend Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-800">Monthly Revenue Trend</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-end h-24">
            {[
              { month: 'Jan', value: 0 },
              { month: 'Feb', value: 0 },
              { month: 'Mar', value: 0 },
              { month: 'Apr', value: 0 },
              { month: 'May', value: 0 },
              { month: 'Jun', value: 0 }
            ].map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center mb-2">
                  <span className="text-xs text-green-600 font-medium">{data.value}</span>
                </div>
                <div className="w-8 h-1 bg-blue-200 rounded"></div>
                <span className="text-xs text-gray-600 mt-1">{data.month}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">Revenue in Thousands (₹)</p>
        </div>
      </div>
    </div>
  );
};

// Performance Content
const PerformanceContent = () => {
  // Performance data structure matching salesperson dashboard
  const performanceData = {
    targets: {
      monthlyLeads: { current: 0, target: 100, label: "Monthly Leads" },
      conversionRate: { current: 0, target: 25, label: "Conversion Rate (%)" },
      revenue: { current: 0, target: 300000, label: "Monthly Revenue (₹)" },
      calls: { current: 0, target: 300, label: "Daily Calls" }
    },
    leadStatusData: [
      { label: "Hot", value: 0, color: "#ef4444" },
      { label: "Warm", value: 0, color: "#f97316" },
      { label: "Cold", value: 0, color: "#6b7280" },
      { label: "Converted", value: 0, color: "#22c55e" }
    ],
    monthlyPerformance: [
      { label: "Jan", value: 0, color: "#3b82f6" },
      { label: "Feb", value: 0, color: "#3b82f6" },
      { label: "Mar", value: 0, color: "#3b82f6" },
      { label: "Apr", value: 0, color: "#3b82f6" },
      { label: "May", value: 0, color: "#3b82f6" },
      { label: "Jun", value: 0, color: "#3b82f6" }
    ],
    kpis: [
      {
        title: "Lead Response Time",
        value: "0 hrs",
        target: "< 1 hr",
        status: "warning",
        icon: Clock,
        color: "bg-orange-50 text-orange-600 border-orange-200"
      },
      {
        title: "Follow-up Rate",
        value: "0%",
        target: "> 85%",
        status: "warning",
        icon: TrendingUp,
        color: "bg-orange-50 text-orange-600 border-orange-200"
      },
      {
        title: "Customer Satisfaction",
        value: "0/5",
        target: "> 4.5",
        status: "warning",
        icon: CheckCircle,
        color: "bg-orange-50 text-orange-600 border-orange-200"
      },
      {
        title: "Quotation Success",
        value: "0%",
        target: "> 70%",
        status: "warning",
        icon: CheckCircle,
        color: "bg-orange-50 text-orange-600 border-orange-200"
      },
      {
        title: "Transfer Leads",
        value: "0",
        target: "< 20",
        status: "success",
        icon: TrendingUp,
        color: "bg-indigo-50 text-indigo-600 border-indigo-200"
      }
    ]
  }

  return (
    <div className="space-y-6 pb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceData.kpis.map((kpi, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-sm border p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 ${kpi.color}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center">
                <kpi.icon className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-sm text-gray-600">Target: {kpi.target}</p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-700">{kpi.title}</h3>
          </div>
        ))}
      </div>

      {/* Performance Targets */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Performance Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-1 p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">{performanceData.targets.monthlyLeads.label}</span>
              <span className="text-sm text-gray-900">{performanceData.targets.monthlyLeads.current}/{performanceData.targets.monthlyLeads.target}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((performanceData.targets.monthlyLeads.current / performanceData.targets.monthlyLeads.target) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {((performanceData.targets.monthlyLeads.current / performanceData.targets.monthlyLeads.target) * 100).toFixed(1)}%
            </div>
          </div>
          
          <div className="transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-1 p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">{performanceData.targets.conversionRate.label}</span>
              <span className="text-sm text-gray-900">{performanceData.targets.conversionRate.current}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((performanceData.targets.conversionRate.current / performanceData.targets.conversionRate.target) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {((performanceData.targets.conversionRate.current / performanceData.targets.conversionRate.target) * 100).toFixed(1)}%
            </div>
          </div>
          
          <div className="transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-1 p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">{performanceData.targets.revenue.label}</span>
              <span className="text-sm text-gray-900">₹{performanceData.targets.revenue.current.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((performanceData.targets.revenue.current / performanceData.targets.revenue.target) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {((performanceData.targets.revenue.current / performanceData.targets.revenue.target) * 100).toFixed(1)}%
            </div>
          </div>
          
          <div className="transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-1 p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">{performanceData.targets.calls.label}</span>
              <span className="text-sm text-gray-900">{performanceData.targets.calls.current}/{performanceData.targets.calls.target}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((performanceData.targets.calls.current / performanceData.targets.calls.target) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {((performanceData.targets.calls.current / performanceData.targets.calls.target) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Lead Status Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Lead Status Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {performanceData.leadStatusData.map((status, index) => (
            <div key={index} className="text-center transition-all duration-300 hover:scale-110 hover:shadow-md hover:-translate-y-1 p-4 rounded-lg bg-gray-50">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 hover:scale-110" 
                   style={{ backgroundColor: status.color }}>
                {status.value}
              </div>
              <p className="text-sm font-medium text-gray-700">{status.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Monthly Performance</h3>
        <div className="flex items-end justify-between h-48 space-x-2">
          {performanceData.monthlyPerformance.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-1 p-2 rounded-lg bg-gray-50">
              <div 
                className="w-full rounded-t transition-all duration-500 hover:opacity-80 hover:scale-110"
                style={{ 
                  height: `${Math.max((month.value / 100) * 100, 10)}px`,
                  backgroundColor: month.color
                }}
                title={`${month.label}: ${month.value}`}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{month.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Toolbox Content
const ToolboxContent = () => {
  const tools = [
    { 
      name: 'Lead Generator', 
      description: 'Generate new leads automatically', 
      icon: <Users className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    { 
      name: 'Email Templates', 
      description: 'Pre-built email templates', 
      icon: <Mail className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    { 
      name: 'Call Scripts', 
      description: 'Sales call scripts and guidelines', 
      icon: <Phone className="w-6 h-6" />,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50'
    },
    { 
      name: 'Presentation Tools', 
      description: 'Marketing presentation templates', 
      icon: <BarChart3 className="w-6 h-6" />,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                {tool.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Use Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Orders Content
const OrdersContent = () => {
  // Sample orders data
  const ordersData = {
    totalOrders: 24,
    confirmedOrders: 18,
    pendingOrders: 4,
    cancelledOrders: 2,
    paymentStatus: {
      paid: 15,
      pending: 6,
      overdue: 2,
      partial: 1
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen pb-16">
      
      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
                <p className="text-sm text-gray-500">All orders in the system</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-600">{ordersData.totalOrders}</div>
          </div>
        </div>

        {/* Confirmed Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Confirmed Orders</h3>
                <p className="text-sm text-gray-500">Orders awaiting action</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600">{ordersData.confirmedOrders}</div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <MessageCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pending Orders</h3>
                <p className="text-sm text-gray-500">Orders in follow-up stage</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600">{ordersData.pendingOrders}</div>
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cancelled Orders</h3>
                <p className="text-sm text-gray-500">Orders cancelled</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-red-600">{ordersData.cancelledOrders}</div>
          </div>
        </div>
      </div>

      {/* Payment Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Paid Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Paid Orders</h3>
                <p className="text-sm text-gray-500">Payment completed</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600">{ordersData.paymentStatus.paid}</div>
          </div>
        </div>

        {/* Pending Payment */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pending Payment</h3>
                <p className="text-sm text-gray-500">Awaiting payment</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600">{ordersData.paymentStatus.pending}</div>
          </div>
        </div>

        {/* Overdue Payment */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Overdue Payment</h3>
                <p className="text-sm text-gray-500">Payment overdue</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-red-600">{ordersData.paymentStatus.overdue}</div>
          </div>
        </div>

        {/* Partial Payment */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Percent className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Partial Payment</h3>
                <p className="text-sm text-gray-500">Partial payment received</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-600">{ordersData.paymentStatus.partial}</div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View All Orders
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center mr-2">
                      <Hash className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">#</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center mr-2">
                      <User className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">NAME & PHONE</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center mr-2">
                      <MapPin className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">ADDRESS</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center mr-2">
                      <FileText className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">GST NO.</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center mr-2">
                      <Package className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">PRODUCT TYPE</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center mr-2">
                      <Map className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">STATE</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center mr-2">
                      <Globe className="w-3 h-3 text-orange-600" />
                    </div>
                    <span className="text-sm text-gray-600">LEAD SOURCE</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center mr-2">
                      <Users className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">CUSTOMER TYPE</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">#ORD-001</td>
                <td className="py-3 px-4 text-sm text-gray-900">Rajesh Kumar</td>
                <td className="py-3 px-4 text-sm text-gray-900">Solar Panel 5KW</td>
                <td className="py-3 px-4 text-sm text-gray-900">₹2,50,000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Confirmed</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Paid</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">15 Jan 2024</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">#ORD-002</td>
                <td className="py-3 px-4 text-sm text-gray-900">Priya Sharma</td>
                <td className="py-3 px-4 text-sm text-gray-900">Inverter 3KW</td>
                <td className="py-3 px-4 text-sm text-gray-900">₹1,20,000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">Pending</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">18 Jan 2024</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">#ORD-003</td>
                <td className="py-3 px-4 text-sm text-gray-900">Amit Singh</td>
                <td className="py-3 px-4 text-sm text-gray-900">Battery 100Ah</td>
                <td className="py-3 px-4 text-sm text-gray-900">₹45,000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Confirmed</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Partial</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">20 Jan 2024</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">#ORD-004</td>
                <td className="py-3 px-4 text-sm text-gray-900">Sunita Patel</td>
                <td className="py-3 px-4 text-sm text-gray-900">Solar Panel 3KW</td>
                <td className="py-3 px-4 text-sm text-gray-900">₹1,80,000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Cancelled</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Refunded</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">22 Jan 2024</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">#ORD-005</td>
                <td className="py-3 px-4 text-sm text-gray-900">Vikram Mehta</td>
                <td className="py-3 px-4 text-sm text-gray-900">Complete Solar Kit</td>
                <td className="py-3 px-4 text-sm text-gray-900">₹3,50,000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Confirmed</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Overdue</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">25 Jan 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketingSalespersonDashboard;
