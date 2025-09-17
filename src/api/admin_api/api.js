const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4500';

const ADMIN_BASE = `${API_BASE_URL}/api/admin`;
const DEPT_HEADS_BASE = `${ADMIN_BASE}/department-heads`;
const DEPT_USERS_BASE = `${ADMIN_BASE}/department-users`;

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  PROFILE: `${API_BASE_URL}/api/auth/profile`,
  
  // Department heads
  DEPARTMENT_HEADS_BASE: DEPT_HEADS_BASE,
  DEPARTMENT_HEADS_LIST: (query = '') => `${DEPT_HEADS_BASE}${query ? `?${query}` : ''}`,
  DEPARTMENT_HEADS_CREATE: () => `${DEPT_HEADS_BASE}`,
  DEPARTMENT_HEADS_STATS: () => `${DEPT_HEADS_BASE}/stats`,
  DEPARTMENT_HEADS_BY_COMPANY_DEPARTMENT: (companyName, departmentType) => `${DEPT_HEADS_BASE}/by-company-department/${encodeURIComponent(companyName)}/${encodeURIComponent(departmentType)}`,
  DEPARTMENT_HEAD_BY_ID: (id) => `${DEPT_HEADS_BASE}/${id}`,
  DEPARTMENT_HEAD_STATUS: (id) => `${DEPT_HEADS_BASE}/${id}/status`,
  
  // Department users
  DEPARTMENT_USERS_BASE: DEPT_USERS_BASE,
  DEPARTMENT_USERS_LIST: (query = '') => `${DEPT_USERS_BASE}${query ? `?${query}` : ''}`,
  DEPARTMENT_USERS_CREATE: () => `${DEPT_USERS_BASE}`,
  DEPARTMENT_USERS_STATS: () => `${DEPT_USERS_BASE}/stats`,
  DEPARTMENT_USERS_BY_HEAD: (headUserId) => `${DEPT_USERS_BASE}/by-head/${encodeURIComponent(headUserId)}`,
  DEPARTMENT_USER_BY_ID: (id) => `${DEPT_USERS_BASE}/${id}`,
  DEPARTMENT_USER_STATUS: (id) => `${DEPT_USERS_BASE}/${id}/status`,
};

export default API_BASE_URL;
