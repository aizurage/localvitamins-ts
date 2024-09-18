import { FC } from 'react'
import { MainPanel } from '../MainPanel'
import { SearchEventPanel } from '../SearchEventPanel'

export const EventListPage: FC = () => {
  return (
    <div>
      <h1>お手伝い一覧</h1>
      <SearchEventPanel />
      <MainPanel />
    </div>
  )
}
