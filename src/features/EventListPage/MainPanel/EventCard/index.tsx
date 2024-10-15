import { useState, useEffect, FC } from "react"
import { Dayjs } from "dayjs"
import { useAppSelector } from "../../../../app/hook"
import { EventButtonPanel } from "./EventButtonPanel"
import { EventImagePanel } from "./EventImagePanel"
import { EventOwnerOptionPanel } from "./EventOwnerOptionPanel"
import { EventTextDescriptionPanel } from "./EventTextDescriptionPanel"
import { downloadEventImage } from "./controller/downloadEventImage"
import styles from "./index.module.css"

interface Props {
  eventId: number
  eventPictureUrl: string
  title: string
  date: Dayjs
  description: string
  plannerUniqueId: string
}

export const EventCard: FC<Props> = ({
  eventId,
  eventPictureUrl,
  title,
  date,
  description,
  plannerUniqueId,
}) => {
  const [eventPictureObjectUrl, setEventPictureObjectUrl] = useState("")
  const user = useAppSelector((state) => state.user.user)
  useEffect(() => {
    ;(async () => {
      const fetchedObjectUrl = await downloadEventImage(eventPictureUrl)
      setEventPictureObjectUrl(fetchedObjectUrl)
    })()
  }, [eventPictureUrl])

  return (
    <div className={styles.card} key={eventId}>
      <EventImagePanel objectUrl={eventPictureObjectUrl} alt={title} />
      <EventTextDescriptionPanel
        title={title}
        date={date}
        description={description}
      />
      <EventButtonPanel
        eventId={eventId}
        title={title}
        date={date}
        open={() => {}}
      />
      <div>
        {user.id === plannerUniqueId && (
          <EventOwnerOptionPanel eventId={eventId} />
        )}
      </div>
    </div>
  )
}
