import styled from 'styled-components';

export const ProfileCSS = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;
	width: 500px;

	> div {
		display: flex;
		flex-direction: row;
		margin: 5px 0;

		> img {
			width: 100%;
		}
	}

	> button {
		margin: 0 auto;
		margin-top: 15px;
		padding: 5px 10px;
		width: 50%;
		border-radius: 6%;
		background-color: #333;
		color: #ccc;
		cursor: pointer;
	}	

	> button:hover {
		background-color: #777;
		border-color: #777;
	}

	> button:active {
		background-color: #555;
	}

	> button:disabled {
		background-color: #777;
		border-color: #777;
		cursor: auto;
	}

	@media screen and (max-width: 1200px) {
		width: 50%;
	}

	@media screen and (max-width: 768px) {
		width: 70%;
	}

	@media screen and (max-width: 480px) {
		width: 95%;
	}
`

export const InputProfileCss = styled.div`
	width: 49.9%;

	> input {
		padding: 5px 10px;
		width: 90%;
		border: 1px solid #999;
	}
`;

export const Descriptons = styled.div`
	display: flex;
	align-items: center;
	width: 49.9%;

	> div {
		width: 59.9%;
	}

	> div:first-child {
		width: 39.9%;
	}
`;