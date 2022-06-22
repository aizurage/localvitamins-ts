import { Image, Text, Title, Container, Space } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Eventdetail(){
  let params = useParams();
  const [element, setEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let { data } = await supabase.from('EventTable').select()
      setEvents(data[params.eventNumber - 1000]);
    }
    getData()
  }, []);

  return (
    <Container>
      <Image src={element.picture} height={700} alt={element.title} />
      <Title order={1}>{element.title}</Title>
      <h2>開催場所</h2>
      <Text size="lg">{element.region}</Text>
      <h2>開催日時</h2>
      <Text size="lg">{element.date}, {element.time}</Text>
      <h2>キャッチコピー</h2>
      <Text size="lg">{element.catchcopy}</Text>
      <h2>ターゲット</h2>
      <Text size="lg">{element.target}</Text>
      <h2>お手伝い内容</h2>
      <Text size="lg">{element.content}</Text>
      <h2>お礼</h2>
      <Text size="lg">{element.reward}</Text>
      <h2>集合場所</h2>
      <Text size="lg">{element.site}</Text>
      
      <h2>お問い合わせ先</h2>
      <Text size="lg">{element.inquiry}</Text>
      <Space h="xl" />
    </Container>
  );
}
