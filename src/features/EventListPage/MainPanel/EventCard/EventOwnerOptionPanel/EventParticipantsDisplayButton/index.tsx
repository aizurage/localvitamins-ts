import { FC } from "react"
import { Link } from "react-router-dom"
import { Button } from "@mantine/core"
import style from "./index.module.css"

export const EventParticipantsDisplayButton:FC<{eventId: number}> = ({ eventId }) => {
  return(
    <Button
      className={style.button}
      component={Link}
      to={`/eventmemberslist/${eventId}`}
    >
          参加者リスト表示
    </Button>
  )
}
