import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

export const LogInButton: FC = () => {
    const navigate = useNavigate()
    
    return(
        <Button
            className={styles.button}
            onClick={() => {
                navigate("/login")
            }}
        >
            ログイン
        </Button>
    )
}