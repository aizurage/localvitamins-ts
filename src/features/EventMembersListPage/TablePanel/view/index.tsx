import { Table } from "@mantine/core"
import { TableBody } from "../TableBody/view"
import { TableHeader } from "../TableHeader/view"
import { FC } from "react"
import { Participant } from "../TableBody/TableBodyItem/state"

export const TablePanel: FC<Participant[]> = (participants: Participant[]) => {
    return(
        <Table>
            <TableHeader />
            <TableBody participants={participants} />
        </Table>
    )
}