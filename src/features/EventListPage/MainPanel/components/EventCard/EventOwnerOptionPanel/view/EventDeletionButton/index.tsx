import { FC } from "react"
import { Button } from "@mantine/core"
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
