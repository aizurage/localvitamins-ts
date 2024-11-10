import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hook"
import { Burger } from "./Burger"
import { Drawer } from "./Drawer"
import { LogInButton } from "./LogInButton"
import { LogOutButton } from "./LogOutButton"
import { LogoutConfirmationDialog } from "./LogoutConfirmationDialog"
import { SignUpButton } from "./SignUpButton"
import styles from "./index.module.css"

export function Header() {
  const [ dialogOpen, setDialogOpen ] = useState(false)
  const [ drawerOpen, setDrawerOpen ] = useState(false)
  const user = useAppSelector(state => state.user).user
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <Burger setOpen={() => setDrawerOpen(true)} />
      <div
        onClick={() => navigate("/")}
        className={styles.title}
      >
        Local Vitamins
      </div>
      <div className={styles.headerRight}>
        {user === null ? (
          <LogInButton />
        ) : (
          <LogOutButton setOpen={setDialogOpen} />
        )}
        <SignUpButton />
      </div>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
      <LogoutConfirmationDialog open={dialogOpen} setOpen={setDialogOpen} />
    </header>
  )
}
