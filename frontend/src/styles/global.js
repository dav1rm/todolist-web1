import { createGlobalStyle } from "styled-components";

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
    background-color: #ECE9FC;
    color: #1D1D1B;
  }

  button, a {
    cursor: pointer;
  }
`;

export default GlobalStyle;
