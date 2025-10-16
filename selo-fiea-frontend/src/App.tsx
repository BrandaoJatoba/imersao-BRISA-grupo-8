import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { AdminRegistrationPage } from './pages/AdminRegistrationPage';
import { ManagerRegistrationPage } from './pages/ManagerRegistrationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/admin-register" element={<AdminRegistrationPage />} />
      <Route path="register" element={<ManagerRegistrationPage />} />
    </Routes>
  )
}

export default App;