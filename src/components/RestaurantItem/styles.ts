import styled from "styled-components"
import { borderGray } from "../../styles/colors"

export const ItemContainer = styled.div`
  position: relative;
  display: flex;
  border-radius: 8px;
  background: white;
  margin-bottom: 0.75rem;
  padding: 1rem;
  justify-content: space-between;

  border: 1px solid ${borderGray};
`
