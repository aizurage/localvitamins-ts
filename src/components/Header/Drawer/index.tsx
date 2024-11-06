import { FC } from "react"
import { Drawer as _Drawer } from "@mantine/core"
import Contact from "../../Contact"
import { MenuList } from "./MenuList"

interface Props {
  open: boolean
  setOpen: (arg0: boolean) => void
}

export const Drawer: FC<Props> = ({ open, setOpen }) => {
  return (
    <_Drawer
      opened={open}
      onClose={() => setOpen(false)}
    >
      <h1>メニュー</h1>
      <MenuList />
      <hr />
      <Contact />
    </_Drawer>
  )
}
