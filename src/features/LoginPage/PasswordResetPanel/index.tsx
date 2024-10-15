import { FC } from "react"
import { Link } from "react-router-dom"

export const PasswordResetPanel: FC = () => {
  return (
    <>
      <p>
        パスワードを忘れた方は、下のリンクをクリックして、パスワードの再設定をしてください。
      </p>
      <Link to={"/email_resetpw"}>
        パスワードを忘れた方は、ここをクリック。
      </Link>
    </>
  )
}
