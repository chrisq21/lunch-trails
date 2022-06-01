import * as React from "react"
import { GlobalStyles } from "./style"

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div id="root">
      <GlobalStyles></GlobalStyles>
      {children}
    </div>
  )
}

export default Layout
