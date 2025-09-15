"use client"

import { TrendingUp, CheckCircle, Clock, CreditCard, UserPlus, CalendarCheck, ArrowUp, XCircle, PhoneOff } from "lucide-react"

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

export default function DashboardContent() {
  const metrics = [
    {
      title: "Total Leads",
      value: "0",
      subtitle: "Assigned to ankit@gmail.com",
      icon: UserPlus,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Conversion Rate",
      value: "0.0%",
      subtitle: "0 completed leads",
      icon: CheckCircle,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      title: "Pending Rate",
      value: "0.0%",
      subtitle: "0 pending leads",
      icon: Clock,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      title: "Total Revenue",
      value: "₹0",
      subtitle: "Current Month: ₹0",
      icon: CreditCard,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
  ]

  const leadStatuses = [
    {
      title: "Pending",
      count: "0",
      subtitle: "Awaiting initial contact",
      icon: Clock,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      title: "Meeting scheduled",
      count: "0",
      subtitle: "Meeting date confirmed",
      icon: CalendarCheck,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      title: "Follow Up",
      count: "0",
      subtitle: "Requires additional contact",
      icon: ArrowUp,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Completed",
      count: "0",
      subtitle: "Successfully converted",
      icon: CheckCircle,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      title: "Not Interested",
      count: "0",
      subtitle: "Declined to proceed",
      icon: XCircle,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      title: "Not Connected",
      count: "0",
      subtitle: "Unable to reach",
      icon: PhoneOff,
      color: "bg-gray-50 text-gray-600 border-gray-200",
    },
  ]

  return (
    <main className="flex-1 overflow-auto p-6">
      {/* Tab Navigation */}
      <div className="flex gap-6 mb-6">
        <button className="gap-2 text-blue-600 border-b-2 border-blue-600 rounded-none flex items-center">
          <TrendingUp className="h-4 w-4" />
          Overview
        </button>
        <button className="gap-2 text-gray-500 flex items-center">
          <TrendingUp className="h-4 w-4" />
          Performance
        </button>
      </div>

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
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <p className="text-xs text-gray-500">{metric.subtitle}</p>
                <div className="w-full bg-current opacity-20 h-1 rounded-full mt-3"></div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Lead Status Summary */}
      <div className="space-y-4">
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
    </main>
  )
}
