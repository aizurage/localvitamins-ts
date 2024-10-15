import { FC, useState, useRef, ReactNode, useEffect } from "react"
import { supabase } from "../../../../../supabaseClient"
import styles from "./index.module.css"

interface Props {
  content: ReactNode
  children: ReactNode
}

export const Popover: FC<Props> = ({ content, children }) => {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleClick = () => {
    if (supabase.auth.getUser() === null) setOpen(true)
    else setOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node)
    )
      setOpen(false)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.popoverContainer}>
      <button
        className={styles.popoverTrigger}
        ref={buttonRef}
        onClick={handleClick}
      >
        {children}
      </button>
      {open && (
        <div className={styles.popoverContent} ref={popoverRef}>
          {content}
        </div>
      )}
    </div>
  )
}
