import { FC, useEffect, useState } from "react"
import dayjs from "dayjs"
import { EventPropsForDetailPage } from "../../../states/"
import { downloadEventData } from "../controller/downloadEventData"
import { EventCard } from "./components/EventCard/view"
import styles from "./index.module.css"

export const MainPanel: FC = () => {
  const [ events, setEvents ] = useState<EventPropsForDetailPage[]>([])
  useEffect(() => {
    (async () => {
      await downloadEventData()
        .then((response) => {
          setEvents(response)
        })
        .catch((error) => {
          console.log(error)
        })
    })()
  }, [])

  return (
    <div className={styles.eventCards}>
      <nav className={styles.navStyle}>
        {events.map((event, i) => (
          <EventCard
            key={i}
            eventId={Number(event.eventID)}
            eventPictureUrl={event.event_picture}
            title={event.title}
            date={dayjs(event.date)}
            description={event.content}
            plannerUniqueId={event.planner_uniqueID}
          />
        ))}
      </nav>
    </div>
  )
}
