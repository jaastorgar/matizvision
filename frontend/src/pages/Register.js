import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    rut: '',
    dv: '',
    age: '',
    birth_date: '',
    email: '',
    password: '',
    profile_picture: null,
  });
  const [preview, setPreview] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_picture: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const openCamera = async () => {
    setCameraOpen(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'profile_picture.jpg', { type: 'image/jpeg' });
      setFormData({ ...formData, profile_picture: file });
      setPreview(URL.createObjectURL(blob));
    });

    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setCameraOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    console.log('Datos enviados:', formData);
    try {
      await api.post('/users/register', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Registro</h1>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          value={formData.last_name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="rut"
          placeholder="RUT"
          value={formData.rut}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="dv"
          placeholder="DV"
          value={formData.dv}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="date"
          name="birth_date"
          placeholder="Fecha de nacimiento"
          value={formData.birth_date}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.input}
        />
        <button type="button" onClick={openCamera} style={styles.button}>
          Tomar Foto
        </button>
        {cameraOpen && (
          <div style={styles.cameraContainer}>
            <video ref={videoRef} style={styles.video}></video>
            <button type="button" onClick={capturePhoto} style={styles.button}>
              Capturar
            </button>
            <button type="button" onClick={stopCamera} style={styles.button}>
              Cerrar Cámara
            </button>
          </div>
        )}
        {preview && <img src={preview} alt="Previsualización" style={styles.preview} />}
        <button type="submit" style={styles.button}>Registrar</button>
      </form>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#4CAF50',
    marginBottom: '20px',
    fontSize: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cameraContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  video: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  preview: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    marginTop: '10px',
  },
};

export default Register;