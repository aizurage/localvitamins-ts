import { Container, Stepper } from '@mantine/core'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { EventFormPanel } from './EventFormPanel'
import { EventInputsResultsPanel } from './EventInputsResultsPanel'
import { EventMakingCompletionPanel } from './EventMakingCompletionPanel'
import { EventRecruiterFormPanel } from './EventRecruiterFormPanel'
import { ButtonPanel } from './ButtonPanel'

export const EventMakingPage: FC = () => {
  const {register, handleSubmit, getValues} = useForm()
  const [active, setActive] = useState(0)

  const submit = () => {

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
            <EventFormPanel register={register} />
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
