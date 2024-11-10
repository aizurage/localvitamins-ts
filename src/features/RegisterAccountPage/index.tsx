import { FC } from "react"
import { CenterLayout } from "../../components/Layout/CenterLayout"
import { FormPanel } from "./FormPanel"

export const RegisterAccountPage: FC = () => {
  return (
    <CenterLayout>
      <h1>アカウント登録</h1>
      <FormPanel />
    </CenterLayout>
  )
}
