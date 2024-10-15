import { FC } from "react"

export const HeadingDescriptionBlock: FC<{
  heading: string
  description: string
}> = ({ heading, description }) => {
  return (
    <>
      <h2>{heading}</h2>
      <p>{description}</p>
    </>
  )
}
