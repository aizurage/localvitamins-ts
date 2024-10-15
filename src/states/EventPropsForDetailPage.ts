import { Dayjs } from "dayjs"

/**
 * イベント一覧ページ用のイベント型。\
 * イベントの型にはたくさんのプロパティがあるため、過剰なプロパティ渡しを防ぐ
 */
export interface EventPropsForDetailPage {
  title: string
  eventID: number
  content: string
  date: Dayjs
  event_picture: string
  planner_uniqueID: string
}
