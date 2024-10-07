import { FC, useEffect } from "react"
import dayjs from "dayjs"
import { useAppDispatch, useAppSelector } from "../../../app/hook"
import { setEventList } from "../../../app/slices/eventListSlice"
import { downloadEventData } from "../controller/downloadEventData"
import { EventCard } from "./EventCard"
import styles from "./index.module.css"

export const MainPanel: FC = () => {
  const dispatch = useAppDispatch()
  const events = useAppSelector(state => state.eventList).eventlist
  useEffect(() => {
    (async () => {
      await downloadEventData()
        .then((response) => {
          dispatch(setEventList(response))
        })
        .catch((error) => {
          console.log(error)
        })
    })()
  }, [ dispatch ])

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
