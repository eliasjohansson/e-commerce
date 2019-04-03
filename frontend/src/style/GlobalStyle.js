import { createGlobalStyle } from 'styled-components';
import modernNormalize from 'styled-modern-normalize';

const GlobalStyle = createGlobalStyle`
  ${modernNormalize}

  @import url('https://fonts.googleapis.com/css?family=Lato');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

  body {
    font-family: 'Lato', sans-serif;
    background-color: ${({ theme }) => theme.colorTest};
  }

  h1, h2, h3, h4, h5, h6, p {
    margin-top: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
