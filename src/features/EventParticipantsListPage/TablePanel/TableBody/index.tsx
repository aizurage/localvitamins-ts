import { FC } from "react"
import { Participant } from "../../../../states/Participant"
import { TableBodyItem } from "./TableBodyItem"

export const TableBody: FC<{ participants: Participant[] }> = ({
  participants,
}) => {
  return (
    <tbody>
      {participants.length === 0
        ? "参加者がまだいません。"
        : participants.map((participant) => (
            <TableBodyItem participant={participant} />
          ))}
    </tbody>
  )
}
