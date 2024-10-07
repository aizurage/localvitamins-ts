import { FC, useEffect, useState } from "react"
import { Table } from "@mantine/core"
import { Participant } from "../../../states/Participant"
import { fetchParticipants } from "../controller/fetchParticipants"
import { TableBody } from "./TableBody"
import { TableHeader } from "./TableHeader"

export const TablePanel: FC<{ eventID: number }> = ({ eventID }) => {
  const [ participants, setParticipants ] = useState<Participant[]>([])

  useEffect(() => {
    (async () => {
      try {
        const participants = await fetchParticipants(eventID)
        setParticipants(participants)
      } catch (error) {
        console.error("Error fetching participants:", error)
      }
    })()
  }, [ eventID ])

  return (
    <Table>
      <TableHeader />
      <TableBody participants={participants} />
    </Table>
  )
}
