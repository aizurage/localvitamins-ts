import { FC, useState } from "react"
import { TimeInputPanel } from "../TimeInputPanel"

export const EndTimeInputPanel: FC = () => {
    const [endHour, setEndHour] = useState<string | null>("")
    const [endMinute, setEndMinute] = useState<string | null>("")
    return(
        <>
            <h4>終了時刻</h4>
            <TimeInputPanel
                hour={endHour}
                setHour={setEndHour}
                minute={endMinute}
                setMinute={setEndMinute}
            />
        </>
    )
}