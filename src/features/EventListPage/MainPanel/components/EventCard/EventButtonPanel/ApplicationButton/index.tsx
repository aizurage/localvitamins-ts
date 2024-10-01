import { FC } from "react"
import { Button } from "@mantine/core"
import dayjs, { Dayjs } from "dayjs"
import styles from "./index.module.css"

interface Props {
    eventId: number
    title: string
    date: Dayjs
    open: (eventId: number, title: string) => void
}

export const ApplicationButton: FC<Props> = ({
  eventId,
  title,
  date,
  open
}) => {
  return(
    <Button
      className={styles.button}
      onClick={() => open(eventId, title)}
      disabled={dayjs(new Date).isAfter( date )}
    >
            参加する
    </Button>
  )
}
