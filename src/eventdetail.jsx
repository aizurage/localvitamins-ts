import { Image, Text, Title, Container, Space } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Eventdetail(){
  let params = useParams();
  const [event, setEvent] = useState([]);
  const [pictureUrl, setPictureUrl] = useState('');

  useEffect(() => {
    const getData = async () => {
      let { data } = await supabase.from('EventTable').select().eq("id", params.eventNumber)
      setEvent(data[0])
      getImage(data[0].picture)
    }
    getData()
  }, []);

  const getImage = async (imageUrl) => {
    try {
      await supabase.storage.from("event-images").download(imageUrl).then(result => setPictureUrl(URL.createObjectURL(result.data)), error => {throw error});
    } catch (error) {
      console.log('Error downloading image: ', error.message)
      alert(error.error_description || error.message)
    }
  }

  return (
    <Container>
      <Image src={pictureUrl} height={700} alt={event.title} />
      <Title order={1}>{event.title}</Title>
      <h2>開催場所</h2>
      <Text size="lg">{event.region}</Text>
      <h2>開催日時</h2>
      <Text size="lg">{event.date}</Text>
      <ul>
        <li>開示時刻:{event.start_time}</li>
        <li>終了時刻:{event.end_time}</li>
      </ul>
      <h2>参加して欲しい人</h2>
      <Text size="lg">{event.target}</Text>
      <h2>お手伝い内容</h2>
      <Text size="lg">{event.content}</Text>
      <h2>持ち物</h2>
      <Text size="lg">{event.belongings}</Text>
      <h2>服装</h2>
      <Text size="lg">{event.clothes}</Text>
      <h2>お礼</h2>
      <Text size="lg">{event.reward}</Text>
      <h2>集合場所</h2>
      <Text size="lg">{event.site}</Text>
      <h2>お問い合わせ先</h2>
      <Text size="lg">{event.inquiry}</Text>
      <Space h="xl" />
    </Container>
  );
}
