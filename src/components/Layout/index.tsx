import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import styles from "./index.module.css"

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Outlet />
      </div>
    </>
  )
}
