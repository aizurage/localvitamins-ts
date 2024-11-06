import { FC } from "react"
import { Link } from "react-router-dom"

export const PasswordResetPanel: FC = () => {
  return (
    <>
      <div>
        パスワードを忘れた方は、下のリンクをクリックして、パスワードの再設定をしてください。
      </div>
      <Link to={"/email_resetpw"}>
        パスワードを忘れた方は、ここをクリック。
      </Link>
    </>
  )
}
