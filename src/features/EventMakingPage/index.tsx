import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Stepper } from '@mantine/core'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../app/hook'
import { selectEventDetails } from '../../app/selectEventDetails'
import { ButtonPanel } from './ButtonPanel'
import { EventFormPanel } from './EventFormPanel'
import { EventInputsResultsPanel } from './EventInputsResultsPanel'
import { EventMakingCompletionPanel } from './EventMakingCompletionPanel'
import { EventRecruiterFormPanel } from './EventRecruiterFormPanel'
import { handleEventInfoSubmit } from './controller/handleEventInfoSubmit'

export const EventMakingPage: FC = () => {
  const {
    eventPictureUrl,
    eventRecruiterPictureUrl,
    date,
    time,
    user
  } = useAppSelector(selectEventDetails)
  const { register, handleSubmit, getValues, setValue } = useForm()
  const [ active, setActive ] = useState(0)
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (values: any) => {
    const eventInfoData = {
      title: values.title,
      region: values.region,
      content: values.content,
      target: values.target,
      site: values.site,
      reward: values.reward,
      inquiry: values.inquiry,
      belongings: values.belongings,
      clothes: values.clothes,
      event_picture: eventPictureUrl,
      date: dayjs(date).format('YYYY-MM-DD'),
      start_time: `${time.start.hour}:${time.start.minute}:00`,
      end_time: `${time.end.hour}:${time.end.minute}:00`,
      planner_uniqueID: user.id,

      // event recruiter
      recruiter_name: values.recruiter_name,
      recruiter_introduction: values.recruiter_introduction,
      recruiter_comment: values.recruiter_comment,
      recruiter_picture: eventRecruiterPictureUrl,
    }

    handleEventInfoSubmit(eventInfoData)
      .then(() => navigate("/"))
      .catch(() => alert("イベントを登録できませんでした。"))
  }

  return(
    <Container>
      <h1>お手伝い新規作成</h1>
      <ButtonPanel setActive={setActive} />
      <form onSubmit={handleSubmit(submit)}>
        <Stepper color="orange" active={active} onStepClick={setActive}>
          <Stepper.Step
            label="お手伝い情報入力"
            description="お手伝いの基本情報を入力してください。"
          >
            <EventFormPanel register={register} setValue={setValue} />
          </Stepper.Step>
          <Stepper.Step
            label="お手伝い募集者情報入力"
            description="お手伝いをお願いした人の情報を入力してください。"
          >
            <EventRecruiterFormPanel register={register} />
          </Stepper.Step>
          <Stepper.Step
            label="入力情報確認"
            description="入力した情報を確認してください。"
          >
            <EventInputsResultsPanel getValues={getValues} />
          </Stepper.Step>
          <Stepper.Completed>
            <EventMakingCompletionPanel />
          </Stepper.Completed>
        </Stepper>
      </form>
      <ButtonPanel setActive={setActive} />
    </Container>
  )
}
