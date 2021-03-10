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

		> .profileImage {
			margin: 0 auto;
			width: 300px;
			height: 300px;
			background: url(${props => props.path}) center no-repeat;
			background-size: cover;
			border-radius: 50%;

			
		}
	}

	.btn-profile {
		margin: 10px auto;
		padding: 5px 10px;
		width: 200px;
		border: none;
		border-radius: 5px;
		background-color: #333;
		color: #ddd;
		cursor: pointer;
	}	

	.btn-profile:hover {
		background-color: #888;
		color: #eee;
	}

	.btn-profile:focus {
		outline: none;
		background-color: #777;
		color: #eee;
	}

	button:active {
		border: none;
		background-color: #555;
	}

	button:disabled {
		background-color: #888;
		color: #eee;
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

export const UploadContainer = styled.form`
	display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 70px auto;
  width: 200px;
  height: 200px;
  outline: 2px dashed #5d5d5d;
  outline-offset: -12px;
  background-color: #e0f2f7;
  font-family: 'Segoe UI';
  color: #1f3c44;

  p {
  	position: absolute;
  	width: 100%;
  	top: -70px;
  	text-align: center;
  }

  input {
  	height: 200px;
  	width: 200px;
  	opacity: 0;
  	cursor: pointer;
  }

  input[type=file]:focus + label {
     /*Стили для метки*/
	}

  .add-input {
  	position: relative;

  	label, span {
  		position: absolute;
  		width: auto;
  		left: 0;
  		text-align: center;
  	}

  	label {
  		width: 100%;
  		top: 20px;
  	}

  	.extensions, .drag-and-drop {
  		width: 90%;
  		padding: 0 10px;
  		text-align: center;
  	}

  	.extensions {
  		top: 45px;
  	}

  	.drag-and-drop {
  		top: 130px;
  	}
  }

  button {
		position: absolute;
		top: 350px;
	}

  .add-img {
  	position: absolute;
  	width: 50px;
  	height: 50px;
  	background-color: #333;
  	-webkit-mask: url(/img/svg/add.svg) no-repeat center;
  	-webkit-mask-size: contain;
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