import { Button, Space, Table } from '@mantine/core';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

export function EventMembersList()
{
    let params = useParams();
    const [participants, setParticipants] = useState([]);

    useEffect( () => {
        const getParticipantList = async (eventID) => {
            const { data } = await supabase.from("Participants").select().eq("eventID", eventID);
            setParticipants(data);
        } 
        getParticipantList(params.eventNumber);
    }, []);

    const row = participants.map((member) => (
        <tr key={member.id}>
            <td>{member.eventID}</td>
            <td>{member.eventTitle}</td>
            <td>{member.familyname}</td>
            <td>{member.firstname}</td>
            <td>{member.email}</td>
        </tr>
    ));

    const navigate = useNavigate();

    return(
        <>
            <h1>参加者リスト</h1>
            <Table>
                <thead>
                    <tr>
                        <th>イベントID</th>
                        <th>イベント名</th>
                        <th>性</th>
                        <th>名</th>
                        <th>メールアドレス</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.length === 0 ? "参加者がまだいません。" : row}
                </tbody>
            </Table>
            <Space h="xl" />
            <Button onClick={ () => navigate('/eventlist')}>閉じる</Button>
        </>      
    );
}