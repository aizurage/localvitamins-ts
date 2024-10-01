import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mantine/core"
import styles from "./index.module.css"

export const SignUpButton: FC = () => {
  const navigate = useNavigate()

  return(
    <Button
      className={styles.button}
      onClick={() => {
        navigate("/serviceTerms_agree")
      }}
    >
            新規登録
    </Button>
  )
}
