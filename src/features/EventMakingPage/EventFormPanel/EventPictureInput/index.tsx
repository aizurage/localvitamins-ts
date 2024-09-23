import { FC } from "react"
import styles from "./index.module.css"
import { useAppDispatch } from "../../../../app/hook"
import { setEventPicture } from "../../../../app/slices/eventPictureSlice"

interface Props {
    disabled: boolean
}

export const EventPictureInput: FC<Props> = ({disabled}) => {
    const dispatch = useAppDispatch()
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picture = event.target.files?.[0]
        if (picture) dispatch(setEventPicture(picture))
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