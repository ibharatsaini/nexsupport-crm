import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
// import { checkNeedsOnboarding } from '../api/auth';

// Layouts
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AcceptInvitation from '../pages/auth/AcceptInvitation';

// Dashboard pages
import Dashboard from '../pages/dashboard/Daashboard';
import Onboarding from '../pages/onboarding/Onboarding';
import { checkNeedsOnboarding } from '../api/auth';
import HomePage from '../pages/homepage/HomePage';


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (checkNeedsOnboarding()) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <Routes>
      <Route path='/' element={ <HomePage /> } />
      {/* Auth routes */}

      <Route element={<AuthLayout />}>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} 
        />
        <Route 
          path="/accept-invitation/:token" 
          element={<AcceptInvitation />} 
        />
      </Route>
      
      {/* Onboarding route */}
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } 
      />
      
      {/* Dashboard routes */}
      <Route 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
       
      </Route>
      
      {/* Redirect to login by default */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

export default AppRoutes;