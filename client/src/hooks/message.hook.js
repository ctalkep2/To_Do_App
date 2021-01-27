import { useState, useCallback } from 'react';

export const useMessage = () => {

	const [message, setMessage] = useState(null);
	const [color, setColor] = useState({});

	const messageHandler = useCallback((error, response = null) => {

		if (error) {

			setColor({color: 'tomato'});
			setMessage(error);

		} else {

			setColor({color: 'green'});
			setMessage(response);

		}

	}, []);

	return { messageHandler, message, color };
} 