import styled from "styled-components"

export const GridContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas:
    "header header"
    "list map";
  grid-template-rows: 5rem auto;
  grid-template-columns: 30% auto;
`
