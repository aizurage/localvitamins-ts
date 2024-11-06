import { FC, ReactNode } from "react"
import styles from "./index.module.css"

interface Props {
    children: ReactNode;
}

export const CenterLayout: FC<Props> = ({ children }) => {
  return(
    <div className={styles.centerStyle}>
      {children}
    </div>
  )
}
