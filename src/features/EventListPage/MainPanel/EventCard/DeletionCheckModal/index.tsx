import { Modal, Group, Button } from "@mantine/core"

export const DeletionCheckModal = () => {
  return(
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="イベントを消去します。"
    >
      {
        <>
          <p>{props.row.title}を消去します。よろしいですか？</p>
          <Group>
            <Button
              color="red"
              onClick={() => {
                deleteEvent()
                setOpened(false)
              }}
            >
                  消去する
            </Button>
            <Button color="teal" onClick={() => setOpened(false)}>
                  キャンセル
            </Button>
          </Group>
        </>
      }
    </Modal>
  )
}
