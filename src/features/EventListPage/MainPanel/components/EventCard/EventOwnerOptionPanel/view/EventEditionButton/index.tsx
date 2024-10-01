import { FC } from "react"
import { Link } from "react-router-dom"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

export const EventEditionButton: FC<{eventId: number}> = ({ eventId }) => {
  return(
    <Button
      className={styles.button}
      component={Link}
      to={`/eventedit/${eventId}`}
    >
          編集
    </Button>
  )
}
