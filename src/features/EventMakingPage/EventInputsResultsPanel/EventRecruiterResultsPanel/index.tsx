import { FC } from "react"
import { useAppSelector } from "../../../../app/hook"
import { HeadingDescriptionBlock } from "../../../../components/HeadingDescriptionBlock"
import styles from "./index.module.css"

interface Props {
    recruiter: {
        name: string
        introduction: string
        comment: string
    }
}

export const EventRecruiterResultsPanel: FC<Props> = ({ recruiter }) => {
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
        description={`${recruiter.name}さん`}
      />
      <HeadingDescriptionBlock
        heading="自己紹介"
        description={`${recruiter.introduction}`}
      />
      <HeadingDescriptionBlock
        heading="一言コメント"
        description={`${recruiter.comment}`}
      />
    </div>
  )
}
