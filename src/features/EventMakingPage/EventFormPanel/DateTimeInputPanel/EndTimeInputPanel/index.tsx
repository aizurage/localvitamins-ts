import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../../../app/hook"
import { setEndHour, setEndMinute } from "../../../../../app/slices/timeSlice"
import { TimeInputPanel } from "../TimeInputPanel"

export const EndTimeInputPanel: FC = () => {
  const dispatch = useAppDispatch()
  const endTime = useAppSelector((state) => state.time.end)
  const _setEndHour = (arg: string | null) => {
    dispatch(setEndHour(arg))
  }
  const _setEndMinute = (arg: string | null) => {
    dispatch(setEndMinute(arg))
  }

  return(
    <>
      <h4>終了時刻</h4>
      <TimeInputPanel
        hour={endTime.hour}
        setHour={_setEndHour}
        minute={endTime.minute}
        setMinute={_setEndMinute}
      />
    </>
  )
}
