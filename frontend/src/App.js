// App.js
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { isAuthenticated } from './services/authService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
  )} />
);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* Ruta protegida de ejemplo */}
        <PrivateRoute path="/perfil" component={Perfil} />
      </Switch>
    </Router>
  );
}

export default App;