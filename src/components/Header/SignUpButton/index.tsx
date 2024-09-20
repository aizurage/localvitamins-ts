import { Button } from "@mantine/core";
import { FC } from "react";
import styles from "./index.module.css"
import { useNavigate } from "react-router-dom";

export const SignUpButton: FC = () => {
    const navigate = useNavigate()
    
    return(
        <Button
            className={styles.button}
            onClick={() => {
                navigate("/serviceTerms_agree");
            }}
        >
            新規登録
        </Button>
    )
}