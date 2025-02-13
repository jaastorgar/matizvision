import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Perfil = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [notificaciones, setNotificaciones] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchUsuario = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!storedUser) {
                navigate('/login');
                return;
            }
            setUsuario(storedUser);
            setNombre(storedUser.nombre);
            setEmail(storedUser.email);
            setTelefono(storedUser.telefono || '');
        };
        fetchUsuario();
    }, [navigate]);

    const handleActualizarPerfil = async () => {
        try {
            await api.put(`/usuarios/${usuario.id}`, { nombre, email, telefono });
            alert('✅ Perfil actualizado correctamente');
            localStorage.setItem("user", JSON.stringify({ ...usuario, nombre, email, telefono }));
        } catch (error) {
            alert('❌ Error al actualizar perfil');
        }
    };

    const handleCambiarPassword = async () => {
        if (password !== confirmPassword) {
            alert('❌ Las contraseñas no coinciden');
            return;
        }
        try {
            await api.put(`/usuarios/${usuario.id}/cambiar-password`, { password });
            alert('✅ Contraseña actualizada correctamente');
        } catch (error) {
            alert('❌ Error al cambiar la contraseña');
        }
    };

    const handleEliminarCuenta = async () => {
        if (!window.confirm('⚠️ ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
        try {
            await api.delete(`/usuarios/${usuario.id}`);
            localStorage.clear();
            alert('✅ Cuenta eliminada correctamente');
            navigate('/register');
        } catch (error) {
            alert('❌ Error al eliminar cuenta');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', color: '#0a0a1f' }}>Perfil</h2>

            <label>Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputStyle} />

            <label>Correo Electrónico</label>
            <input type="email" value={email} disabled style={inputStyle} />

            <label>Teléfono</label>
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={inputStyle} />

            <button onClick={handleActualizarPerfil} style={buttonStyle}>Actualizar Perfil</button>

            <h3 style={{ marginTop: '20px' }}>Cambiar Contraseña</h3>
            <input type="password" placeholder="Nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} />
            <button onClick={handleCambiarPassword} style={buttonStyle}>Cambiar Contraseña</button>

            <h3 style={{ marginTop: '20px' }}>Configuración</h3>
            <label>
                <input type="checkbox" checked={notificaciones} onChange={() => setNotificaciones(!notificaciones)} />
                &nbsp; Recibir notificaciones por correo
            </label>

            <button onClick={handleEliminarCuenta} style={{ ...buttonStyle, backgroundColor: 'red' }}>Eliminar Cuenta</button>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '5px'
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#0a0a1f',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

export default Perfil;