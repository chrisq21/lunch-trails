import * as React from "react"
import { GlobalStyles } from "./style"

const Layout = ({
  children
}: { children: JSX.Element }) => {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      {children}
    </>
  )
}

export default Layout
