import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

import { AuthCSS, Message } from '../styles/Auth.css';

function Auth() {

	const { loading, request, error, clearError } = useHttp();
	const { messageHandler, message, color } = useMessage();

	const auth = useContext(AuthContext);

	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		auth.afterRedirect();
	}, [auth])

	useEffect(() => {
		messageHandler(error);
	}, [error, messageHandler])

	const changeHadler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	const registerHandler = async () => {

		try {
			clearError();

			const data = await request('/auth/register', 'POST', {...form});
			
			messageHandler(error, data.message);

			if (data) {
				auth.registartionRedirect();
			}

		}	catch(e) {}	

	}
	
  return (
  	<AuthCSS>
  		<h2>Регистрация нового пользователя</h2>
	    <div>
	    	<input
	    		type = "email"
	    		name = "email"
	    		placeholder = "Email"
	    		onChange = {changeHadler}
	    	/>   
	    </div>
	    <div>
	    	<input
	    		type = "password"
	    		name = "password"
	    		placeholder = "Пароль"
	    		onChange = {changeHadler}
	    	/>   
	    </div>
	    <Message
	    	theme={color}
	    >
	    	{message}
	    </Message>
	    <div>
	    	<button
	    		onClick = {registerHandler}
	    		disabled = {loading}
	    	>
	    		Sign up
	    	</button>
	    </div>	    
	    <a href = "/login">Зарегестрированы?</a>
    </AuthCSS>
  );
}

export default Auth;