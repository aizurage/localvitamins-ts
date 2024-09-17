import { FC, ReactNode, useState } from "react"
import styles from "./index.module.css"

interface Props {
    children: ReactNode
    label: string
    hiddenLabel: string
}

export const Spoiler: FC<Props> = ({
    children,
    label,
    hiddenLabel
}) => {
    const [isVisible, setIsVisible] = useState(false)

    const handleOnClick = () => {
        setIsVisible(!isVisible)
    }

    return(
        <div className={styles.spoilerContainer}>
            <a 
                className={styles.spoilerLink} 
                onClick={handleOnClick}
            >
                {isVisible ? hiddenLabel : label}
            </a>
            {isVisible ?? <div className={styles.spoilerContent}>{children}</div>}
        </div>
    )
}