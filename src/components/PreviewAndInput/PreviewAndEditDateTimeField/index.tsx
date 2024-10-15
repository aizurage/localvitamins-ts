import { FC } from "react"
import { EditFieldPanel } from "./EditFieldPanel"
import { PreviewPanel } from "./PreviewPanel"

interface Props {
  date: string
  start: string
  end: string
}

export const PreviewAndEditDateTimeField: FC<Props> = ({
  date,
  start,
  end,
}) => {
  return (
    <>
      <PreviewPanel date={date} start={start} end={end} />
      <EditFieldPanel />
    </>
  )
}
