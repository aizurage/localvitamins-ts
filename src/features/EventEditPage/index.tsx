import { useState, FC, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Stepper } from "@mantine/core"
import { useForm } from "react-hook-form"
import { Event, EventRecruiter } from "../../states"
import { ButtonPanel } from "./ButtonPanel"
import { EventEditionCompletionPanel } from "./EventEditionCompletionPanel"
import { EventFormPanel } from "./EventFormPanel"
import { EventInputsResultsPanel } from "./EventInputsResultsPanel"
import { EventRecruiterFormPanel } from "./EventRecruiterFormPanel"
import { downloadEventData } from "./controller/downloadEventData"

export const EventEditPage: FC = () => {
  const params = useParams()
  const { register, handleSubmit, getValues, setValue } = useForm()
  const [active, setActive] = useState(0)
  const [event, setEvent] = useState<Event>()
  const [eventRecruiter, setEventRecruiter] = useState<EventRecruiter>()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      await downloadEventData(Number(params.eventNumber))
        .then((response) => {
          setEvent(response.event)
          setEventRecruiter(response.eventRecruiter)
        })
        .catch((error) => {
          console.log(error)
        })
    })()
  }, [params.eventNumber])

  const submit = async () => {
    console.log("submit")
    navigate("/")
  }

  return (
    <Container>
      <h1>お手伝い情報編集</h1>
      <ButtonPanel setActive={setActive} />
      <form onSubmit={handleSubmit(submit)}>
        <Stepper color="orange" active={active} onStepClick={setActive}>
          <Stepper.Step
            label="お手伝い情報入力"
            description="お手伝いの基本情報を入力してください。"
          >
            {event ? (
              <EventFormPanel
                event={event}
                register={register}
                setValue={setValue}
              />
            ) : (
              <p>Loading event...</p>
            )}
          </Stepper.Step>
          <Stepper.Step
            label="お手伝い募集者情報入力"
            description="お手伝いをお願いした人の情報を入力してください。"
          >
            {eventRecruiter ? (
              <EventRecruiterFormPanel
                eventRecruiter={eventRecruiter}
                register={register}
                setValue={setValue}
              />
            ) : (
              <p>Loading event...</p>
            )}
          </Stepper.Step>
          <Stepper.Step
            label="入力情報確認"
            description="入力した情報を確認してください。"
          >
            <EventInputsResultsPanel getValues={getValues} />
          </Stepper.Step>
          <Stepper.Completed>
            <EventEditionCompletionPanel />
          </Stepper.Completed>
        </Stepper>
      </form>
      <ButtonPanel setActive={setActive} />
    </Container>
  )
}
