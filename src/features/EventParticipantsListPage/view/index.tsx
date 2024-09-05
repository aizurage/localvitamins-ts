import { Button } from '@mantine/core'
import { useParams, useNavigate } from 'react-router-dom'
import styles from "./index.module.css"
import { TablePanel } from '../TablePanel/view'

export default function EventParticipantsListPage() {
  const params = useParams()
  const navigate = useNavigate()

  return (
    <>
      <h1>参加者リスト</h1>
      <TablePanel eventID={Number(params.eventNumber)} />
      <Button className={styles.closeButton} onClick={() => navigate('/')}>閉じる</Button>
    </>
  )
}
