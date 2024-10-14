import { FC } from "react"

interface Props{
    date: string
    from: string
    to: string
}

export const PreviewPanel: FC<Props> = ({ date, from, to }) => {
  return(
    <>
      <h3>日付: {date}</h3>
      <p>時間: {from} ~ {to}</p>
    </>
  )
}
