import styled from 'styled-components';

export const LoginCSS = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	margin: auto;
	width: 100%;
	height: 100vh;
	text-align: center;

	> h2 {
		margin: 40px 0;
	}

	> a {
		text-decoration: none;
		color: #333;
	}

	> div {
		width: 100%;
		text-align: center;
	}

	> div > input {
		margin: 2px 0;
		padding: 5px 10px;
		width: 200px;
		text-align: center;
		border: 1px solid #999;
	}

	> div > button {
		margin: 25px 0;
		padding: 5px 10px;
		width: 120px;
		border-radius: 6%;
		background-color: #333;
		color: #ccc;
		cursor: pointer;
	}

	> div > button:hover {
		background-color: #777;
		border-color: #777;
	}

	> div > button:active {
		background-color: #555;
	}

	> div > button:disabled {
		background-color: #777;
	}
`;