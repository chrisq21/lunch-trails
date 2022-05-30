import { createGlobalStyle } from "styled-components"
import "../../styles/typography.css"

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Proxima Nova Regular';
  }

  html, body {
    margin: 0;
    padding: 0;
    border: 0;
  }
`
