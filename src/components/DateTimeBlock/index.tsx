import dayjs from "dayjs"
import { FC } from "react"

interface DateTimeBlockProps {
    heading: string
    date: string
    from: string
    to: string
}

export const DateTimeBlock: FC<DateTimeBlockProps> = (datetime) => {
    return(
        <>
            <h2>{datetime.heading}</h2>
            <p>{dayjs(datetime.date).format("YYYY年MM月DD日")}</p>
            <p>`${dayjs(datetime.from).format("HH時MM分")} ~ ${dayjs(datetime.to).format("HH時MM分")}`</p>
        </>
    )
}