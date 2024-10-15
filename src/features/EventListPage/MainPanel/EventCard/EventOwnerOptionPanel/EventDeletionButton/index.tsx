import { FC } from "react"
import { Button } from "@mantine/core"
import style from "./index.module.css"

interface Props {
  onClick: () => void
}

export const EventDeletionButton: FC<Props> = ({ onClick }) => {
  return (
    <Button className={style.button} onClick={onClick}>
      消去
    </Button>
  )
}
