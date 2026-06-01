import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/login/loginPage.jsx'
import RegisterPage from './pages/login/RegisterPage.jsx'
import DashboardMedico from './pages/doctorInterface/DashboardMedico.jsx'
import PaginaSocorrista from './pages/paramedicsInterface/PaginaSocorrista.jsx'
import PaginaUsuario from './pages/userInterface/PaginaUsuario.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/dashboard-medico" element={<DashboardMedico />} />
      <Route path="/socorrista" element={<PaginaSocorrista />} />
      <Route path="/usuario" element={<PaginaUsuario />} />
    </Routes>
  )
}

export default App
