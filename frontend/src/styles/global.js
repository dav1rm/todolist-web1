import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  
  html, body, #root {
    height: 100vh;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: 'Montserrat', sans-serif;
    background-color: #E9ECF8;
    color: #1D1D1B;
  }

  button, a {
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;
  }

  input, select, textarea {
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyle;
