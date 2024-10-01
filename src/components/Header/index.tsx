import { useState } from "react"
import { supabase } from "../../supabaseClient"
import { Burger } from "./Burger"
import { Drawer } from "./Drawer"
import { LogInButton } from "./LogInButton"
import { LogOutButton } from "./LogOutButton"
import { LogoutConfirmationDialog } from "./LogoutConfirmationDialog"
import styles from "./index.module.css"

export function Header() {
  const [ dialogOpen, setDialogOpen ] = useState(false)
  const [ drawerOpen, setDrawerOpen ] = useState(false)

  return (
    <header className={styles.header}>
      <Burger setOpen={setDrawerOpen} />
      <p className={styles.title}>Local Vitamins</p>
      <div className={styles.headerRight}>
        {
          supabase.auth.getUser() === null ?
            <LogInButton /> :
            <LogOutButton setOpen={setDialogOpen}/>
        }
      </div>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
      <LogoutConfirmationDialog open={dialogOpen} setOpen={setDialogOpen} />
    </header>
  )
}
