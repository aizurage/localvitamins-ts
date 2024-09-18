import { Dayjs } from "dayjs"
import { FC } from "react"
import { ApplicationButton } from "./ApplicationButton"
import { TransitionToDetailPageButton } from "./TransitionToDetailPageButton"

interface Props {
    eventId: number
    title: string
    date: Dayjs
    open: (eventId: number, title: string) => void
}

export const EventButtonPanel: FC<Props> = ({
    eventId,
    title,
    date,
    open
}) => {
    return(
        <div>
            <TransitionToDetailPageButton eventId={eventId}/>
            <ApplicationButton 
                eventId={eventId}
                title={title}
                date={date}
                open={open}
            />
        </div>
    )
}