import React from 'react';
import styled from 'styled-components';
import { useStore, useActions } from 'easy-peasy';
import Button from '../components/Button';
import { navigate, Redirect, Link } from '@reach/router';

const StyledAccount = styled.div``;

const Account = props => {
  const { isAuthenticated, isLoading, authenticatedUser } = useStore(
    state => state.auth
  );
  const { logout } = useActions(actions => actions.auth);

  if (!isLoading && !isAuthenticated) return <Redirect to="/" noThrow />;
  return (
    <StyledAccount>
      <Link to="/">Go back home</Link>
      <h1 style={{ marginTop: '1rem' }}>
        Account - {isAuthenticated && authenticatedUser.username}
      </h1>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </StyledAccount>
  );
};

export default Account;
