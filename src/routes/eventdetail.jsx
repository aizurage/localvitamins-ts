import { Input, Image, Text, Title, Button, Group, Container, Space, useMantineTheme } from '@mantine/core';
import { getEvent } from '../store/eventdata';
import { Link, useParams, Outlet } from 'react-router-dom';

export default function Eventdetail(){
  let params = useParams();

  const element = getEvent(params.eventNumber);
  return (
    <Container>
      <Image src={element.Picture} height={700} alt={element.Title} />
      <Title order={1}>{element.Title}</Title>
      <h2>開催場所</h2>
      <Text size="lg">{element.Region}</Text>
      <h2>開催日時</h2>
      <Text size="lg">{element.Date}</Text>
      <h2>キャッチコピー</h2>
      <Text size="lg">{element.Catchcopy}</Text>
      <h2>ターゲット</h2>
      <Text size="lg">{element.Target}</Text>
      <h2>お手伝い内容</h2>
      <Text size="lg">{element.Content}</Text>
      <h2>お礼</h2>
      <Text size="lg">{element.Reward}</Text>
      <h2>集合場所</h2>
      <Text size="lg">{element.Site}</Text>
      <Text size="lg">{element.SiteURL}</Text>
      <h2>お問い合わせ先</h2>
      <Text size="lg">{element.Inquiry}</Text>
      <Space h="xl" />
    </Container>
  );
}
