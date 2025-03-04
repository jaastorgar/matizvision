import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div>
            <h2>Acceso Denegado</h2>
            <p>No tienes permisos para ver esta página.</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
};

export default Unauthorized;