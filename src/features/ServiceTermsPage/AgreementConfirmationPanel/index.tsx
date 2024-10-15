import { FC } from "react"
import { Link } from "react-router-dom"
import { Button } from "@mantine/core"

export const AgreementConfirmationPanel: FC = () => {
  return (
    <>
      <p>
        以上の個人情報の使用条件について同意いただける場合は、「同意する」ボタンを押してください。アカウント登録画面が表示されます。
      </p>
      <Button color="red" component={Link} to="/register">
        同意する
      </Button>
    </>
  )
}
