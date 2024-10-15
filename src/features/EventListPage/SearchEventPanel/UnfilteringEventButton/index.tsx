import { FC } from "react"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

interface Props {
  onClick: () => void
}

export const UnfilteringEventButton: FC<Props> = ({ onClick }) => {
  return (
    <Button variant="gradient" className={styles.button} onClick={onClick}>
      全イベントを表示
    </Button>
  )
}
