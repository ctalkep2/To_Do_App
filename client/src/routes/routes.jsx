import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Tasks from '../Components/Tasks';
import Profile from '../Components/Profile';

import Auth from '../Components/Auth';
import Login from '../Components/Login';

export const useRoutes = (isAuthenticated, registration, deleteProfile) => {

	if (isAuthenticated) {
		return(
			<Switch>
				<Route path="/tasks" exact>
					<Tasks />
				</Route>
				<Route path="/profile" exact>
					<Profile />
				</Route>
				<Redirect to="/tasks" />
			</Switch>
		);
	}

	if (registration) {
		return(
			<Switch>				
				<Route path="/login" exact>
					<Auth />
				</Route>
				<Redirect to="/login" />
			</Switch>
		);
	}

	if (deleteProfile) {
		return(
			<Switch>				
				<Route path="/auth" exact>
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return(
		<Switch>
			<Route path="/auth" exact>
				<Auth />
			</Route>
			<Route path="/login" exact>
				<Login />
			</Route>
			<Redirect to="/login" />
		</Switch>
	);

};