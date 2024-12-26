import React, { useState, useRef } from 'react';
import api from '../services/api';

const RegisterAdmin = () => {
    const [formData, setFormData] = useState({
      name: '',
      last_name: '',
      email: '',
      password: '',
      rut: '',
      dv: '',
      age: '',
      birth_date: '',
      profile_picture: null,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleFileChange = (e) => {
      setFormData((prev) => ({ ...prev, profile_picture: e.target.files[0] }));
    };
  
    const handleOpenCamera = () => {
      setIsCameraOpen(true);
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((err) => {
          console.error('Error al acceder a la cámara:', err);
        });
    };
  
    const handleCapturePhoto = () => {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 300, 300);
      canvasRef.current.toBlob((blob) => {
        setFormData((prev) => ({ ...prev, profile_picture: blob }));
      });
      setIsCameraOpen(false);
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
  
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      try {
        const response = await api.post('/auth/register-admin', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setSuccess(`Administrador ${response.data.name} creado con éxito`);
        setFormData({
          name: '',
          last_name: '',
          email: '',
          password: '',
          rut: '',
          dv: '',
          age: '',
          birth_date: '',
          profile_picture: null,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Error al registrar administrador');
      }
    };
  
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Registro de Administrador</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="last_name">Apellido:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="rut">RUT:</label>
            <input
              type="text"
              id="rut"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="dv">Dígito Verificador:</label>
            <input
              type="text"
              id="dv"
              name="dv"
              value={formData.dv}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="age">Edad:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="birth_date">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="profile_picture">Foto de Perfil:</label>
            <input
              type="file"
              id="profile_picture"
              name="profile_picture"
              onChange={handleFileChange}
              style={styles.input}
            />
          </div>
          <button type="button" onClick={handleOpenCamera} style={styles.button}>
            Abrir Cámara
          </button>
          {isCameraOpen && (
            <div style={styles.cameraContainer}>
              <video ref={videoRef} style={styles.video}></video>
              <canvas ref={canvasRef} style={styles.canvas}></canvas>
              <button type="button" onClick={handleCapturePhoto} style={styles.button}>
                Capturar Foto
              </button>
            </div>
          )}
          <button type="submit" style={styles.button}>Registrar Administrador</button>
        </form>
        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: '15px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '15px',
  },
};

export default RegisterAdmin;