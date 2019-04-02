import React from 'react';
import styled from 'styled-components';
import { MdShoppingBasket } from 'react-icons/md';

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 90px;
  border-bottom: 1px solid black;
/*   padding: ${({ theme }) => `${theme.spacingM} ${theme.spacingXL}`}; */

  h1 {
    height: 100%;
    display: flex;
    align-items: center;
  }

  nav {
    height: 100%;
    display: flex;
    align-items: center;

    button {
      height: 100%;
      padding: 0 ${({ theme }) => theme.spacingL};
      border: none;
      background-color: none;
      cursor: pointer;
      outline: 0;
      transition: background .3s ease;

      &:hover {
        background-color: rgba(0,0,0,.03);
      }
    }
  }
`;

const Navbar = props => {
  return (
    <StyledNavbar>
      <h1>My Shop</h1>

      <nav>
        <button>Login</button>
        <button>
          <MdShoppingBasket />
        </button>
      </nav>
    </StyledNavbar>
  );
};

export default Navbar;
