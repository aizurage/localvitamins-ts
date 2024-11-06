import { FC } from "react"
import { CenterLayout } from "../../components/Layout/CenterLayout"
import { FormPanel } from "./FormPanel"

export const LoginPage: FC = () => {
  return (
    <CenterLayout>
      <h1>ログイン</h1>
      <FormPanel />
    </CenterLayout>
  )
}
