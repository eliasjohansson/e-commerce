import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  height: 72px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-between;
`;

const Header = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
