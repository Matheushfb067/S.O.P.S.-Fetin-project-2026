import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardMedico from './pages/doctorInterface/DashboardMedico.jsx'
import PaginaSocorrista from './pages/paramedicsInterface/PaginaSocorrista.jsx'
import PaginaUsuario from './pages/userInterface/PaginaUsuario.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard-medico" replace />} />
      <Route path="/dashboard-medico" element={<DashboardMedico />} />
      <Route path="/socorrista" element={<PaginaSocorrista />} />
      <Route path="/usuario" element={<PaginaUsuario />} />
    </Routes>
  )
}

export default App