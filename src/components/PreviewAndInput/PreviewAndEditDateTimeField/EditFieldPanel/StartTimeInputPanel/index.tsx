import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../../../app/hook"
import {
  setStartHour,
  setStartMinute,
} from "../../../../../app/slices/timeSlice"
import { TimeInputPanel } from "../TimeInputPanel"

export const StartTimeInputPanel: FC = () => {
  const dispatch = useAppDispatch()
  const startTime = useAppSelector((state) => state.time.start)
  const _setStartHour = (arg: string | null) => {
    dispatch(setStartHour(arg))
  }
  const _setStartMinute = (arg: string | null) => {
    dispatch(setStartMinute(arg))
  }

  return (
    <>
      <h4>開始時刻</h4>
      <TimeInputPanel
        hour={startTime.hour}
        setHour={_setStartHour}
        minute={startTime.minute}
        setMinute={_setStartMinute}
      />
    </>
  )
}
