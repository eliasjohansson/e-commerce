import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: ${props => props.height || '100%'};
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Img = props => {
  return (
    <StyledImg height={props.height}>
      <img src={props.src} alt={props.alt} />
    </StyledImg>
  );
};

export default Img;
