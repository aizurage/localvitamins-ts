import { EventCard } from "../../components/EventCard/view"
import styles from "./index.module.css"

export const MainPanel = () => {
    return(
        <div className={styles.eventCards}>
            <nav className={styles.navStyle}>
                {events.map((row) => (
                    <EventCard
                        row={row}
                        theme={theme}
                        open={open}
                        key={row.id}
                        setEvents={setEvents}
                    />
                ))}
            </nav>
        </div>
    )
}