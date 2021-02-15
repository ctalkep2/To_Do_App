import styled from 'styled-components';

export const TaskBody = styled.form`
	
	display: flex;
	flex-direction: column;
	width: 80%;
	margin: 0 auto;

	> input {		
		padding: 10px 20px;
		font-size: 20px;
	}

	> input:hover {
		border-color: #000;
	}
`;

export const TaskItem = styled.form`
	
	margin: 0 auto;
	width: 80%;
	font-size: 20px;

	> ul {
		padding: 0;		
		list-style-type: none;
	}

	> ul > li {
		position: relative;
		margin: 5px 0;
		padding: 5px 10px;
		padding-left: 30px;
		padding-right: 35px;
		border: 1px solid #ccc;
		border-radius: 5px;

		textarea {
			display: block;
			width: 100%;
			border: none;
			outline: none;
			resize: none;
			overflow: hidden;
			font-family: cursive;
			font-size: 100%;
		}
	}
`;

export const ArrowUp = styled.div`

	position: absolute;
	top: 2px;
	left: 9px;
	height: 10px;
	width: 10px;
	background-color: #333;
  -webkit-mask: url(/img/svg/up-arrow.svg) no-repeat center;
  -webkit-mask-size: contain;
	cursor: pointer;

	:hover {
		background-color: #aaa;
	}

`;

export const ArrowDown = styled.div`

	position: absolute;
	bottom: 2px;
	left: 9px;
	height: 10px;
	width: 10px;
	background-color: #333;
  -webkit-mask: url(/img/svg/arrow-down.svg) no-repeat center;
  -webkit-mask-size: contain;
	cursor: pointer;

	:hover {
		background-color: #aaa;
	}

`;

export const RemoveTask = styled.button`

	position: absolute;
	top: 9px;
	right: 5px;
	height: 25px;
	width: 25px;
	background-color: #333;
  -webkit-mask: url(/img/Waste-papper.png) no-repeat center;
  -webkit-mask-size: contain;
	cursor: pointer;

	:hover {
		background-color: #aaa;
	}

	:disabled {
		background-color: #aaa;
		cursor: auto;
	}
`;

export const CompliteTask = styled.div`	
	padding: 2px;
	font-size: 100%;
	font-family: cursive;
	color: ${props => (props.complite ? '#ccc' : '#333')};
	text-decoration: ${props => (props.complite ? 'line-through' : 'unset')};
	user-select: none;
	white-space: pre-wrap;
	cursor: pointer;
`;

export const CheckComplited = styled.div`
	position: absolute;
	right: -25px;
	top: 12px;
	
	> label::before {
		content: '';
  	display: block;
  	width: 15px;
  	height: 15px;
  	border: 2px solid #333;
  	border-radius: 20%;
	}

	> input {
		display: none;
	}

	> input[type=checkbox]:checked + label::before {
	  content: "\\2713";
	  text-align: center;
	  line-height: 15px;
	  border: 2px solid #aaa;
	}
`