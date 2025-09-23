import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage.jsx';
import DashboardHome from './components/dashboard/DashboardHome.jsx';
import LoginForm from './components/forms/LoginForm.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
      </Route>
    
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
      </Route>
    </Routes>

  );
}

export default AppRoutes;
