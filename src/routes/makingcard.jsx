import { Card, Image, Text, Button, Group, Spoiler } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Makingcard(props)
{
    const [pictureurl, setPictureUrl] = useState('');

    useEffect(() => {
        getImage(props.row.picture)
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
      <div style={{ width: 340, margin: 'auto', padding: 10, display: "inline-block",}} key={props.row.id}>
        <Card shadow="sm" p="lg">
          <Card.Section>
            <Image src={pictureurl} height={160} alt={props.row.title} />
          </Card.Section>
  
          <Group position="apart" style={{ marginBottom: 5, marginTop: props.theme.spacing.sm }}>
            <Text weight={500}>{props.row.title}</Text>
          </Group>
  
          <Text size="sm" style={{ lineHeight: 1.5 }}>
          日付：{props.row.date}
          </Text>
  
          <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
            {props.row.content}
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
        </Card>
        
      </div>
    );
}