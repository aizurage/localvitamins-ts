import { FC } from "react"
import { Select } from "@mantine/core"
import styles from "./index.module.css"

interface Props {
  hour: string | null
  setHour: (arg: string | null) => void
  minute: string | null
  setMinute: (arg: string | null) => void
}

export const TimeInputPanel: FC<Props> = ({
  hour,
  setHour,
  minute,
  setMinute,
}) => {
  const hourSelections = Array.from({ length: 23 }, (_, index) => ({
    value: String(index + 1),
    label: String(index + 1),
  }))

  const minuteSelections = Array.from({ length: 6 }, (_, index) => ({
    value: String(index * 10),
    label: String(index * 10),
  }))

  return (
    <div className={styles.buttons}>
      <Select value={hour} data={hourSelections} onChange={setHour} clearable />
      <p>時</p>
      <Select
        value={minute}
        data={minuteSelections}
        onChange={setMinute}
        clearable
      />
      <p>分</p>
    </div>
  )
}
