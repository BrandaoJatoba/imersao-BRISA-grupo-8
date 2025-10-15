import { Routes, Route } from 'react-router-dom';
import  LandingPage  from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilesPage } from './pages/ProfilesPage';

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Rotas Protegidas (após login) */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/perfis" element={<ProfilesPage />} />
    </Routes>
  )
}

export default App;