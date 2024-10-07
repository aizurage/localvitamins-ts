import { FC } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@mantine/core"
import { TablePanel } from "./TablePanel"
import styles from "./index.module.css"

export const EventParticipantsListPage: FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  return (
    <>
      <h1>参加者リスト</h1>
      <TablePanel eventID={Number(params.eventNumber)} />
      <Button className={styles.closeButton} onClick={() => navigate("/")}>
        閉じる
      </Button>
    </>
  )
}
