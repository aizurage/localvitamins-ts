import { Container } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useState, useEffect, FC } from 'react'
import { EventPanel } from './EventPanel'
import { EventRecruiterPanel } from './EventRecruiterPanel'
import { Event, EventRecruiter } from '../../states'
import { downloadEventData } from './controller/downloadEventData'

export const EventDetailPage: FC = () => {
  const params = useParams()
  const [event, setEvent] = useState<Event>()
  const [eventRecruiter, setEventRecruiter] = useState<EventRecruiter>()
  
  useEffect(() => {
    (async() => {
      await downloadEventData(Number(params.eventNumber))
        .then((response) => {
          setEvent(response.event)
          setEventRecruiter(response.eventRecruiter)
        })
        .catch(error => {
          console.log(error)
        })
    })()
  }, [params.eventNumber])

  return (
    <Container>
      {event ? <EventPanel event={event} /> : <p>Loading event...</p>}
      {eventRecruiter ? <EventRecruiterPanel eventRecruiter={eventRecruiter} /> : <p>Loading recruiter...</p>}
    </Container>
  )
}
