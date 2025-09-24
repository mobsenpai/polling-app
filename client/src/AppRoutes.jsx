import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage.jsx';
import DashboardHome from './components/dashboard/DashboardHome.jsx';
import LoginForm from './components/forms/LoginForm.jsx';
import RegisterForm from './components/forms/RegistrationForm.jsx';
import ForgotPasswordForm from './components/forms/ForgotPasswordForm.jsx';
import ResetPasswordForm from './components/forms/ResetPasswordForm.jsx';
import PollForm from './components/forms/PollForm.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/forgotpassword' element={<ForgotPasswordForm />} />
        <Route path='/resetpassword' element={<ResetPasswordForm />} />
       

      </Route>
    
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
         <Route path='/dashboard/polls/create' element={<PollForm/>}/>
      </Route>
    </Routes>

  );
}

export default AppRoutes;
