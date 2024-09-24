import { FC } from "react"
import { HeadingDescriptionBlock } from "../../../../components/HeadingDescriptionBlock"
import { useAppSelector } from "../../../../app/hook"
import styles from "./index.module.css"

interface Props {
    recruiter_name: string
    recruiter_introduction: string
    recruiter_comment: string
}

export const EventRecruiterResultsPanel: FC<Props> = ({
    recruiter_name,
    recruiter_introduction,
    recruiter_comment
}) => {
    const recruiterPictureObjectUrl = useAppSelector(
        state => state.eventRecruiterPicture.eventRecruiterPictureObjectUrl
    )
    return(
        <div>
            <h1>お願いした人</h1>
            <img
                className={styles.image}
                src={recruiterPictureObjectUrl ?? ""}
                alt="お願いした人の画像"
            />
            <HeadingDescriptionBlock
                heading="お名前"
                description={`${recruiter_name}さん`}
            />
            <HeadingDescriptionBlock
                heading="自己紹介"
                description={`${recruiter_introduction}`}
            />
            <HeadingDescriptionBlock
                heading="一言コメント"
                description={`${recruiter_comment}`}
            />
        </div>
    )
}