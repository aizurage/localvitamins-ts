import { FC } from "react"
import { Burger as _Burger } from "@mantine/core"
import styles from "./index.module.css"

interface Props {
    setOpen: (arg0: boolean) => void
}

export const Burger: FC<Props> = ({setOpen}) => {
    return(
        <_Burger
            onClick={() => setOpen(!open)}
            className={styles.burger}
        />
    )
}