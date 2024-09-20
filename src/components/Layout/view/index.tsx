import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../Header/view";

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
