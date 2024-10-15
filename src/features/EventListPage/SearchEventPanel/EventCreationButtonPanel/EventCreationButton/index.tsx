import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

export const EventCreationButton: FC = () => {
  const navigate = useNavigate()
  return (
    <Button
      className={styles.makeEvent}
      onClick={() => {
        navigate("/eventMaker")
      }}
    >
      お手伝い作成
    </Button>
  )
}
