import { FC } from "react"
import { useAppDispatch } from "../../../../app/hook"
import { setEventRecruiterPicture } from "../../../../app/slices/eventRecruiterPictureSlice"
import styles from "./index.module.css"

interface Props {
    disabled: boolean
}

export const EventRecruiterPictureInput: FC<Props> = ({ disabled }) => {
  const dispatch = useAppDispatch()
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const picture = event.target.files?.[0]
    if (picture) dispatch(setEventRecruiterPicture(picture))
  }

  return(
    <>
      <h4>お手伝いイメージ画像の選択</h4>
      <input
        className={styles.imageInput}
        type="file"
        accept="image/*"
        onChange={onChange}
        disabled={disabled}
      />
    </>
  )
}
