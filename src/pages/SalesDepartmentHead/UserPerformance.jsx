import React from 'react';

const SalesDashboard = () => {
  const salesData = [
    {
      id: 1,
      initial: 'Y',
      email: 'yadavakanksha133@gmail.com',
      pending: { count: 121, total: 486 },
      followUp: { count: 33, total: 486 },
      done: { count: 0, total: 486 },
      notConnected: { count: 139, total: 486 },
      notInterested: { count: 140, total: 486 },
      meetingScheduled: { count: 53, total: 486 }
    },
    {
      id: 2,
      initial: 'J',
      email: 'jatinbuss2003@gmail.com',
      pending: { count: 335, total: 639 },
      followUp: { count: 36, total: 639 },
      done: { count: 7, total: 639 },
      notConnected: { count: 157, total: 639 },
      notInterested: { count: 95, total: 639 },
      meetingScheduled: { count: 9, total: 639 }
    },
    {
      id: 3,
      initial: 'A',
      email: 'Any738597308@gmail.com',
      pending: { count: 67, total: 101 },
      followUp: { count: 2, total: 101 },
      done: { count: 0, total: 101 },
      notConnected: { count: 20, total: 101 },
      notInterested: { count: 7, total: 101 },
      meetingScheduled: { count: 5, total: 101 }
    },
    {
      id: 4,
      initial: 'A',
      email: 'ankushkushwaha3107@gmail.com',
      pending: { count: 288, total: 487 },
      followUp: { count: 12, total: 487 },
      done: { count: 2, total: 487 },
      notConnected: { count: 52, total: 487 },
      notInterested: { count: 133, total: 487 },
      meetingScheduled: { count: 0, total: 487 }
    },
    {
      id: 5,
      initial: 'M',
      email: 'muzaffar.mbg@gmail.com',
      pending: { count: 43, total: 85 },
      followUp: { count: 6, total: 85 },
      done: { count: 2, total: 85 },
      notConnected: { count: 21, total: 85 },
      notInterested: { count: 8, total: 85 },
      meetingScheduled: { count: 5, total: 85 }
    },
    {
      id: 6,
      initial: 'G',
      email: 'gaurav.sarkarr@mbacard.com',
      pending: { count: 17, total: 126 },
      followUp: { count: 25, total: 126 },
      done: { count: 44, total: 126 },
      notConnected: { count: 22, total: 126 },
      notInterested: { count: 9, total: 126 },
      meetingScheduled: { count: 9, total: 126 }
    },
    {
      id: 7,
      initial: 'G',
      email: 'growitharmaann@gmail.com',
      pending: { count: 231, total: 317 },
      followUp: { count: 11, total: 317 },
      done: { count: 0, total: 317 },
      notConnected: { count: 48, total: 317 },
      notInterested: { count: 20, total: 317 },
      meetingScheduled: { count: 7, total: 317 }
    },
    {
      id: 8,
      initial: 'S',
      email: 'SalesUser123@gmail.com',
      pending: { count: 2, total: 2 },
      followUp: { count: 0, total: 2 },
      done: { count: 0, total: 2 },
      notConnected: { count: 0, total: 2 },
      notInterested: { count: 0, total: 2 },
      meetingScheduled: { count: 0, total: 2 }
    }
  ];

  // Calculate totals
  const totals = salesData.reduce((acc, user) => {
    acc.totalLeads += user.pending.total;
    acc.pending += user.pending.count;
    acc.followUp += user.followUp.count;
    acc.done += user.done.count;
    acc.notConnected += user.notConnected.count;
    acc.notInterested += user.notInterested.count;
    acc.meetingScheduled += user.meetingScheduled.count;
    return acc;
  }, {
    totalLeads: 0,
    pending: 0,
    followUp: 0,
    done: 0,
    notConnected: 0,
    notInterested: 0,
    meetingScheduled: 0
  });

  const conversionRate = totals.totalLeads > 0 ? ((totals.done / totals.totalLeads) * 100).toFixed(1) : 0;

  const StatusCell = ({ count, total, bgColor, textColor = 'text-gray-800' }) => (
    <div className={`px-3 py-2 rounded-lg ${bgColor} ${textColor} text-center font-medium`}>
      {count}/{total}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by user email..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="flex items-center space-x-2">
              <i className="far fa-calendar text-gray-500"></i>
              <span className="text-gray-600">Select date range</span>
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <i className="fas fa-sync-alt text-gray-500"></i>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex">
          <button className="px-6 py-3 bg-white border-b-2 border-blue-500 text-blue-600 font-medium">
            <i className="fas fa-chart-line mr-2"></i>
            Sales Users
          </button>
          <button className="px-6 py-3 bg-gray-100 text-gray-600 font-medium">
            <i className="fas fa-users mr-2"></i>
            Telesales Users
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-plus text-blue-500"></i>
                      <i className="fas fa-user text-blue-500"></i>
                      <span className="font-medium text-gray-900">Sales User</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <i className="fas fa-clock text-orange-500"></i>
                      <span className="font-medium text-gray-900">PENDING</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <i className="fas fa-phone text-purple-500"></i>
                      <span className="font-medium text-gray-900">FOLLOW UP</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <i className="fas fa-check-circle text-green-500"></i>
                      <span className="font-medium text-gray-900">DONE</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <i className="fas fa-times-circle text-blue-400"></i>
                      <span className="font-medium text-gray-900">NOT CONNECTED</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <i className="fas fa-user-slash text-red-500"></i>
                      <span className="font-medium text-gray-900">NOT INTERESTED</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <i className="fas fa-calendar-check text-blue-600"></i>
                      <span className="font-medium text-gray-900">MEETING SCHEDULED</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((user, index) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-500 font-medium">{index + 1}</span>
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.initial}
                        </div>
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusCell 
                        count={user.pending.count} 
                        total={user.pending.total} 
                        bgColor="bg-yellow-100" 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <StatusCell 
                        count={user.followUp.count} 
                        total={user.followUp.total} 
                        bgColor="bg-purple-100" 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <StatusCell 
                        count={user.done.count} 
                        total={user.done.total} 
                        bgColor="bg-green-100" 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <StatusCell 
                        count={user.notConnected.count} 
                        total={user.notConnected.total} 
                        bgColor="bg-gray-100" 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <StatusCell 
                        count={user.notInterested.count} 
                        total={user.notInterested.total} 
                        bgColor="bg-red-100" 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <StatusCell 
                        count={user.meetingScheduled.count} 
                        total={user.meetingScheduled.total} 
                        bgColor="bg-blue-100" 
                      />
                    </td>
                  </tr>
                ))}
                
                {/* Totals Row */}
                <tr className="bg-gray-50 border-t-2 border-gray-300 font-semibold">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-700">TOTALS</span>
                      <div className="text-sm text-gray-600">
                        <div><strong>Total Leads:</strong> {totals.totalLeads}</div>
                        <div><strong>Conversion Rate:</strong> {conversionRate}% ({totals.done}/{totals.totalLeads})</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="px-3 py-2 rounded-lg bg-yellow-200 text-gray-800 text-center font-bold">
                      <i className="fas fa-clock mr-1"></i>
                      {totals.pending}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="px-3 py-2 rounded-lg bg-purple-200 text-gray-800 text-center font-bold">
                      <i className="fas fa-phone mr-1"></i>
                      {totals.followUp}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="px-3 py-2 rounded-lg bg-green-200 text-gray-800 text-center font-bold">
                      <i className="fas fa-check-circle mr-1"></i>
                      {totals.done}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 text-center font-bold">
                      <i className="fas fa-times-circle mr-1"></i>
                      {totals.notConnected}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="px-3 py-2 rounded-lg bg-red-200 text-gray-800 text-center font-bold">
                      <i className="fas fa-user-slash mr-1"></i>
                      {totals.notInterested}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="px-3 py-2 rounded-lg bg-blue-200 text-gray-800 text-center font-bold">
                      <i className="fas fa-calendar-check mr-1"></i>
                      {totals.meetingScheduled}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
      />
    </div>
  );
};

export default SalesDashboard;