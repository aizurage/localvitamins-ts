import { FC } from "react"
import { Participant } from "../state"

export const TableBodyItem: FC<Participant> = (participant: Participant) => {
    return(
        <tr key={participant.id}>
            <td>{participant.eventID}</td>
            <td>{participant.eventTitle}</td>
            <td>{participant.familyname}</td>
            <td>{participant.firstname}</td>
            <td>{participant.email}</td>
            <td>{participant.question}</td>
        </tr>
    )
}