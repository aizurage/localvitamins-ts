import { FC, ReactNode } from "react"
import styles from "./index.module.css"

interface Props {
    children: ReactNode;
    onClick: () => void;
}

export const MenuListItem: FC<Props> = ({children, onClick}) => {
    return(
        <li
            className={styles.li}
            onClick={onClick}
        >
            {children}
        </li>
    )
}