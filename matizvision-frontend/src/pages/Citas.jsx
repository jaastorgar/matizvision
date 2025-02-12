import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Citas() {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("❌ Error al parsear el usuario:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // ✅ Obtener el token de autenticación
      if (!token) {
        alert("❌ Debes iniciar sesión para agendar una cita.");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` }; // ✅ Agregar el token en la solicitud

      const citaData = user 
        ? { fecha, hora, userId: user.id } 
        : { fecha, hora, email, telefono };

      const response = await api.post('/citas', citaData, { headers });

      alert(response.data.msg || '✅ Cita solicitada con éxito');
      setFecha('');
      setHora('');
      setEmail('');
      setTelefono('');
    } catch (error) {
      alert('❌ Error al solicitar la cita: ' + (error.response?.data?.msg || error.message));
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2 style={titleStyle}>📅 Solicitar Cita</h2>
          <form onSubmit={handleSubmit} style={formContainerStyle}>
            <label style={labelStyle}>Fecha:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required style={inputStyle} />

            <label style={labelStyle}>Hora:</label>
            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required style={inputStyle} />

            {!user && (
              <>
                <label style={labelStyle}>Correo:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

                <label style={labelStyle}>Teléfono:</label>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required style={inputStyle} />
              </>
            )}

            <button type="submit" style={buttonStyle}>📌 Solicitar Cita</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

const containerStyle = {
  padding: '40px',
  backgroundColor: '#f0f0f0',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const formStyle = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '500px'
};

const titleStyle = {
  textAlign: 'center',
  color: '#008000',
  marginBottom: '20px'
};

const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '5px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px'
};

const buttonStyle = {
  backgroundColor: '#008000',
  color: '#ffffff',
  padding: '12px',
  border: 'none',
  borderRadius: '5px',
  width: '100%',
  cursor: 'pointer',
  fontSize: '18px',
  marginTop: '15px'
};

export default Citas;