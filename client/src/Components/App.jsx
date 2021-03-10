import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from '../routes/routes'
import { useAuth } from '../hooks/auth.hook';
import { useRedirect } from '../hooks/redirect.hook';
import { AuthContext } from '../context/AuthContext';

import Loader from './Loader'

function App() {
	const { login, logout, token, userId, ready } = useAuth();
	const { 
		registartionRedirect,
		profileRedirect,
		afterRedirect, 
		deleteProfile, 
		registration 
	} = useRedirect();

	const isAuthenticated = !!token;
	const routes = useRoutes(isAuthenticated, registration, deleteProfile);

	const contextValue = {
		token,
		userId,
		login,
		logout,
		isAuthenticated,
		registartionRedirect,
		profileRedirect,
		afterRedirect
	}

	if (!ready) {
		return (
			<div style={{
				display: 'flex',
				alignItems: 'center',
				height: window.innerHeight
			}}>
				<Loader />
			</div>
			)
	}

  return (
  	<AuthContext.Provider value = {contextValue}>
	  	<Router>
	      {routes}
	    </Router>
    </AuthContext.Provider>
  );
}

export default App;
