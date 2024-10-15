import { FC } from "react"
import { EditPicturePanel } from "./EditPicturePanel"
import { PreviewPicturePanel } from "./PreviewPicturePanel"

interface Props {
  pictureUrl: string
  alt: string
  onChange: () => void
  onClick: () => void
}

export const PreviewAndEditEventPictureField: FC<Props> = ({
  pictureUrl,
  alt,
  onChange,
  onClick,
}) => {
  return (
    <>
      <PreviewPicturePanel pictureUrl={pictureUrl} alt={alt} />
      <EditPicturePanel onChange={onChange} onClick={onClick} />
    </>
  )
}
