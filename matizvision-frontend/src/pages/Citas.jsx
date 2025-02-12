import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Citas() {
  const [citas, setCitas] = useState([]);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await api.get('/api/citas');
        setCitas(response.data);
      } catch (error) {
        console.error('Error al obtener citas', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchCitas();
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const citaData = user ? { fecha, hora, userId: user.id } : { fecha, hora, email, telefono };
      await api.post('/api/citas', citaData);
      alert('Cita solicitada con éxito');
      setFecha('');
      setHora('');
      setEmail('');
      setTelefono('');
    } catch (error) {
      alert('Error al solicitar la cita');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px', backgroundColor: '#D3D3D3', minHeight: '100vh' }}> {/* Fondo plomo */}
        <h2 style={{ textAlign: 'center', color: '#008000' }}>Solicitar Cita</h2> {/* Verde */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', width: '50%' }}> {/* Blanco */}
            <label>Fecha:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
            <label>Hora:</label>
            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
            {!user && (
              <>
                <label>Correo:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
                <label>Teléfono:</label>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
              </>
            )}
            <button type="submit" style={{ backgroundColor: '#008000', color: '#ffffff', padding: '10px', border: 'none', borderRadius: '5px', width: '100%', cursor: 'pointer' }}>Solicitar Cita</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Citas;