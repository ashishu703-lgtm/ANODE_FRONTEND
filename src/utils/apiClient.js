import { API_ENDPOINTS } from '../api/admin_api/api';

/**
 * Simple API Client - Direct calls to backend APIs
 * Follows DRY principles by using existing backend endpoints
 */
class ApiClient {
  constructor() {
    this.baseURL = API_ENDPOINTS.LOGIN.split('/api')[0];
  }

  /**
   * Get authentication token from localStorage
   */
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Set authentication token in localStorage
   */
  setAuthToken(token) {
    // Only set in this tab. We still use localStorage to keep compatibility,
    // but set ALSO a session-scoped copy and prefer that for reads.
    try { sessionStorage.setItem('authToken', token); } catch {}
    localStorage.setItem('authToken', token);
  }

  /**
   * Remove authentication token from localStorage
   */
  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  /**
   * Get headers with authentication token if available
   */
  getHeaders() {
    // Prefer session token (per-tab) if available, fallback to localStorage
    const token = sessionStorage.getItem('authToken') || this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Handle API response and errors
   */
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.error || 'An error occurred');
      error.status = response.status;
      error.data = data;
      throw error;
    }
    
    return data;
  }

  /**
   * Make HTTP request
   */
  async request(url, options = {}) {
    try {
      const config = {
        headers: this.getHeaders(),
        ...options,
      };

      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * POST request
   */
  async post(url, data = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * GET request
   */
  async get(url) {
    return this.request(url, { method: 'GET' });
  }

  /**
   * PUT request
   */
  async put(url, data = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.getAuthToken();
  }
}

// Export singleton instance
export default new ApiClient();
