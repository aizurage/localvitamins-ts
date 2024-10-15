import { FC } from "react"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

interface Props {
  onChange: () => void
  onClick: () => void
}

export const EditPicturePanel: FC<Props> = ({ onChange, onClick }) => {
  return (
    <div className={styles.field}>
      <input type="file" accept="image/*" onChange={onChange} />
      <Button className={styles.cancelButton} onClick={onClick}>
        キャンセル
      </Button>
    </div>
  )
}
