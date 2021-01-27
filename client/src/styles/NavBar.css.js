import styled from 'styled-components';

export const NavBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 20px 0;
	background-color: #00000005;

	> button {
		margin: 0 20px;
		padding: 5px 10px;
		width: 120px;
		border-radius: 6%;
		border: none;
		background-color: rgba(250, 250, 250, 0);
		color: #000;
		font-size: 14px;
		cursor: pointer;
	}

	> button:hover {
		background-color: rgba(0, 0, 0, .6);
		color: #eee;
		border-color: #777;
	}

	> button:active {
		background-color: #555;
	}

	> a {
		margin-right: 20%;
		padding: 4px 15px;
		border-radius: 6%;
		text-decoration: none;
		color: #000;
	}

	> a:hover {
		color: #eee;
		background-color: rgba(0, 0, 0, .6);
	}
`;