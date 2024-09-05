import { FC } from "react"
import { Participant } from "../TableBodyItem/state"
import { TableBodyItem } from "../TableBodyItem/view"

export const TableBody: FC<{participants: Participant[]}> = ({ participants }) => {
    return(
        <tbody>
            {
                participants.length === 0 ? 
                '参加者がまだいません。' : 
                participants.map( 
                    participant => <TableBodyItem participant={participant}/>
                )
            }
        </tbody>
    )
}