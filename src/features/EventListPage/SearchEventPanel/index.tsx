import { useState } from "react"
import { useAppSelector } from "../../../app/hook"
import { downloadEventData } from "../controller/downloadEventData"
import { downloadUserEventData } from "../controller/downloadUserEventData"
import { EventCreationButtonPanel } from "./EventCreationButtonPanel"
import { FilteringOwnersEventButton } from "./FilteringOwnersEventButton"
import { SearchBar } from "./SearchBar"
import { UnfilteringEventButton } from "./UnfilteringEventButton"
import styles from "./index.module.css"

export const SearchEventPanel = () => {
  const [ isEventFilterd, setIsEventFilterd ] = useState(false)
  const user = useAppSelector(state => state.user.user)
  return(
    <div className={styles.SearchEventPanel}>
      <SearchBar />
      <div>
        {
          isEventFilterd ?
            <UnfilteringEventButton
              onClick={() => {
                setIsEventFilterd(false)
                downloadUserEventData(user.id)
              }}/> :
            <FilteringOwnersEventButton
              onClick={() => {
                setIsEventFilterd(true)
                downloadEventData()
              }}
            />
        }
      </div>

      <EventCreationButtonPanel />
    </div>
  )
}
