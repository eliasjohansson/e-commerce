import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colorPrimary};
  cursor: pointer;
  color: ${({ theme }) => theme.colorWhite};
  padding: ${({ theme }) => `${theme.spacingM} ${theme.spacingL}`};
  transition: all 0.2s ease-in-out;

  &:hover {
    /*  transform: scale(1.03); */
    background-color: ${({ theme }) => theme.colorSecondary};
  }
`;

const Button = props => {
  const { children, ...rest } = props;
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
