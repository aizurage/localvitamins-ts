import { FC } from "react"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

export const EventEditionCompletionPanel: FC = () => {
  return (
    <>
      <h1>入力完了しました！</h1>
      <h3>登録ボタンを押すことで、編集結果が反映されます。</h3>
      <Button className={styles.button} type="submit">
        登録する
      </Button>
    </>
  )
}
