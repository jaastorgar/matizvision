import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PanelSettings = () => {
    const [settings, setSettings] = useState([]);
    const [newSetting, setNewSetting] = useState({ setting_key: '', setting_value: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/api/panelsettings', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => setSettings(response.data))
        .catch(error => console.error('❌ Error al obtener configuraciones:', error));
    }, []);

    const handleCreateSetting = () => {
        if (!newSetting.setting_key || !newSetting.setting_value) {
            alert("❌ Por favor ingresa una clave y un valor.");
            return;
        }

        if (settings.some(setting => setting.setting_key === newSetting.setting_key)) {
            alert("⚠️ La clave ya existe. Intenta con otra.");
            return;
        }

        axios.post('http://localhost:5000/api/panelsettings', newSetting, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            setSettings([...settings, response.data]);
            setNewSetting({ setting_key: '', setting_value: '' });

            if (newSetting.setting_key === 'modo_oscuro') {
                document.body.classList.toggle('dark-mode', newSetting.setting_value === 'true');
                localStorage.setItem('modo_oscuro', newSetting.setting_value);
            }
        })
        .catch(error => console.error('❌ Error al agregar configuración:', error));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Configuraciones del Sistema</h2>

            <div style={styles.settingsWrapper}>
                <div style={styles.card}>
                    <h3>Añadir Configuración</h3>
                    <input 
                        type="text" 
                        placeholder="Clave (Ej: modo_oscuro)" 
                        value={newSetting.setting_key} 
                        onChange={(e) => setNewSetting({ ...newSetting, setting_key: e.target.value })} 
                        style={styles.input}
                    />
                    <input 
                        type="text" 
                        placeholder="Valor (Ej: true o false)" 
                        value={newSetting.setting_value} 
                        onChange={(e) => setNewSetting({ ...newSetting, setting_value: e.target.value })} 
                        style={styles.input}
                    />
                    <button onClick={handleCreateSetting} style={styles.button}>Agregar Configuración</button>
                </div>

                <div style={styles.card}>
                    <h3>Configuraciones Actuales</h3>
                    {settings.length > 0 ? (
                        settings.map(setting => (
                            <div key={setting.id} style={styles.settingItem}>
                                <span>{setting.setting_key}</span>
                                {setting.setting_value === 'true' || setting.setting_value === 'false' ? (
                                    <input 
                                        type="checkbox" 
                                        checked={setting.setting_value === 'true'} 
                                        onChange={(e) => {
                                            axios.put(`http://localhost:5000/api/panelsettings/${setting.id}`, {
                                                setting_value: e.target.checked ? 'true' : 'false'
                                            }, {
                                                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                                            }).then(() => {
                                                setSettings(settings.map(s => 
                                                    s.id === setting.id ? { ...s, setting_value: e.target.checked ? 'true' : 'false' } : s
                                                ));

                                                if (setting.setting_key === 'modo_oscuro') {
                                                    document.body.classList.toggle('dark-mode', e.target.checked);
                                                    localStorage.setItem('modo_oscuro', e.target.checked.toString());
                                                }
                                            });
                                        }}
                                        style={styles.toggle}
                                    />
                                ) : (
                                    <span>{setting.setting_value}</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <p style={styles.noSettings}>No hay configuraciones disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        minHeight: '80vh',
        padding: '20px',
        backgroundColor: '#f4f4f4',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    settingsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        maxWidth: '900px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    settingItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ccc',
    },
    toggle: {
        cursor: 'pointer',
    },
    noSettings: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#777',
    }
};

export default PanelSettings;