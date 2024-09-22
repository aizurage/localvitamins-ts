import { Calendar } from '@mantine/dates'
import { FC } from "react"
import { StartTimeInputPanel } from "./StartTimeInputPanel"
import { EndTimeInputPanel } from "./EndTimeInputPanel"
import { useDispatch } from 'react-redux'
import { setDate } from '../../../../app/slices/dateSlice'
import styles from "./index.module.css"

export const DateTimeInputPanel: FC = () => {
    const dispatch = useDispatch()

    return(
        <>
            <h4>日時</h4>
            <Calendar
                className={styles.calendar}
                onDateChange={(e: Date) => dispatch(setDate(e.toLocaleDateString()))}
                firstDayOfWeek={0} //sundayを指定
                locale="ja"
            />
            <div className={styles.time}>
                <StartTimeInputPanel />
                {" ~ "}
                <EndTimeInputPanel />
            </div>
        </>
    )
}