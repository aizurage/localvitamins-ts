import { Button } from "@mantine/core"
import { FC } from "react"
import styles from "./index.module.css"

export const SearchButton: FC = () => {
    return(
        <Button className={styles.searchButton} type="submit">
            検索
        </Button>
    )
}