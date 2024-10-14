import { FC } from "react"

interface Props {
  date: string
  start: string
  end: string
}

export const PreviewPanel: FC<Props> = ({ date, start, end }) => {
  return(
    <>
      <h3>日付: {date}</h3>
      <p>時間: {start} ~ {end}</p>
    </>
  )
}
