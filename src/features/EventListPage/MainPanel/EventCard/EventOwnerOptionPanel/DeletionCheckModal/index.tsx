import { FC } from "react"
import { Modal, Button } from "@mantine/core"
import { deleteEvent } from "../../controller/deleteEvent"
import styles from "./index.module.css"

interface Props {
  opened: boolean
  setOpened: (arg0: boolean) => void
  eventId: number
}

export const DeletionCheckModal: FC<Props> = ({
  opened,
  setOpened,
  eventId
}) => {
  const handleClickEventDeletionButton = async () => {
    await deleteEvent(eventId)
      .then(() => {
        alert("お手伝いの削除に成功しました")
      }).catch(() => {
        alert(
          `
            イベントのデータ消去に失敗しました。
            お手伝い一覧画面のメニュー内にある、
            お問い合わせフォームにてご連絡ください。
          `
        )
      })
  }

  return(
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="イベントを消去します。"
    >
      {/* TODO: 削除対象のお手伝い情報を表示させること↓ */}
      <p>お手伝いを消去します。よろしいですか？</p>
      <div className={styles.buttons}>
        <Button
          className={styles.executionButton}
          onClick={() => {
            handleClickEventDeletionButton()
            setOpened(false)
          }}
        >
                  消去する
        </Button>
        <Button
          className={styles.cancelButton}
          onClick={() => setOpened(false)}
        >
                  キャンセル
        </Button>
      </div>
    </Modal>
  )
}
