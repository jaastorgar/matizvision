import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminLogs from './pages/AdminLogs';
import PanelSettings from './pages/PanelSettings';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/adminlogs" element={<AdminLogs />} />
                        <Route path="/panelsettings" element={<PanelSettings />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;