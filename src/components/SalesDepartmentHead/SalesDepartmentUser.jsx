import React, { useState } from 'react';
import { Search, UserPlus, Download, Edit, LogOut, Trash2, Hash, User, Mail, Shield, Building, Target, Calendar, MoreHorizontal } from 'lucide-react';

const UserManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'Ankit MBG',
      email: 'ankit@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'SALES DEPARTMENT',
      target: 'Not specified',
      createdAt: 'Thu, May 15, 2025'
    },
    {
      id: 2,
      username: 'TeleSales',
      email: 'telesalesuser@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'TELESALES DEPARTMENT',
      target: 'Not specified',
      createdAt: 'Tue, May 20, 2025'
    },
    {
      id: 3,
      username: 'TeleUser',
      email: 'teleuser@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'TELESALES DEPARTMENT',
      target: 'Not specified',
      createdAt: 'Tue, May 20, 2025'
    },
    {
      id: 4,
      username: 'MohitPatel',
      email: 'mohitpa021@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'SALES DEPARTMENT',
      target: 'Not specified',
      createdAt: 'Wed, May 21, 2025'
    },
    {
      id: 5,
      username: 'Saurabh',
      email: 'saurabhmg18@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'SALES DEPARTMENT',
      target: 'Not specified',
      createdAt: 'Thu, May 22, 2025'
    },
    {
      id: 6,
      username: 'Anjali',
      email: 'Any738959730@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'SALES DEPARTMENT',
      target: 'Not specified',
      createdAt: 'Sat, May 24, 2025'
    },
    {
      id: 7,
      username: 'ekta',
      email: 'ektakushwahal20@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'SALES DEPARTMENT',
      target: 'Not specified',
      createdAt: 'Mon, May 26, 2025'
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
  };

  const handleLogout = (userId) => {
    const url = `${window.location.origin}?userType=salesperson&login=true&userId=${encodeURIComponent(userId)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleExport = () => {
    console.log('Export data');
  };

  const handleAddUser = () => {
    console.log('Add new user');
  };

  const getDepartmentBadgeColor = (department) => {
    switch (department) {
      case 'SALES DEPARTMENT':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'TELESALES DEPARTMENT':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Search and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by username, email, department type, or target"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            />
          </div>
          
          <div className="flex items-center gap-3 ml-6">
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
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
                    <Hash className="w-4 h-4 text-purple-500" />
                    #
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <User className="w-4 h-4 text-blue-500" />
                    Username
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Mail className="w-4 h-4 text-green-500" />
                    Email
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Shield className="w-4 h-4 text-orange-500" />
                    Role
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Building className="w-4 h-4 text-purple-500" />
                    Department Type
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Target className="w-4 h-4 text-cyan-500" />
                    Target
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Calendar className="w-4 h-4 text-teal-500" />
                    Created At
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <MoreHorizontal className="w-4 h-4" />
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-gray-700 font-medium">{user.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900 font-medium">{user.username}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700">{user.email}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-center">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-lg border border-gray-200">
                        DEPARTMENT
                      </span>
                      <div className="text-xs text-gray-600 mt-1">USER</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border ${getDepartmentBadgeColor(user.department)}`}>
                      {user.department}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600">{user.target}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700">{user.createdAt}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleLogout(user.id)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Logout"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No results message */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Table Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
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

export default UserManagementTable;