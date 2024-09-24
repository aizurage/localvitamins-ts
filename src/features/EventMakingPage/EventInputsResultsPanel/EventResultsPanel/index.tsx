import { FC } from "react"
import { HeadingDescriptionBlock } from "../../../../components/HeadingDescriptionBlock"
import { useAppSelector } from "../../../../app/hook"
import { DateTimeBlock } from "../../../../components/DateTimeBlock"

interface Props {
    event: {
        title: string
        region: string
        target: string
        content: string
        belongings: string
        clothes: string
        reward: string
        site: string
        inquiry: string
    }
}

export const EventResultsPanel: FC<Props> = ({event}) => {
    const date = useAppSelector(state => state.date)
    const time = useAppSelector(state => state.time)
    const eventPictureObjectURL = useAppSelector(state => state.eventPicture.eventPictureObjectUrl)
    
    return(
        <div className='input_result'>
            <img src={eventPictureObjectURL ?? ""} alt="お手伝いのイメージ画像" width={400}/>
            <h1>{event.title}</h1>
            <HeadingDescriptionBlock
                heading="開催場所"
                description={event.region}
            />
            <DateTimeBlock
                heading="開催日時"
                date={date.date}
                from={`${time.start.hour}-${time.start.minute}`}
                to={`${time.end.hour}-${time.end.minute}`}
            />
            <HeadingDescriptionBlock
                heading="参加して欲しい人"
                description={event.target}
            />
            <HeadingDescriptionBlock
                heading="お手伝い内容"
                description={event.content}
            />
            <HeadingDescriptionBlock
                heading="持ち物"
                description={event.belongings}
            />
            <HeadingDescriptionBlock
                heading="服装"
                description={event.clothes}
            />
            <HeadingDescriptionBlock
                heading="お礼"
                description={event.reward}
            />
            <HeadingDescriptionBlock
                heading="集合場所"
                description={event.site}
            />
            <HeadingDescriptionBlock
                heading="お問い合わせ先"
                description={event.inquiry}
            />
        </div>
    )
}