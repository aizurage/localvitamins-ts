import { FC, useState } from "react"
import { TimeInputPanel } from "../TimeInputPanel"

export const StartTimeInputPanel: FC = () => {
    const [startHour, setStartHour] = useState<string | null>("")
    const [startMinute, setStartMinute] = useState<string | null>("")

    return(
        <>
            <h4>開始時刻</h4>
            <TimeInputPanel
                hour={startHour}
                setHour={setStartHour}
                minute={startMinute}
                setMinute={setStartMinute}
            />
        </>
    )
}