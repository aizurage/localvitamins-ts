import { FC, useEffect, useState } from "react"
import { HeadingDescriptionBlock } from
  "../../../components/HeadingDescriptionBlock"
import { EventRecruiter } from "../../../states"
import { downloadRecruiterImage } from "../controller/downloadRecruiterImage"
import styles from "./index.module.css"

export const EventRecruiterPanel: FC<{ eventRecruiter: EventRecruiter }> = ({
  eventRecruiter,
}) => {
  const [recruiterPictureObjectURL, setRecruiterPictureObjectURL] =
    useState("")
  useEffect(() => {
    (async () => {
      const eventRecruiterPictureObjectUrl = await downloadRecruiterImage(
        eventRecruiter.imageUrl
      )
      setRecruiterPictureObjectURL(eventRecruiterPictureObjectUrl)
    })()
  }, [eventRecruiter.imageUrl])

  return (
    <div className={styles.eventRecruiterPanelStyle}>
      <h1>お願いした人</h1>
      <img
        className={styles.eventRecruiterImageStyle}
        src={recruiterPictureObjectURL}
        alt="お願いした人"
      />
      <p>{eventRecruiter.name}さん</p>
      <HeadingDescriptionBlock
        heading="自己紹介"
        description={eventRecruiter.introduction}
      />
      <HeadingDescriptionBlock
        heading="一言コメント"
        description={eventRecruiter.comment}
      />
    </div>
  )
}
