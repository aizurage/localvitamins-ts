import { FC } from "react";
import styles from "./index.module.css"

interface EventImagePanelProps {
    objectUrl: string
    alt: string
}

export const EventImagePanel: FC<EventImagePanelProps> = ({objectUrl, alt}) => {
    return(
        <img
            src={objectUrl}
            alt={alt}
            className={styles.image}
        />
    )
}