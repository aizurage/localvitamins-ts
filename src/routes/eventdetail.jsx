import { Input, Image, Text, Title, Button, Group, Container, Space, useMantineTheme } from '@mantine/core';
import { getEvent } from '../store/eventdata';
import { Link, useParams, Outlet } from 'react-router-dom';

export default function Eventdetail(){
  let params = useParams();

  const element = getEvent(params.eventNumber);
  return (
    <Container>
      <Image src={element.picture} height={700} alt={element.title} />
      <Title order={1}>{element.title}</Title>
      <h2>開催場所</h2>
      <Text size="lg">{element.region}</Text>
      <h2>開催日時</h2>
      <Text size="lg">{element.date}</Text>
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
      <Text size="lg">{element.siteURL}</Text>
      <h2>お問い合わせ先</h2>
      <Text size="lg">{element.inquiry}</Text>
      <Space h="xl" />
    </Container>
  );
}
