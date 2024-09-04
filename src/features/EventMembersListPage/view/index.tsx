import { Button } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from "./index.module.css"

export default function EventMembersList() {
  const params = useParams()
  const [participantsList, setParticipantsList] = useState([])

  useEffect(() => {
  }, [params.eventNumber])

  const navigate = useNavigate()

  return (
    <>
      <h1>参加者リスト</h1>
      <TablePanel />
      <Button className={styles.closeButton} onClick={() => navigate('/')}>閉じる</Button>
    </>
  )
}
