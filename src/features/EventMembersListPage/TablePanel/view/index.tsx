import { Table } from "@mantine/core"
import { TableBody } from "../TableBody/view"
import { TableHeader } from "../TableHeader/view"
import { useEffect, useState } from "react"
import { Participant } from "../TableBody/TableBodyItem/state"
import { fetchParticipants } from "../../controller/fetchParticipants"

export const TablePanel = (eventID: number) => {
    const [participants, setParticipants] = useState<Participant[]>([])

    useEffect(() => {
        (async () => {
            try {
                const participants = await fetchParticipants(eventID)
                setParticipants(participants)
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        })()
    }, [eventID])

    return(
        <Table>
            <TableHeader />
            <TableBody participants={participants} />
        </Table>
    )
}