import { EventCreationButton } from "./EventCreationButton"
import { FilteringOwnersEventButton } from "./FilteringOwnersEventButton"
import { SearchBar } from "./SearchBar"
import { UnfilteringEventButton } from "./UnfilteringEventButton"
import styles from "./index.module.css"

export const SearchEventPanel = () => {
  return(
    <div className={styles.SearchEventPanel}>
      <SearchBar />
      <FilteringOwnersEventButton />
      <UnfilteringEventButton />
      <EventCreationButton />
    </div>
  )
}
