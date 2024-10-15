import { FC } from "react"
import { EventCreationButton } from "./EventCreationButton"
import { Popover } from "./Popover"

export const EventCreationButtonPanel: FC = () => {
  return (
    <Popover
      content={
        <p>
          アカウントを登録し、ログインすることで、あなた自身で「お手伝い」を作ることが出来ます。
          お手伝い作成、募集を行いたい場合は、ログイン、または新規登録をお願いします。
        </p>
      }
    >
      <EventCreationButton />
    </Popover>
  )
}
