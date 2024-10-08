import { FC } from "react"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

interface Props {
    setActive: (arg: (current: number) => number) => void
}

export const ButtonPanel: FC<Props> = ({ setActive }) => {
  const nextStep = () => setActive(
    current => (current < 3 ? current + 1 : current)
  )
  const prevStep = () => setActive(
    current => (current > 0 ? current - 1 : current)
  )
  return(
    <div className={styles.buttonPanel}>
      <Button className={styles.backButton} onClick={prevStep}>戻る</Button>
      <Button className={styles.nextButton} onClick={nextStep}>次へ</Button>
    </div>
  )
}
