import React, { useState } from 'react';
import { Search, Plus, RefreshCw, Edit, Trash2, LogOut, Calendar, Users, Building, User, Mail } from 'lucide-react';

const DepartmentManagement = ({ onSalesDepartmentHeadLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Departments');

  // Sample data
  const departments = [
    {
      id: 1,
      username: 'shivank_admin',
      email: 'shivank@mbgcard.com',
      departmentType: 'Sales Department',
      role: 'Department Head',
      headUser: 'admin@mbg.com',
      createdAt: 'Thu, May 15, 2025'
    },
    {
      id: 2,
      username: 'ankit_sales',
      email: 'ankit@gmail.com',
      departmentType: 'Sales Department',
      role: 'Department User',
      headUser: 'shivank@mbgcard.com',
      createdAt: 'Thu, May 15, 2025'
    },
    {
      id: 3,
      username: 'auto_system',
      email: 'automation@mbg.com',
      departmentType: 'Automation Department',
      role: 'Department Head',
      headUser: 'admin@mbg.com',
      createdAt: 'Thu, May 15, 2025'
    },
    {
      id: 4,
      username: 'telesales_user',
      email: 'telesalesuser@gmail.com',
      departmentType: 'Telesales Department',
      role: 'Department User',
      headUser: 'shivank@mbgcard.com',
      createdAt: 'Tue, May 20, 2025'
    },
    {
      id: 5,
      username: 'teleuser_01',
      email: 'teleuser@gmail.com',
      departmentType: 'Telesales Department',
      role: 'Department User',
      headUser: 'shivank@mbgcard.com',
      createdAt: 'Tue, May 20, 2025'
    },
    {
      id: 6,
      username: 'mohit_sales',
      email: 'mohitpa021@gmail.com',
      departmentType: 'Sales Department',
      role: 'Department User',
      headUser: 'shivank@mbgcard.com',
      createdAt: 'Wed, May 21, 2025'
    }
  ];

  const getDepartmentTypeColor = (type) => {
    switch (type) {
      case 'Sales Department':
        return 'bg-green-50 text-green-600 border border-green-200';
      case 'Automation Department':
        return 'bg-purple-50 text-purple-600 border border-purple-200';
      case 'Telesales Department':
        return 'bg-gray-50 text-gray-600 border border-gray-200';
      default:
        return 'bg-blue-50 text-blue-600 border border-blue-200';
    }
  };

  const getRoleColor = (role) => {
    return role === 'Department Head' 
      ? 'bg-blue-50 text-blue-600 border border-blue-200'
      : 'bg-gray-50 text-gray-600 border border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">68</div>
                <div className="text-gray-500 text-sm">Total Departments</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-1">8</div>
                <div className="text-gray-500 text-sm">Department Heads</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">9</div>
                <div className="text-gray-500 text-sm">Department Types</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option>All Departments</option>
                <option>Sales Department</option>
                <option>Automation Department</option>
                <option>Telesales Department</option>
              </select>
              
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium">
                <Plus className="w-4 h-4" />
                Add Department
              </button>
              
              <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Username
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-green-600" />
                      Department Type
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-600" />
                      Role
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-pink-600" />
                      Head User
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      Created At
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Edit className="w-4 h-4 text-cyan-600" />
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={dept.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">{dept.username}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{dept.email}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDepartmentTypeColor(dept.departmentType)}`}>
                        {dept.departmentType}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(dept.role)}`}>
                        {dept.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{dept.headUser}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{dept.createdAt}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                          onClick={() => {
                            if (dept.departmentType === 'Sales Department' && dept.role === 'Department Head') {
                              // Open in new tab with URL parameters
                              const currentUrl = window.location.origin + window.location.pathname;
                              const newUrl = `${currentUrl}?userType=salesdepartmenthead&login=true`;
                              window.open(newUrl, '_blank');
                            }
                          }}
                          title={dept.departmentType === 'Sales Department' && dept.role === 'Department Head' ? 'Login as Sales Department Head (New Tab)' : 'Login'}
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;