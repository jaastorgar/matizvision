import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      setErrorMessage("Credenciales inválidas. Intenta nuevamente.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}></div>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>🔐 Iniciar Sesión</h2>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Ingresar</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: '100vh',
    width: '100vw',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #2b5876, #4e4376)',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 70%)',
    zIndex: 1,
  },
  loginBox: {
    position: 'relative',
    zIndex: 2,
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 0 30px rgba(0,0,0,0.3)',
    maxWidth: '400px',
    width: '90%',
    color: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '24px',
  },
  error: {
    backgroundColor: '#ffcccc',
    color: '#b30000',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#00ffff',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  }
};

export default Login;