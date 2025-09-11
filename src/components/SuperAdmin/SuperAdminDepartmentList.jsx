import React, { useState } from 'react';
import { Search, Plus, RefreshCw, Edit, Trash2, LogOut, Calendar, Users, Building, User, Mail, Filter } from 'lucide-react';

const DepartmentManagement = ({ onSalesDepartmentHeadLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Departments');
  const [showFilters, setShowFilters] = useState(false);
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [headUserFilter, setHeadUserFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Sample data (initialized into state)
  const initialDepartments = [
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

  const [departments, setDepartments] = useState(initialDepartments);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDept, setNewDept] = useState({
    username: '',
    email: '',
    departmentType: 'Sales Department',
    role: 'Department User',
    headUser: ''
  });
  const [saving, setSaving] = useState(false);

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

  const isWithinDateRange = (dateStr) => {
    if (!dateFrom && !dateTo) return true;
    const parsed = new Date(dateStr);
    const fromOk = dateFrom ? parsed >= new Date(dateFrom) : true;
    const toOk = dateTo ? parsed <= new Date(dateTo) : true;
    return fromOk && toOk;
  };

  const filteredDepartments = departments.filter((dept) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      dept.username.toLowerCase().includes(term) ||
      dept.email.toLowerCase().includes(term) ||
      dept.departmentType.toLowerCase().includes(term) ||
      dept.role.toLowerCase().includes(term) ||
      dept.headUser.toLowerCase().includes(term);

    const matchesDepartmentType =
      selectedFilter === 'All Departments' || dept.departmentType === selectedFilter;

    const matchesRole = roleFilter === 'All Roles' || dept.role === roleFilter;

    const matchesHeadUser = headUserFilter.trim() === '' ||
      dept.headUser.toLowerCase().includes(headUserFilter.toLowerCase());

    const matchesDate = isWithinDateRange(dept.createdAt);

    return (
      matchesSearch &&
      matchesDepartmentType &&
      matchesRole &&
      matchesHeadUser &&
      matchesDate
    );
  });

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between gap-6">
            <div className="relative w-full sm:w-1/4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-5 h-11 border border-gray-200 rounded-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-400 text-sm"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="w-4 h-4" />
                Add Department
              </button>

              <button
                className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                aria-label="Refresh"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="h-9 px-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-sm"
                title="Department Type"
                aria-label="Department Type"
              >
                <option>All Departments</option>
                <option>Sales Department</option>
                <option>Automation Department</option>
                <option>Telesales Department</option>
              </select>

              <button
                className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                aria-controls="advanced-filters"
                aria-label="Filter"
                title="Filter"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          {showFilters && (
            <div id="advanced-filters" className="mt-4 border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Role</label>
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                >
                  <option>All Roles</option>
                  <option>Department Head</option>
                  <option>Department User</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Head User</label>
                <input
                  type="text"
                  placeholder="e.g. admin@mbg.com"
                  value={headUserFilter}
                  onChange={(e) => setHeadUserFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="md:col-span-4 flex items-center justify-end gap-3">
                <button
                  className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setRoleFilter('All Roles');
                    setHeadUserFilter('');
                    setDateFrom('');
                    setDateTo('');
                  }}
                >
                  Clear
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setShowFilters(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {showFilters && (
          <div id="advanced-filters" className="mt-4 border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* existing filter fields... (unchanged) */}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-700">
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 w-12">#</th>
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
                {filteredDepartments.map((dept, index) => (
                  <tr key={dept.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-5 text-xs text-gray-500 align-top">{index + 1}</td>
                    <td className="py-3 px-6 text-sm text-gray-900 font-semibold">{dept.username}</td>
                    <td className="py-3 px-6 text-sm text-gray-700">{dept.email}</td>
                    <td className="py-3 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDepartmentTypeColor(dept.departmentType)}`}>
                        {dept.departmentType}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(dept.role)}`}>
                        {dept.role}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">{dept.headUser}</td>
                    <td className="py-3 px-6 text-xs text-gray-500 whitespace-nowrap">{dept.createdAt}</td>
                    <td className="py-3 px-6">
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

        {/* Add Department Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl border border-gray-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900">Add Department User</h3>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowAddModal(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSaving(true);
                  const nextId = (departments.at(-1)?.id ?? 0) + 1;
                  const createdAt = new Date().toDateString();
                  const record = { id: nextId, createdAt, ...newDept };
                  setDepartments((prev) => [record, ...prev]);
                  setSaving(false);
                  setShowAddModal(false);
                  setNewDept({ username: '', email: '', departmentType: 'Sales Department', role: 'Department User', headUser: '' });
                }}
              >
                <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Username</label>
                    <input
                      type="text"
                      required
                      value={newDept.username}
                      onChange={(e) => setNewDept({ ...newDept, username: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g. john_doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={newDept.email}
                      onChange={(e) => setNewDept({ ...newDept, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Department Type</label>
                    <select
                      value={newDept.departmentType}
                      onChange={(e) => setNewDept({ ...newDept, departmentType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option>Sales Department</option>
                      <option>Automation Department</option>
                      <option>Telesales Department</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Role</label>
                    <select
                      value={newDept.role}
                      onChange={(e) => setNewDept({ ...newDept, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option>Department Head</option>
                      <option>Department User</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-600 mb-1">Head User</label>
                    <input
                      type="text"
                      required
                      value={newDept.headUser}
                      onChange={(e) => setNewDept({ ...newDept, headUser: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g. admin@mbg.com"
                    />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentManagement;