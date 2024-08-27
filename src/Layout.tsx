import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";

export const Layout: FC = () => {
    return(
        <>
            <Header />
            <Outlet />
        </>
    )
}