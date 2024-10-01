import { FC } from "react"
import { Link } from "react-router-dom"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

interface Props {
    setOpen: (arg: boolean) => void
}

export const Back2HomeButton: FC<Props> = ({setOpen}) => {
    return(
        <Button
            className={styles.homeButton}
            component={Link}
            to={"/"}
            onClick={() => setOpen(false)}
        >
            ホームへ戻る
        </Button>
    )
}