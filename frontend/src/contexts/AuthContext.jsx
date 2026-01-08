import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login');

  // Initialize auth state
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
        // Set auth header for axios
        axios.defaults.headers.common['x-auth-token'] = token;
      } catch (error) {
        console.error('Error parsing user data:', error);
        clearAuth();
      }
    }
    setLoading(false);
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = async (email, password, rememberMe = false) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });

    const { token, user } = response.data;
    
    // Store auth data
    if (rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
    
    // Set auth header
    axios.defaults.headers.common['x-auth-token'] = token;
    
    // Fetch full user profile
    try {
      const profileResponse = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { 'x-auth-token': token }
      });
      
      if (profileResponse.data.success) {
        const fullUser = profileResponse.data.user;
        
        // Update storage with full user data
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(fullUser));
        } else {
          sessionStorage.setItem('user', JSON.stringify(fullUser));
        }
        
        setUser(fullUser);
      } else {
        setUser(user);
      }
    } catch (profileError) {
      console.error('Error fetching profile:', profileError);
      setUser(user);
    }
    
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    
    let errorMessage = 'Login failed. Please try again.';
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }
    
    throw new Error(errorMessage);
  }
};

// In signup function (similar update):
// After successful signup, fetch the full profile
const signup = async (name, email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', {
      name,
      email,
      password
    });

    const { token, user } = response.data;
    
    // Store auth data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Set auth header
    axios.defaults.headers.common['x-auth-token'] = token;
    
    // Fetch full user profile
    try {
      const profileResponse = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { 'x-auth-token': token }
      });
      
      if (profileResponse.data.success) {
        const fullUser = profileResponse.data.user;
        localStorage.setItem('user', JSON.stringify(fullUser));
        setUser(fullUser);
      } else {
        setUser(user);
      }
    } catch (profileError) {
      console.error('Error fetching profile:', profileError);
      setUser(user);
    }
    
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    
    let errorMessage = 'Signup failed. Please try again.';
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error.response?.data?.errors?.length > 0) {
      errorMessage = error.response.data.errors[0].msg;
    }
    
    throw new Error(errorMessage);
  }
};

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
    }
  };

  const openAuthModal = (view = 'login') => {
    setAuthView(view);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    authModalOpen,
    authView,
    login,
    signup,
    logout,
    openAuthModal,
    closeAuthModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};