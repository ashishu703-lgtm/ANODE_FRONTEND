import React, { useState, useRef } from 'react';
import { Search, UserPlus, Upload, Edit, LogOut, Trash2, Hash, User, Mail, Shield, Building, Target, Calendar, MoreHorizontal, TrendingUp, AlertTriangle } from 'lucide-react';

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
      achievedTarget: '45/50',
      remainingTarget: '5/50',
      createdAt: 'Thu, May 15, 2025'
    },
    {
      id: 2,
      username: 'TeleSales',
      email: 'telesalesuser@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'TELESALES DEPARTMENT',
      target: 'Not specified',
      achievedTarget: '38/40',
      remainingTarget: '2/40',
      createdAt: 'Tue, May 20, 2025'
    },
    {
      id: 3,
      username: 'TeleUser',
      email: 'teleuser@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'TELESALES DEPARTMENT',
      target: 'Not specified',
      achievedTarget: '25/30',
      remainingTarget: '5/30',
      createdAt: 'Tue, May 20, 2025'
    },
    {
      id: 4,
      username: 'MohitPatel',
      email: 'mohitpa021@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'SALES DEPARTMENT',
      target: 'Not specified',
      achievedTarget: '52/50',
      remainingTarget: '0/50',
      createdAt: 'Wed, May 21, 2025'
    },
    {
      id: 5,
      username: 'Saurabh',
      email: 'saurabhmg18@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'SALES DEPARTMENT',
      target: 'Not specified',
      achievedTarget: '30/45',
      remainingTarget: '15/45',
      createdAt: 'Thu, May 22, 2025'
    },
    {
      id: 6,
      username: 'Anjali',
      email: 'Any738959730@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'SALES DEPARTMENT',
      target: 'Not specified',
      achievedTarget: '42/50',
      remainingTarget: '8/50',
      createdAt: 'Sat, May 24, 2025'
    },
    {
      id: 7,
      username: 'ekta',
      email: 'ektakushwahal20@gmail.com',
      role: 'DEPARTMENT USER',
      department: 'SALES DEPARTMENT',
      target: 'Not specified',
      achievedTarget: '28/35',
      remainingTarget: '7/35',
      createdAt: 'Mon, May 26, 2025'
    },
    {
      id: 8,
      username: 'MarketingUser',
      email: 'marketing@example.com',
      role: 'DEPARTMENT USER',
      department: 'MARKETING DEPARTMENT',
      target: 'Not specified',
      achievedTarget: '15/20',
      remainingTarget: '5/20',
      createdAt: 'Tue, May 27, 2025'
    },
    {
      id: 9,
      username: 'OfficeSales',
      email: 'office@example.com',
      role: 'DEPARTMENT USER',
      department: 'OFFICE SALES DEPARTMENT',
      target: 'Not specified',
      achievedTarget: '22/25',
      remainingTarget: '3/25',
      createdAt: 'Wed, May 28, 2025'
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.achievedTarget.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.remainingTarget.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'DEPARTMENT USER',
    department: 'SALES DEPARTMENT',
    target: 'Not specified',
    achievedTarget: '0/0',
    remainingTarget: '0/0'
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const handleEdit = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleLogout = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    // Map department types to user types
    let userType = 'salesperson'; // default
    if (user.department === 'SALES DEPARTMENT') {
      userType = 'marketing-salesperson';
    } else if (user.department === 'TELESALES DEPARTMENT') {
      userType = 'tele-sales';
    } else if (user.department === 'OFFICE SALES DEPARTMENT') {
      userType = 'office-sales-person';
    }
    
    const url = `${window.location.origin}?userType=${userType}&login=true&userId=${encodeURIComponent(userId)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const rows = text.split(/\r?\n/).filter(Boolean);
      if (rows.length === 0) return;
      const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
      const getIndex = (name) => headers.indexOf(name);
      const idx = {
        username: getIndex('username'),
        email: getIndex('email'),
        role: getIndex('role'),
        department: getIndex('department'),
        target: getIndex('target'),
        achievedtarget: getIndex('achievedtarget'),
        remainingtarget: getIndex('remainingtarget'),
        createdAt: getIndex('createdat')
      };
      const nextIdStart = (users.at(-1)?.id ?? 0) + 1;
      const parsed = rows.slice(1).map((line, i) => {
        const cols = line.split(',');
        const createdAtVal = idx.createdAt >= 0 ? cols[idx.createdAt]?.trim() : new Date().toDateString();
        return {
          id: nextIdStart + i,
          username: idx.username >= 0 ? cols[idx.username]?.trim() : '',
          email: idx.email >= 0 ? cols[idx.email]?.trim() : '',
          role: (idx.role >= 0 ? cols[idx.role]?.trim() : 'DEPARTMENT USER') || 'DEPARTMENT USER',
          department: (idx.department >= 0 ? cols[idx.department]?.trim() : 'SALES DEPARTMENT') || 'SALES DEPARTMENT',
          target: (idx.target >= 0 ? cols[idx.target]?.trim() : 'Not specified') || 'Not specified',
          achievedTarget: (idx.achievedtarget >= 0 ? cols[idx.achievedtarget]?.trim() : '0/0') || '0/0',
          remainingTarget: (idx.remainingtarget >= 0 ? cols[idx.remainingtarget]?.trim() : '0/0') || '0/0',
          createdAt: createdAtVal || new Date().toDateString()
        };
      }).filter(u => u.username || u.email);
      if (parsed.length > 0) {
        setUsers(prev => [...parsed, ...prev]);
      }
    } catch (err) {
      console.error('Import failed:', err);
    } finally {
      e.target.value = '';
    }
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const getDepartmentBadgeColor = (department) => {
    switch (department) {
      case 'SALES DEPARTMENT':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'TELESALES DEPARTMENT':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'MARKETING DEPARTMENT':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'OFFICE SALES DEPARTMENT':
        return 'bg-orange-100 text-orange-800 border-orange-200';
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
              placeholder="Search by username, email, department type, target, achieved target, or remaining target"
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
              onClick={handleImportClick}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Hash className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700">#</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <User className="w-4 h-4 text-blue-600" />
                    Username
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    Email
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Shield className="w-4 h-4 text-orange-600" />
                    Role
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Building className="w-4 h-4 text-indigo-600" />
                    Department Type
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Target className="w-4 h-4 text-cyan-600" />
                    Target
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Achieved Target
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    Remaining Target
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Calendar className="w-4 h-4 text-teal-600" />
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
                    <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">{user.achievedTarget}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-red-600 font-medium bg-red-50 px-2 py-1 rounded-md">{user.remainingTarget}</span>
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

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl border border-gray-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900">Add User</h3>
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
                  const nextId = (users.at(-1)?.id ?? 0) + 1;
                  const record = { id: nextId, createdAt: new Date().toDateString(), ...newUser };
                  setUsers((prev) => [record, ...prev]);
                  setSaving(false);
                  setShowAddModal(false);
                  setNewUser({ username: '', email: '', password: '', role: 'DEPARTMENT USER', department: 'SALES DEPARTMENT', target: 'Not specified', achievedTarget: '0/0', remainingTarget: '0/0' });
                }}
              >
                <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Username</label>
                    <input
                      type="text"
                      required
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter password"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option>DEPARTMENT USER</option>
                      <option>DEPARTMENT HEAD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Department</label>
                    <select
                      value={newUser.department}
                      onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option>SALES DEPARTMENT</option>
                      <option>TELESALES DEPARTMENT</option>
                      <option>MARKETING DEPARTMENT</option>
                      <option>OFFICE SALES DEPARTMENT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Target</label>
                    <input
                      type="text"
                      value={newUser.target}
                      onChange={(e) => setNewUser({ ...newUser, target: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 50 customers/month"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Achieved Target</label>
                    <input
                      type="text"
                      value={newUser.achievedTarget}
                      onChange={(e) => setNewUser({ ...newUser, achievedTarget: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 45/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Remaining Target</label>
                    <input
                      type="text"
                      value={newUser.remainingTarget}
                      onChange={(e) => setNewUser({ ...newUser, remainingTarget: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 5/50"
                    />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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

        {/* Edit User Modal */}
        {showEditModal && editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl border border-gray-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900">Edit User</h3>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowEditModal(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSavingEdit(true);
                  setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
                  setSavingEdit(false);
                  setShowEditModal(false);
                }}
              >
                <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Username</label>
                    <input
                      type="text"
                      required
                      value={editingUser.username}
                      onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Role</label>
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option>DEPARTMENT USER</option>
                      <option>DEPARTMENT HEAD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Department</label>
                    <select
                      value={editingUser.department}
                      onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option>SALES DEPARTMENT</option>
                      <option>TELESALES DEPARTMENT</option>
                      <option>MARKETING DEPARTMENT</option>
                      <option>OFFICE SALES DEPARTMENT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Target</label>
                    <input
                      type="text"
                      value={editingUser.target}
                      onChange={(e) => setEditingUser({ ...editingUser, target: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 50 customers/month"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Achieved Target</label>
                    <input
                      type="text"
                      value={editingUser.achievedTarget}
                      onChange={(e) => setEditingUser({ ...editingUser, achievedTarget: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 45/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Remaining Target</label>
                    <input
                      type="text"
                      value={editingUser.remainingTarget}
                      onChange={(e) => setEditingUser({ ...editingUser, remainingTarget: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 5/50"
                    />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    {savingEdit ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
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