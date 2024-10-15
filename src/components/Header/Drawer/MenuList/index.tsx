import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogoutConfirmationDialog } from "../../LogoutConfirmationDialog"
import { MenuListItem } from "./MenuListItem"

export const MenuList: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <nav>
        <ul>
          <MenuListItem
            onClick={() => {
              navigate("/serviceTerms", {
                state: { isAgreementNecessary: false },
              })
            }}
          >
            利用規約(個人情報の取り扱いについて)
          </MenuListItem>
          <MenuListItem
            onClick={() => {
              setDialogOpen(true)
            }}
          >
            ログアウト
          </MenuListItem>
        </ul>
      </nav>
      <LogoutConfirmationDialog open={dialogOpen} setOpen={setDialogOpen} />
    </>
  )
}
