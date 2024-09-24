import { Button } from "@mantine/core"
import { FC } from "react"
import styles from "./index.module.css"

export const EventMakingCompletionPanel: FC = () => {
    return(
        <>
            <h1>入力完了しました！</h1>
            <h3>登録ボタンを押すことで、作成したお手伝いが登録、公開されます。</h3>
            <Button
                className={styles.button}
                type="submit"
            >登録する</Button>
        </>
    )
}