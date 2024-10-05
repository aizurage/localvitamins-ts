import { FC } from "react"
import { Link } from "react-router-dom"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

export const TransitionToDetailPageButton: FC<{eventId: number}> = ({
  eventId
}) => {
  return(
    <Button
      className={styles.button}
      component={Link}
      to={`/eventdetail/${eventId}`}
    >
            詳細を見る
    </Button>
  )
}
