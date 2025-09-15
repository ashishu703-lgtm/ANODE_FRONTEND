import React, { useState, useRef, useEffect } from 'react';
import { Bell, Users, X, Phone, Mail, MapPin, MessageCircle, TrendingUp, Award, Calendar, CheckCircle } from 'lucide-react';

const FixedHeader = ({ userType = "superadmin" }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotificationHistory, setShowNotificationHistory] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const notificationHistoryRef = useRef(null);

  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "New Lead Assigned",
      message: "You have been assigned a new lead from Mumbai region",
      time: "2 minutes ago",
      type: "lead",
      unread: true
    },
    {
      id: 2,
      title: "Follow-up Reminder",
      message: "Follow up with John Doe scheduled for today at 3:00 PM",
      time: "1 hour ago",
      type: "reminder",
      unread: true
    },
    {
      id: 3,
      title: "Quotation Approved",
      message: "Your quotation #QT-2024-001 has been approved by the client",
      time: "3 hours ago",
      type: "success",
      unread: false
    },
    {
      id: 4,
      title: "Monthly Target Update",
      message: "You have achieved 75% of your monthly target",
      time: "1 day ago",
      type: "info",
      unread: false
    }
  ];

  // Comprehensive notification history data
  const notificationHistory = [
    {
      id: 1,
      title: "New Lead Assigned",
      message: "You have been assigned a new lead from Mumbai region",
      time: "2 minutes ago",
      type: "lead",
      unread: true
    },
    {
      id: 2,
      title: "Follow-up Reminder",
      message: "Follow up with John Doe scheduled for today at 3:00 PM",
      time: "1 hour ago",
      type: "reminder",
      unread: true
    },
    {
      id: 3,
      title: "Quotation Approved",
      message: "Your quotation #QT-2024-001 has been approved by the client",
      time: "3 hours ago",
      type: "success",
      unread: false
    },
    {
      id: 4,
      title: "Monthly Target Update",
      message: "You have achieved 75% of your monthly target",
      time: "1 day ago",
      type: "info",
      unread: false
    },
    {
      id: 5,
      title: "Payment Received",
      message: "Payment of ₹45,000 received from ABC Corporation",
      time: "2 days ago",
      type: "success",
      unread: false
    },
    {
      id: 6,
      title: "Meeting Scheduled",
      message: "Meeting with XYZ Ltd scheduled for tomorrow at 2:00 PM",
      time: "3 days ago",
      type: "reminder",
      unread: false
    },
    {
      id: 7,
      title: "Lead Converted",
      message: "Lead from Tech Solutions has been successfully converted",
      time: "4 days ago",
      type: "success",
      unread: false
    },
    {
      id: 8,
      title: "Quotation Sent",
      message: "Quotation #QT-2024-002 sent to Global Industries",
      time: "5 days ago",
      type: "info",
      unread: false
    },
    {
      id: 9,
      title: "Follow-up Completed",
      message: "Follow-up with Sarah Wilson completed successfully",
      time: "1 week ago",
      type: "success",
      unread: false
    },
    {
      id: 10,
      title: "New Product Launch",
      message: "New product catalog has been added to your dashboard",
      time: "1 week ago",
      type: "info",
      unread: false
    },
    {
      id: 11,
      title: "Target Achievement",
      message: "Congratulations! You have achieved 90% of your monthly target",
      time: "2 weeks ago",
      type: "success",
      unread: false
    },
    {
      id: 12,
      title: "Training Reminder",
      message: "Sales training session scheduled for next Monday",
      time: "2 weeks ago",
      type: "reminder",
      unread: false
    },
    {
      id: 13,
      title: "Lead Assignment",
      message: "5 new leads assigned to your territory",
      time: "3 weeks ago",
      type: "lead",
      unread: false
    },
    {
      id: 14,
      title: "Performance Review",
      message: "Your monthly performance review is now available",
      time: "1 month ago",
      type: "info",
      unread: false
    },
    {
      id: 15,
      title: "System Update",
      message: "CRM system has been updated with new features",
      time: "1 month ago",
      type: "info",
      unread: false
    }
  ];

  // Sample user profile data based on user type
  const userProfile = userType === "salesperson" ? {
    name: "Ankit Sharma",
    email: "ankit@mbg.com",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    state: "Maharashtra",
    city: "Mumbai",
    designation: "Senior Sales Executive",
    department: "Sales",
    joinDate: "January 15, 2023",
    totalLeads: 156,
    convertedLeads: 89,
    conversionRate: "57.1%",
    totalRevenue: "₹2,45,000",
    monthlyTarget: "₹3,00,000",
    targetAchievement: "81.7%",
    performanceRating: "4.2/5",
    lastLogin: "Today at 9:30 AM"
  } : {
    name: "Admin User",
    email: "admin@mbg.com",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    state: "Maharashtra",
    city: "Mumbai",
    designation: "System Administrator",
    department: "IT",
    joinDate: "January 1, 2023",
    totalLeads: 0,
    convertedLeads: 0,
    conversionRate: "0%",
    totalRevenue: "₹0",
    monthlyTarget: "₹0",
    targetAchievement: "0%",
    performanceRating: "N/A",
    lastLogin: "Today at 9:30 AM"
  };

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (notificationHistoryRef.current && !notificationHistoryRef.current.contains(event.target)) {
        setShowNotificationHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'lead': return <Users className="w-4 h-4 text-blue-500" />;
      case 'reminder': return <Calendar className="w-4 h-4 text-orange-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'info': return <TrendingUp className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Sales Overview */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Sales Overview</h1>
            <p className="text-sm text-gray-500">Monitor sales performance and metrics</p>
          </div>
        </div>

        {/* Right Section - Notifications and User */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            </button>

            {/* Notification Panel */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              notification.unread ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      setShowNotifications(false);
                      setShowNotificationHistory(true);
                    }}
                    className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">{userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userProfile.email.split('@')[0]}@mbg.c...</p>
                <p className="text-xs text-gray-500">{userType === "salesperson" ? "SALESPERSON" : "SUPERADMIN"}</p>
              </div>
            </button>

            {/* Profile Panel */}
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">User Profile</h3>
                    <button 
                      onClick={() => setShowProfile(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {/* Profile Header */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{userProfile.name}</h4>
                      <p className="text-sm text-gray-600">{userProfile.designation}</p>
                      <p className="text-xs text-gray-500">{userProfile.department}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">Contact Information</h5>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{userProfile.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{userProfile.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{userProfile.whatsapp}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{userProfile.city}, {userProfile.state}</span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">Performance Overview</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-blue-600 font-medium">Total Leads</span>
                        </div>
                        <p className="text-lg font-bold text-blue-700 mt-1">{userProfile.totalLeads}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-600 font-medium">Converted</span>
                        </div>
                        <p className="text-lg font-bold text-green-700 mt-1">{userProfile.convertedLeads}</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                          <span className="text-xs text-purple-600 font-medium">Conversion Rate</span>
                        </div>
                        <p className="text-lg font-bold text-purple-700 mt-1">{userProfile.conversionRate}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-orange-600" />
                          <span className="text-xs text-orange-600 font-medium">Rating</span>
                        </div>
                        <p className="text-lg font-bold text-orange-700 mt-1">{userProfile.performanceRating}</p>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Information */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">Revenue & Targets</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Revenue:</span>
                        <span className="text-sm font-semibold text-gray-900">{userProfile.totalRevenue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Monthly Target:</span>
                        <span className="text-sm font-semibold text-gray-900">{userProfile.monthlyTarget}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Target Achievement:</span>
                        <span className="text-sm font-semibold text-green-600">{userProfile.targetAchievement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Join Date:</span>
                      <span className="text-sm text-gray-900">{userProfile.joinDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Login:</span>
                      <span className="text-sm text-gray-900">{userProfile.lastLogin}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification History Modal */}
      {showNotificationHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={notificationHistoryRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Notification History</h2>
                  <p className="text-sm text-gray-600">All your notifications in one place</p>
                </div>
              </div>
              <button 
                onClick={() => setShowNotificationHistory(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">Total</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700 mt-1">{notificationHistory.length}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-orange-600 font-medium">Unread</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-700 mt-1">
                    {notificationHistory.filter(n => n.unread).length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Success</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700 mt-1">
                    {notificationHistory.filter(n => n.type === 'success').length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-600 font-medium">Reminders</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-700 mt-1">
                    {notificationHistory.filter(n => n.type === 'reminder').length}
                  </p>
                </div>
              </div>

              {/* Notification List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notificationHistory.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                      notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${
                            notification.unread ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
                <div className="text-sm text-gray-500">
                  Showing {notificationHistory.length} notifications
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowNotificationHistory(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    Mark All as Read
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default FixedHeader;