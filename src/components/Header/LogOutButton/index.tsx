import { Button } from "@mantine/core";
import { FC } from "react";
import styles from "./index.module.css"

interface Props {
    setOpen: (arg: boolean) => void
}

export const LogOutButton: FC<Props> = ({setOpen}) => {
    return(
        <Button
            className={styles.button}
            onClick={() => {
                setOpen(true)
            }}
        >
            ログアウト
        </Button>
    )
}