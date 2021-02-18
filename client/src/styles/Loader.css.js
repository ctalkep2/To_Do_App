import styled from 'styled-components';

export const LoaderCss = styled.div`
	{
	  display: flex;
	  margin: 0 auto;
	  width: 80px;
	  height: 80px;
	}

	:after {
	  content: " ";
	  display: block;
	  width: 64px;
	  height: 64px;
	  border-radius: 50%;
	  border: 6px solid #000;
	  border-color: #999 transparent #999 transparent;
	  animation: lds-dual-ring 1.2s linear infinite;
	}

	@keyframes lds-dual-ring {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}
`