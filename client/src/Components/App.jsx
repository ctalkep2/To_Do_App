import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from '../routes/routes'
import { useAuth } from '../hooks/auth.hook';
import { AuthContext } from '../context/AuthContext';

function App() {
	const { login, logout, token, userId } = useAuth();
	const isAuthenticated = !!token;
	const routes = useRoutes(isAuthenticated);

  return (
  	<AuthContext.Provider value = {{
  		token, userId, login, logout, isAuthenticated
  	}}>
	  	<Router>
	      {routes}
	    </Router>
    </AuthContext.Provider>
  );
}

export default App;
