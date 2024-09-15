import { Button } from "@mantine/core"
import { FC } from "react"
import style from "./index.module.css"

export const EventDeletionButton:FC = () => {
    return(
        <Button
            className={style.button}
            onClick={() => setOpened(true)}
        >
          消去
        </Button>
    )
}