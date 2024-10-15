import { FC } from "react"
import { Dayjs } from "dayjs"
import { Spoiler } from "./Spoiler"
import styles from "./index.module.css"

interface Props {
  title: string
  date: Dayjs
  description: string
}

export const EventTextDescriptionPanel: FC<Props> = ({
  title,
  date,
  description,
}) => {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <p>日付：{date.format("YYYY年MM月DD日")}</p>
      <Spoiler
        children={<p>{description}</p>}
        label="もっと表示"
        hiddenLabel="部分表示"
      />
    </>
  )
}
