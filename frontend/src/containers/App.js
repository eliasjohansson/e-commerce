import React from 'react';
import { Router, Link } from '@reach/router';
import { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import GlobalStyle from '../style/GlobalStyle';
import Home from './Home';
import Test from './Test';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />

        <Router>
          <Home path="/" />
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
