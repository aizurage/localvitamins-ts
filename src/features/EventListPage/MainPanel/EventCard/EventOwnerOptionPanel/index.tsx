import { FC, useState } from "react"
import { DeletionCheckModal } from "./DeletionCheckModal"
import { EventDeletionButton } from "./EventDeletionButton"
import { EventEditionButton } from "./EventEditionButton"
import { EventParticipantsDisplayButton }
  from "./EventParticipantsDisplayButton"
import styles from "./index.module.css"

export const EventOwnerOptionPanel: FC<{eventId: number}> = ({ eventId }) => {
  const [ isDeletionCheckModalOpen, setIsDeletionCheckModalOpen ]
    = useState(false)

  return (
    <div className={styles.ownerOption}>
      <EventParticipantsDisplayButton eventId={eventId} />
      <EventDeletionButton onClick={() => setIsDeletionCheckModalOpen(true)}/>
      <DeletionCheckModal
        opened={isDeletionCheckModalOpen}
        setOpened={setIsDeletionCheckModalOpen}
        eventId={eventId}
      />
      <EventEditionButton eventId={eventId} />
    </div>
  )
}
