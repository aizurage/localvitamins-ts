import { FC } from "react"
import { EventDeletionButton } from "./EventDeletionButton"
import { EventEditionButton } from "./EventEditionButton"
import { EventParticipantsDisplayButton } from "./EventParticipantsDisplayButton"
import styles from "./index.module.css"

export const EventOwnerOptionPanel: FC<{eventId: number}> = ({ eventId }) => {
  return (
    <div className={styles.ownerOption}>
      <EventParticipantsDisplayButton eventId={eventId} />
      <EventDeletionButton />
      <EventEditionButton eventId={eventId} />
    </div>
  )
}
