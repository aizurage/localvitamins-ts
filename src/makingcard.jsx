import { Card, Image, Text, Button, Group, Spoiler, Space, Modal } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import "./makingcard.css";

export function Makingcard(props)
{
    const [pictureurl, setPictureUrl] = useState('');
    const [opened, setOpened] = useState('');
    const navigate = useNavigate();

    const checkMyEvent = () => {
      return (supabase.auth.user().id === props.row.planner_uniqueID) ? true : false;
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

    const event_participants_delete = async() => {
      try {
        const { error } = await supabase.from("Participants").delete().match({eventID: props.row.eventID});
        if (error) throw error;
      } catch (error) {
        console.log('Error downloading image: ', error.message)
        alert(error.error_description || error.message)
      }
    }

    const event_delete = async() => {
      try {
        const { error } = await supabase.from("EventTable").delete().match({uniqueID: props.row.uniqueID});
        if (error) throw error;
        const {data} = await supabase.from('EventTable').select()
        props.setEvents(data);
        navigate('/home');
      } catch (error) {
        console.log('Error downloading image: ', error.message)
        alert(error.error_description || error.message)
      }
    }

    const ownerOption = () => {
      return(
        <div className='ownerOption'>
          <Button
            variant="gradient" 
            gradient={{ from: 'orange', to: 'red' }}
            component={Link}
            to={`/home/eventmemberslist/${props.row.id}`}
          >
            参加者リスト表示
          </Button> 
          {" "}
          <Button
            color="dark"
            radius={'xl'}
            className='deleteevent'
            onClick={() => setOpened(true)}
          >
            消去
          </Button>
          <Button
            color="pink"
            radius={'xl'}
            className='eventedit'
            component={Link}
            to={`/home/eventedit/${props.row.id}`}
          >
            編集
          </Button>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="イベントを消去します。"
          >
            {
              <>
                <p>{props.row.title}を消去します。よろしいですか？</p>
                <Group>
                  <Button color='red' onClick={() => {event_delete(); event_participants_delete(); setOpened(false)}}>消去する</Button>
                  <Button color='teal' onClick={() => setOpened(false)}>キャンセル</Button>
                </Group>
              </>
            }
          </Modal>
        </div>
      );
    }
  
    return (
      <div className="card" style={{ width: 340, margin: 'auto', padding: 10, display: "inline-block"}} key={props.row.id}>
        <Card style={{height: 500}} shadow="sm" p="lg">
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
            {props.row.content}
          </Spoiler>

          <div className='buttons'>
            <Button
              variant="light"
              color="blue"
              fullWidth 
              style={{ marginTop: 14 }}
              component={Link}
              to={`/home/eventdetail/${props.row.id}`}
              >
              詳細を見る
            </Button>
    
            <Button
              variant="light"
              color="indigo"
              fullWidth 
              style={{ marginTop: 14 }}
              onClick={ () => props.open(props.row.id, props.row.title) }
              >参加する
            </Button>
            <Space h="md" />
            <div className='ownerOption'>
              {checkMyEvent() ? ownerOption() : ""}
            </div>
          </div>
        </Card>
      </div>
    );
}