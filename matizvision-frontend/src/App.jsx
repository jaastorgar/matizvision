import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Citas from './pages/Citas';
import Lentes from './pages/Lentes';
import Carrito from './pages/Carrito';
import Register from './pages/Register';
import CitasAgendadas from './pages/CitasAgendadas';
import Perfil from './pages/Perfil';
import MisCompras from './pages/MisCompras';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/citas" element={<Citas />} />
      <Route path="/lentes" element={<Lentes />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/register" element={<Register />} />
      <Route path="/citas-agendadas" element={<CitasAgendadas />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/compras" element={<MisCompras />} />
    </Routes>
  );
}

export default App;