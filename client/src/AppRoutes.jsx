import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage.jsx';
import DashboardHome from './components/dashboard/DashboardHome.jsx';
import LoginForm from './components/forms/LoginForm.jsx';
import RegisterForm from './components/forms/RegistrationForm.jsx';
import ForgotPasswordForm from './components/forms/ForgotPasswordForm.jsx';
import ResetPasswordForm from './components/forms/ResetPasswordForm.jsx';
import PollForm from './components/forms/PollForm.jsx';
import Polling from './components/dashboard/Polling.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        {/* Login/Register routes – redirect if already logged in */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginForm />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <RegisterForm />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:uid" element={<ResetPasswordForm />} />
      </Route>

      {/* Dashboard routes – protected */}
      <Route
        path="/dashboard"
        element={user ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<DashboardHome />} />
        <Route path="polls/create" element={<PollForm />} />
        <Route path="polls/:id" element={<Polling />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
