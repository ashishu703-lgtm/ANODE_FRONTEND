"use client"

import { TrendingUp, CheckCircle, Clock, CreditCard, UserPlus, CalendarCheck, ArrowUp, XCircle, PhoneOff, Target, BarChart3, PieChart as PieChartIcon, Activity, Award, TrendingDown, ArrowRightLeft, Calendar } from "lucide-react"
import { useState } from "react"

function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

function Card({ className, children }) {
  return <div className={cx("rounded-lg border bg-white", className)}>{children}</div>
}

function CardHeader({ className, children }) {
  return <div className={cx("p-4", className)}>{children}</div>
}

function CardTitle({ className, children }) {
  return <div className={cx("text-base font-semibold", className)}>{children}</div>
}

function CardContent({ className, children }) {
  return <div className={cx("p-4 pt-0", className)}>{children}</div>
}

// Simple Chart Components (without external dependencies)
function CustomPieChart({ data, size = 200 }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100
          const startAngle = (cumulativePercentage / 100) * 360
          const endAngle = ((cumulativePercentage + percentage) / 100) * 360
          cumulativePercentage += percentage

          const radius = size / 2 - 10
          const centerX = size / 2
          const centerY = size / 2

          const startAngleRad = (startAngle * Math.PI) / 180
          const endAngleRad = (endAngle * Math.PI) / 180

          const x1 = centerX + radius * Math.cos(startAngleRad)
          const y1 = centerY + radius * Math.sin(startAngleRad)
          const x2 = centerX + radius * Math.cos(endAngleRad)
          const y2 = centerY + radius * Math.sin(endAngleRad)

          const largeArcFlag = percentage > 50 ? 1 : 0

          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ')

          return (
            <path
              key={index}
              d={pathData}
              fill={item.color}
              stroke="white"
              strokeWidth="2"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">{total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>
    </div>
  )
}

function CustomBarChart({ data, height = 200 }) {
  const maxValue = Math.max(...data.map(item => item.value))
  
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between h-full space-x-2">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 40)
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="text-xs text-gray-500 mb-1">{item.value}</div>
              <div
                className="w-full rounded-t transition-all duration-500 hover:opacity-80"
                style={{
                  height: barHeight,
                  backgroundColor: item.color,
                  minHeight: '4px'
                }}
              />
              <div className="text-xs text-gray-600 mt-2 text-center">{item.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ProgressBar({ value, max, label, color = "bg-blue-500" }) {
  const percentage = Math.min((value / max) * 100, 100)
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</div>
    </div>
  )
}

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState('overview')
  const [dateFilter, setDateFilter] = useState('')

  // Handle date filter change
  const handleDateFilterChange = (selectedDate) => {
    setDateFilter(selectedDate)
    console.log('Filtering performance data for date:', selectedDate)
  }

  // Generate performance data based on selected date
  const getPerformanceData = (selectedDate) => {
    // Base performance data - empty structure ready for real data
    const baseData = {
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
          icon: ArrowUp,
          color: "bg-orange-50 text-orange-600 border-orange-200"
        },
        {
          title: "Customer Satisfaction",
          value: "0/5",
          target: "> 4.5",
          status: "warning",
          icon: Award,
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
          icon: ArrowRightLeft,
          color: "bg-indigo-50 text-indigo-600 border-indigo-200"
        }
      ]
    }

    // If no date is selected, return base data
    if (!selectedDate) {
      return baseData
    }

    // Return base data for any selected date (no dummy variations)
    return baseData
  }

  // Get filtered performance data
  const performanceData = getPerformanceData(dateFilter)

  // Overview Data - empty structure ready for real data
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
        icon: CreditCard,
        color: "bg-purple-50 text-purple-600 border-purple-200",
        trend: "0%",
        trendUp: true
      },
    ],
    weeklyLeads: [
      { label: "Mon", value: 0, color: "#3b82f6" },
      { label: "Tue", value: 0, color: "#3b82f6" },
      { label: "Wed", value: 0, color: "#3b82f6" },
      { label: "Thu", value: 0, color: "#3b82f6" },
      { label: "Fri", value: 0, color: "#3b82f6" },
      { label: "Sat", value: 0, color: "#3b82f6" },
      { label: "Sun", value: 0, color: "#3b82f6" }
    ],
    leadSourceData: [
      { label: "Website", value: 0, color: "#3b82f6" },
      { label: "Referrals", value: 0, color: "#10b981" },
      { label: "Social Media", value: 0, color: "#f59e0b" },
      { label: "Cold Calls", value: 0, color: "#ef4444" },
      { label: "Email Campaign", value: 0, color: "#8b5cf6" },
      { label: "Other", value: 0, color: "#6b7280" }
    ],
    monthlyRevenue: [
      { label: "Jan", value: 0, color: "#3b82f6" },
      { label: "Feb", value: 0, color: "#3b82f6" },
      { label: "Mar", value: 0, color: "#3b82f6" },
      { label: "Apr", value: 0, color: "#3b82f6" },
      { label: "May", value: 0, color: "#3b82f6" },
      { label: "Jun", value: 0, color: "#3b82f6" }
    ]
  }

  const metrics = overviewData.metrics

  const leadStatuses = [
    {
      title: "Pending",
      count: "0",
      subtitle: "No pending leads",
      icon: Clock,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      title: "Meeting scheduled",
      count: "0",
      subtitle: "No meetings scheduled",
      icon: CalendarCheck,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      title: "Follow Up",
      count: "0",
      subtitle: "No follow-ups required",
      icon: ArrowUp,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Win Leads",
      count: "0",
      subtitle: "No successful conversions",
      icon: CheckCircle,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      title: "Not Interested",
      count: "0",
      subtitle: "No declined leads",
      icon: XCircle,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      title: "Loose Leads",
      count: "0",
      subtitle: "No unreachable leads",
      icon: PhoneOff,
      color: "bg-gray-50 text-gray-600 border-gray-200",
    },
    {
      title: "Transfer Leads",
      count: "0",
      subtitle: "No transferred leads",
      icon: ArrowRightLeft,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
  ]

  return (
    <main className="flex-1 overflow-auto p-6">
      {/* Tab Navigation */}
      <div className="flex gap-6 mb-6">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`gap-2 flex items-center pb-2 border-b-2 transition-colors ${
            activeTab === 'overview' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('performance')}
          className={`gap-2 flex items-center pb-2 border-b-2 transition-colors ${
            activeTab === 'performance' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Performance
        </button>
      </div>

      {activeTab === 'overview' && (
        <>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className={cx("border-2", metric.color)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{metric.title}</CardTitle>
                <Icon className="h-5 w-5" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`flex items-center text-xs font-medium ${
                    metric.trendUp ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trendUp ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.trend}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{metric.subtitle}</p>
                <div className="w-full bg-current opacity-20 h-1 rounded-full mt-3"></div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Lead Status Summary */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Lead Status Summary</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">Overview of your leads by status</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadStatuses.map((status, index) => {
            const Icon = status.icon
            return (
              <Card key={index} className={cx("border-2", status.color)}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{status.title}</CardTitle>
                  <Icon className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">{status.count}</div>
                  <p className="text-xs text-gray-500">{status.subtitle}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Leads Bar Chart */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-semibold">Weekly Leads Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <CustomBarChart data={overviewData.weeklyLeads} height={200} />
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500">Leads Generated This Week</span>
            </div>
          </CardContent>
        </Card>

        {/* Lead Source Pie Chart */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg font-semibold">Lead Sources</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <CustomPieChart data={overviewData.leadSourceData} size={180} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {overviewData.leadSourceData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.label}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      <Card className="border-2 mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg font-semibold">Monthly Revenue Trend</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <CustomBarChart data={overviewData.monthlyRevenue.map(item => ({
              ...item,
              value: item.value / 1000, // Convert to thousands for better display
              label: item.label
            }))} height={200} />
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">Revenue in Thousands (₹)</span>
          </div>
        </CardContent>
      </Card>

        </>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Performance Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Performance Dashboard</h1>
                <p className="text-sm text-gray-600">Track your targets and performance metrics</p>
              </div>
            </div>
            
            {/* Date Filter */}
            <div className="flex items-center gap-2">
              <Calendar className={`h-4 w-4 ${dateFilter ? 'text-blue-500' : 'text-gray-500'}`} />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => handleDateFilterChange(e.target.value)}
                className={`px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  dateFilter ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                title="Filter performance by date"
              />
              {dateFilter && (
                <button
                  onClick={() => handleDateFilterChange('')}
                  className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                  title="Clear date filter"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Status */}
          {dateFilter && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Showing performance data for: <strong>{new Date(dateFilter).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Target Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(performanceData.targets).map(([key, target]) => (
              <Card key={key} className="border-2 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">{target.label}</CardTitle>
                  <Target className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-3">
                    {key === 'revenue' ? `₹${target.current.toLocaleString()}` : target.current}
                  </div>
                  <ProgressBar 
                    value={target.current} 
                    max={target.target} 
                    label={`Target: ${key === 'revenue' ? `₹${target.target.toLocaleString()}` : target.target}`}
                    color="bg-blue-500"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* KPI Cards */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-semibold">Key Performance Indicators</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Track important metrics that impact your success</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceData.kpis.map((kpi, index) => {
                const Icon = kpi.icon
                return (
                  <Card key={index} className={`border-2 ${kpi.color}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                      <Icon className="h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                      <p className="text-xs text-gray-500 mb-2">Target: {kpi.target}</p>
                      <div className="flex items-center gap-1">
                        {kpi.status === 'warning' ? (
                          <>
                            <TrendingDown className="h-3 w-3 text-orange-500" />
                            <span className="text-xs text-orange-600">Below Target</span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600">Above Target</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lead Status Pie Chart */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg font-semibold">Lead Status Distribution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <CustomPieChart data={performanceData.leadStatusData} size={180} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {performanceData.leadStatusData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.label}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Performance Bar Chart */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg font-semibold">Monthly Performance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <CustomBarChart data={performanceData.monthlyPerformance} height={200} />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-500">Performance Score (0-100)</span>
                </div>
              </CardContent>
            </Card>
          </div>


          {/* Performance Summary */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-lg font-semibold">Performance Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">0%</div>
                  <div className="text-sm text-gray-600">Overall Target Achievement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
                  <div className="text-sm text-gray-600">Areas Need Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                  <div className="text-sm text-gray-600">Area Exceeding Target</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
