import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 4px;
    border: none;
    font-weight: 700;
    color: #fff;
    background: ${colors.primaryColor};

    transition: all 300ms;
  }

  button:hover {
    filter: brightness(80%);
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }

  /* body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background: ${colors.successColor};
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background: ${colors.errorColor};
  } */
`;

export const Container = styled.section`
  padding: 30px;
  margin: 30px auto;
  max-width: 800px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
