import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hook"
import { setEventList } from "../../../app/slices/eventListSlice"
import { downloadEventData } from "../controller/downloadEventData"
import { downloadUserEventData } from "../controller/downloadUserEventData"
import { EventCreationButtonPanel } from "./EventCreationButtonPanel"
import { FilteringOwnersEventButton } from "./FilteringOwnersEventButton"
import { SearchBar } from "./SearchBar"
import { UnfilteringEventButton } from "./UnfilteringEventButton"
import styles from "./index.module.css"

export const SearchEventPanel = () => {
  const dispatch = useAppDispatch()
  const [isEventFilterd, setIsEventFilterd] = useState(false)
  const user = useAppSelector((state) => state.user.user)
  return (
    <div className={styles.SearchEventPanel}>
      <SearchBar />
      <div>
        {isEventFilterd ? (
          <UnfilteringEventButton
            onClick={() => {
              setIsEventFilterd(false)
              dispatch(setEventList(downloadEventData()))
            }}
          />
        ) : (
          <FilteringOwnersEventButton
            onClick={() => {
              setIsEventFilterd(true)
              dispatch(setEventList(downloadUserEventData(user.id)))
            }}
          />
        )}
      </div>
      <EventCreationButtonPanel />
    </div>
  )
}
