import * as React from "react"
import { globalStyles } from "./style"
import { Global } from "@emotion/react"
const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div id="root">
      <Global styles={globalStyles} />
      {children}
    </div>
  )
}

export default Layout
