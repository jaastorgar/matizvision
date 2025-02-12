import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Citas from './pages/Citas';
import Lentes from './pages/Lentes';
import Carrito from './pages/Carrito';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/citas" element={<Citas />} />
      <Route path="/lentes" element={<Lentes />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;