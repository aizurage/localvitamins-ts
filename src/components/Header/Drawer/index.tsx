import { Drawer as _Drawer } from "@mantine/core";
import { FC } from "react";
import Contact from "../../Contact";
import { Back2HomeButton } from "./Back2HomeButton";
import { MenuList } from "./MenuList";

interface Props {
    open: boolean;
    setOpen: (arg0: boolean) => void;
}

export const Drawer: FC<Props> = ({ open, setOpen }) => {
    return (
        <_Drawer opened={open} onClose={() => setOpen(false)} padding="xl" size="xl">
            <h1>メニュー</h1>
            <Back2HomeButton setOpen={setOpen} />
            <MenuList />
            <hr />
            <Contact />
        </_Drawer>
    );
};
