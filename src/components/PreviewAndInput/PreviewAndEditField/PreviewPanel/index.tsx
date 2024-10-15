import { FC } from "react"

interface Props {
  title: string
  content: string
}

export const PreviewPanel: FC<Props> = ({ title, content }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{content}</p>
    </>
  )
}
