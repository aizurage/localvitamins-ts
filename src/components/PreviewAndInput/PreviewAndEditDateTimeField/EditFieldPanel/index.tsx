import { FC } from "react"
import { Button } from "@mantine/core"
import { Calendar } from "@mantine/dates"
import { useDispatch } from "react-redux"
import { setDate } from "../../../../app/slices/dateSlice"
import { EndTimeInputPanel } from "./EndTimeInputPanel"
import { StartTimeInputPanel } from "./StartTimeInputPanel"
import styles from "./index.module.css"

export const EditFieldPanel: FC = () => {
  const dispatch = useDispatch()
  return (
    <>
      <Calendar
        className={styles.calendar}
        onDateChange={(e: Date) => dispatch(setDate(e.toLocaleDateString()))}
        firstDayOfWeek={0} // sundayを指定
        locale="ja"
      />
      <div className={styles.flexBox}>
        <StartTimeInputPanel />
        <Button
          className={styles.cancelButton}
          onClick={() => {
            // TODO: 処理の内容を書くこと
            console.log("キャンセル")
          }}
        >
          キャンセル
        </Button>
      </div>
      <div className={styles.flexBox}>
        <EndTimeInputPanel />
        <Button
          className={styles.cancelButton}
          onClick={() => {
            // TODO: 処理の内容を書くこと
            console.log("キャンセル")
          }}
        >
          キャンセル
        </Button>
      </div>
    </>
  )
}
