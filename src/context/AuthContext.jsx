import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../api/admin_api/api';

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  INITIALIZE: 'INITIALIZE',
  SET_LOADING: 'SET_LOADING',
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    
    case AUTH_ACTIONS.INITIALIZE:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
        error: null,
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize authentication state on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = apiClient.getAuthToken();
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        
        if (token && user) {
          dispatch({
            type: AUTH_ACTIONS.INITIALIZE,
            payload: {
              user,
              isAuthenticated: true,
            },
          });
        } else {
          dispatch({
            type: AUTH_ACTIONS.LOGOUT,
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({
          type: AUTH_ACTIONS.LOGOUT,
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      
      if (response.success && response.data) {
        // Store token and user data
        apiClient.setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: response.data.user,
          },
        });
        return { success: true, user: response.data.user };
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: {
          error: error.message || 'Login failed',
        },
      });
      return { success: false, error: error.message };
    }
  };

  // Register function (for SuperAdmin to create users)
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
      
      if (response.success && response.data) {
        return { success: true, user: response.data.user };
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: {
          error: error.message || 'Registration failed',
        },
      });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Call logout endpoint if available
      try {
        await apiClient.post(API_ENDPOINTS.LOGOUT);
      } catch (error) {
        // Continue with local logout even if API call fails
        console.warn('Logout API call failed:', error);
      }
      
      // Clear local data
      apiClient.removeAuthToken();
      localStorage.removeItem('user');
      
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if API call fails
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: false, error: error.message };
    }
  };


  // Clear error function
  const clearError = () => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN_FAILURE,
      payload: {
        error: null,
      },
    });
  };

  // Context value
  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;

