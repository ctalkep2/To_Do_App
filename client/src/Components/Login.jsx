import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

import { LoginCSS } from '../styles/Login.css';
import { Message } from '../styles/Auth.css';

function Login() {

	const auth = useContext(AuthContext);

	const { loading, request, error, clearError } = useHttp();
	const { messageHandler, message, color } = useMessage();

	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		messageHandler(error)
	}, [error, messageHandler])

	const changeHadler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	const loginHandler = async () => {

		try {
			clearError();

			const data = await request('/auth/login', 'POST', {...form});

			auth.login(data.token, data.userId);
		}	catch(e) {}	

	}

  return (
    <LoginCSS>
      <h2>Вход в систему</h2>
	    <div>
	    	<input
	    		type="email"
	    		name="email"
	    		placeholder="Email"
	    		onChange = {changeHadler}
	    	/>   
	    </div>
	    <div>
	    	<input
	    		type="password"
	    		name="password"
	    		placeholder="Пароль"
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
	    		onClick = {loginHandler}
	    		disabled = {loading}
	    	>
	    		Sign in
	    	</button>
	    </div>
	    <a href="/auth">Нет учетной записи?</a>
    </LoginCSS>
  );
}

export default Login;