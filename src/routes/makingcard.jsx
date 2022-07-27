import { Card, Image, Text, Button, Group, Spoiler, Space } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
//import { EventMembersList } from './eventmemberslist';

export function Makingcard(props)
{
    const [pictureurl, setPictureUrl] = useState('');

    const checkMyEvent = () => {
      return (supabase.auth.user().email === props.row.inquiry) ? true : false;
    }

    useEffect(() => {
        getImage(props.row.picture)
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div style={{ width: 340, margin: 'auto', padding: 10, display: "inline-block"}} key={props.row.id}>
        <Card style={{height: 450}} shadow="sm" p="lg">
          <Card.Section>
            <Image src={pictureurl} height={160} alt={props.row.title} />
          </Card.Section>
  
          <Group position="apart" style={{ marginBottom: 5, marginTop: props.theme.spacing.sm }}>
            <Text weight={500}>{props.row.title}</Text>
          </Group>
  
          <Text size="sm" style={{ lineHeight: 1.5 }}>
          日付：{props.row.date}
          </Text>
  
          <Spoiler maxHeight={100} showLabel="もっと表示" hideLabel="部分表示">
            {props.row.catchcopy}
          </Spoiler>

          <Button
            variant="light"
            color="blue"
            fullWidth style={{ marginTop: 14 }}
            component={Link}
            to={`/eventdetail/${props.row.id}`}
            >
            詳細を見る
          </Button>
  
          <Button
            variant="light"
            color="indigo"
            fullWidth style={{ marginTop: 14 }}
            onClick={ () => props.open(props.row.id, props.row.title) }
            >参加する
          </Button>
          <Space h="md" />
          <div>
            {checkMyEvent() ? 
              <Button
                variant="gradient" 
                gradient={{ from: 'orange', to: 'red' }}
                component={Link}
                to={`/eventmemberslist/${props.row.id}`}
              >
                参加者リスト表示
              </Button> : ""
            }
          </div>
        </Card>
      </div>
    );
}