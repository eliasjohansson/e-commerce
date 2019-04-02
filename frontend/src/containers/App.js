import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from 'styled-components';
import { useStore, useActions } from 'easy-peasy';
import styled from 'styled-components';
import theme from '../style/theme';
import GlobalStyle from '../style/GlobalStyle';
import Home from './Home/index';
import Sidebar from '../components/Sidebar/index';

const StyledApp = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
  padding-right: 72px;

  > main {
    height: 100%;
    width: 100%;
    padding: ${({ theme }) => theme.spacingXL};
  }
`;

const App = () => {
  const { authenticatedUser, isAuthenticated } = useStore(state => state.auth);
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

        {/* {authenticatedUser && <div>{authenticatedUser.username}</div>}
        <button onClick={() => logout()}>Logout</button>
        <button
          onClick={async () => {
            try {
              const res = await fetch(
                `${process.env.REACT_APP_API_URI}/users/login`,
                {
                  method: 'POST',
                  body: JSON.stringify({
                    username: 'Tester',
                    password: '123'
                  }),
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  }
                }
              );
              const { token, user } = await res.json();
              localStorage.setItem('access_token', token);
              setToken(token);
              setLoading(true);
              tokenAuthenticate();
            } catch ({ response: res }) {
              console.log(res);
            }
          }}
        >
          Login
        </button> */}

        <StyledApp>
          <main>
            <Router>
              <Home path="/" />
            </Router>
          </main>

          <Sidebar />
        </StyledApp>
      </>
    </ThemeProvider>
  );
};

export default App;
