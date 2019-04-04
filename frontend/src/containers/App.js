import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from 'styled-components';
import { useStore, useActions } from 'easy-peasy';
import styled from 'styled-components';
import theme from '../style/theme';
import GlobalStyle from '../style/GlobalStyle';
import Home from './Home/index';
import Sidebar from '../components/Sidebar/index';
import Order from './Order';
import AuthModal from '../components/AuthModal';
import Account from './Account';

const StyledApp = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
  padding-right: 72px;

  > main {
    min-height: 100%;
    width: 100%;
    padding: ${({ theme }) => theme.spacingXL};
  }
`;

const App = () => {
  const { authenticatedUser, isAuthenticated, isLoading } = useStore(
    state => state.auth
  );
  const { logout, setLoading, setToken, tokenAuthenticate } = useActions(
    actions => actions.auth
  );

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    // Try getting authenticated user if access_token exists in localStorage
    if (!isAuthenticated && access_token) {
      setToken(access_token);
      tokenAuthenticate().then(() => {
        // Get all notifications and initiate event listener
        /* getNotifications().then(() => {
          notificationsEventListener();
        }); */
      });
    } else {
      // If no token was found, just set loading status to false
      setLoading(false);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />

        <StyledApp>
          <AuthModal />

          <main>
            <Router>
              <Home path="/*" />
              <Order path="/order" />
              {!isLoading && <Account path="/account" />}
            </Router>
          </main>

          <Sidebar />
        </StyledApp>
      </>
    </ThemeProvider>
  );
};

export default App;
