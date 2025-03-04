import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PanelSettings = () => {
    const [settings, setSettings] = useState([]);
    const [newSetting, setNewSetting] = useState({ key: '', value: '' });

    useEffect(() => {
        axios.get('http://localhost:3000/api/panelsettings', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => setSettings(response.data))
        .catch(error => console.error('Error:', error));
    }, []);

    const handleCreateSetting = () => {
        axios.post('http://localhost:3000/api/panelsettings', newSetting, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => setSettings([...settings, response.data]))
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h2>Configuración del Panel</h2>
            <input 
                type="text" 
                placeholder="Clave" 
                value={newSetting.key} 
                onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="Valor" 
                value={newSetting.value} 
                onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })} 
            />
            <button onClick={handleCreateSetting}>Agregar Configuración</button>

            <table>
                <thead>
                    <tr>
                        <th>Clave</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {settings.map(setting => (
                        <tr key={setting.id}>
                            <td>{setting.setting_key}</td>
                            <td>{setting.setting_value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PanelSettings;