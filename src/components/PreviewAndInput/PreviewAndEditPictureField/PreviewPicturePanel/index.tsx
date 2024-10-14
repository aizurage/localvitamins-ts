import { FC } from "react"

interface Props {
    pictureUrl: string
    alt: string
}

export const PreviewPicturePanel: FC<Props> = ({
  pictureUrl,
  alt
}) => {
  return(
    <>
      <h3>写真</h3>
      <img src={pictureUrl} alt={alt} />
    </>
  )
}
