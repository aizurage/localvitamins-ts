import { Image, Text, Title, Container, Space } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Eventdetail(){
  let params = useParams();
  const [element, setEvent] = useState([]);
  const [pictureUrl, setPictureUrl] = useState('');

  useEffect(() => {
    const getData = async () => {
      let { data } = await supabase.from('EventTable').select().eq("id", params.eventNumber);
      setEvent(data[0]);
    }
    getData()
  }, []);

  const getImage = async (imageUrl) => {
    try {
      const { data, error } = await supabase.storage.from("event-images").download(imageUrl);
      if(error) throw error;
      setPictureUrl(URL.createObjectURL(data));
    } catch (error) {
      console.log('Error downloading image: ', error.message)
      alert(error.error_description || error.message)
    }
  }

  return (
    <Container>
      <Image src={pictureUrl} onChanged={getImage(element.picture)} height={700} alt={element.title} />
      <Title order={1}>{element.title}</Title>
      <h2>開催場所</h2>
      <Text size="lg">{element.region}</Text>
      <h2>開催日時</h2>
      <Text size="lg">{element.date}, {element.time}</Text>
      <h2>キャッチコピー</h2>
      <Text size="lg">{element.catchcopy}</Text>
      <h2>参加して欲しい人</h2>
      <Text size="lg">{element.target}</Text>
      <h2>お手伝い内容</h2>
      <Text size="lg">{element.content}</Text>
      <h2>持ち物</h2>
      <Text size="lg">{element.belongings}</Text>
      <h2>服装</h2>
      <Text size="lg">{element.clothes}</Text>
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
