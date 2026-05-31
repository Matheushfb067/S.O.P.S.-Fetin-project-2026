import { Routes, Route } from 'react-router-dom'
import DashboardMedico from './doctorInterface/DashboardMedico.jsx'
import PaginaSocorrista from './paramedicsInterface/PaginaSocorrista.jsx'
import PaginaUsuario from './userInterface/PaginaUsuario.jsx'

function App() {
  return (
    <Routes>
      <Route path="/dashboard-medico" element={<DashboardMedico />} />
       <Route path="/socorrista" element={<PaginaSocorrista />} />
      <Route path="/usuario" element={<PaginaUsuario />} />
    </Routes>
  )
}

export default App