import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';
import Citas from './pages/Citas';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/productos" component={Productos} />
        <Route path="/servicios" component={Servicios} />
        <Route path="/citas" component={Citas} />
        <Route path="/contacto" component={Contacto} />
        <Route path="/login" component={Login} />
        <Route path="/perfil" component={Perfil} />
      </Switch>
    </Router>
  );
}

export default App;