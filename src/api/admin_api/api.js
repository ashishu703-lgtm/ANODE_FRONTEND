const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4500';

const ADMIN_BASE = `${API_BASE_URL}/api/admin`;
const DEPT_USERS_BASE = `${ADMIN_BASE}/department-users`;

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  PROFILE: `${API_BASE_URL}/api/auth/profile`,
  
  // Department users
  ADMIN_DEPT_USERS_BASE: DEPT_USERS_BASE,
  ADMIN_DEPT_USERS_LIST: (query = '') => `${DEPT_USERS_BASE}${query ? `?${query}` : ''}`,
  ADMIN_DEPT_USERS_CREATE: () => `${DEPT_USERS_BASE}`,
  ADMIN_DEPT_USERS_STATS: () => `${DEPT_USERS_BASE}/stats`,
  ADMIN_DEPT_USERS_HEADS: (companyName, departmentType) => `${DEPT_USERS_BASE}/heads/${encodeURIComponent(companyName)}/${encodeURIComponent(departmentType)}`,
  ADMIN_DEPT_USERS_UNDER_HEAD: (headEmail) => `${DEPT_USERS_BASE}/under-head/${encodeURIComponent(headEmail)}`,
  ADMIN_DEPT_USER_BY_ID: (id) => `${DEPT_USERS_BASE}/${id}`,
  ADMIN_DEPT_USER_STATUS: (id) => `${DEPT_USERS_BASE}/${id}/status`,
};

export default API_BASE_URL;
