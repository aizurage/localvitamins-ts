import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutConfirmationDialog } from "../../LogoutConfirmationDialog";

export const MenuList: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <ul>
          <li
            onClick={() => {
              navigate("/serviceTerms", {state: {isAgreementNecessary: false}})
            }}
          >
            利用規約(個人情報の取り扱いについて)
          </li>
          <li
            onClick={() => {
              setDialogOpen(true)
            }}
          >
            ログアウト
          </li>
        </ul>
      </nav>
      <LogoutConfirmationDialog open={dialogOpen} setOpen={setDialogOpen} />
    </>
  );
};
