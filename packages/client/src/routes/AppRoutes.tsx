import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { checkNeedsOnboarding } from '../api/auth';

// Layouts
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AcceptInvitation from '../pages/auth/AcceptInvitation';

// Dashboard pages
import Dashboard from '../pages/dashboard/Daashboard';
import TicketsList from '../pages/tickets/TicketsList';
import TicketDetails from '../pages/tickets/TicketDetails';
import CreateTicket from '../pages/tickets/CreateTicket';
import OrganizationsList from '../pages/organizations/OrganizationsList';
import OrganizationDetails from '../pages/organizations/OrganizationDetails';
import UsersList from '../pages/users/UsersList';
import KnowledgeBaseHome from '../pages/knowledge-base/KnowledgeBaseHome';
import ArticleDetails from '../pages/knowledge-base/ArticleDetails';
import ManageArticles from '../pages/knowledge-base/ManageArticles';
import ManageCategories from '../pages/knowledge-base/ManageCategories';
import Settings from '../pages/settings/Settings';
import Onboarding from '../pages/onboarding/Onboarding';
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
      <Route path='/' element={ <HomePage/> } />
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
        <Route path="/tickets" element={<TicketsList />} />
        <Route path="/tickets/new" element={<CreateTicket />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/organizations" element={<OrganizationsList />} />
        <Route path="/organizations/:id" element={<OrganizationDetails />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/knowledge-base" element={<KnowledgeBaseHome />} />
        <Route path="/knowledge-base/articles/:id" element={<ArticleDetails />} />
        <Route path="/knowledge-base/manage/articles" element={<ManageArticles />} />
        <Route path="/knowledge-base/manage/categories" element={<ManageCategories />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      
      {/* Redirect to login by default */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

export default AppRoutes;