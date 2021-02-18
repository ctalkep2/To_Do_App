import styled from 'styled-components';

export const SkeletonWrapCSS = styled.div`
	display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 5px;
  width: 80%;
`;

export const SkeletonCSS = styled.div`
	margin: 5px auto;
  padding: 5px 10px;
  width: -webkit-fill-available;
  border: 1px solid #ccc;
  border-radius: 5px;
`;