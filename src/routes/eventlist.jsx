import { Input, Card, Image, Text, TextInput, Button, Group, Spoiler, Modal, Center, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
//import Eventdetail from './eventdetail';
import { useState, useEffect } from 'react';
import { At } from 'tabler-icons-react';
import { supabase } from '../supabaseClient';


function Makingcard(row){
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const secondaryColor = theme.colorScheme === 'light'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

    console.log(row);

  return (
    <div style={{ width: 340, margin: 'auto', padding: 10, display: "inline-block",}} key={row.page_id}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={row.picture} height={160} alt={row.title} />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{row.title}</Text>
        </Group>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
        日付：{row.date}
        </Text>

        <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
          {row.content}
        </Spoiler>

        <Button
          variant="light"
          color="blue"
          fullWidth style={{ marginTop: 14 }}
          component={Link}
          to={`/eventdetail/${row.page_id}`}
          >
          詳細を見る
        </Button>

        <Button
          variant="light"
          color="indigo"
          fullWidth style={{ marginTop: 14 }}
          onClick={ () => { setOpened(true) } }
          >参加する
        </Button>

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={row.title}
        >
            <p>以下の情報を主催者に送信して、参加申請をします。</p>
            <Group>
              <TextInput style={{width:170}} label="姓" required/>
              <TextInput style={{width:170}} label="名" required/>
            </Group>
            <TextInput
              icon={<At />}
              style={{top: 20}}
              label="メールアドレス"
              required
            />
            <Center>
              <Button
                type="submit"
                color="red"
                style={{top:20}}
                onClick={() => setOpened(false)}
              >送信
              </Button>
            </Center>
        </Modal>

      </Card>
    </div>
  );
}

export default function Eventlist()
{
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let { data, error } = await supabase.from('EventTable').select()
        setEvents(data)
        if(error) throw error
      } catch (error) {
        alert(error.error_description || error.message)
      }    
    }
    getData()
  });

  return(
    <div>
      <h2>企画検索</h2>
      <Group position="left">
        <Input
          placeholder="キーワードを入力して検索"
          style={{width: 500}}
        />
        <Button
          style={{width: 200}}
          component="a"
          color="pink"
          href="https://forms.gle/7CRJ6ANF9UX53AiL6"
        >
        お手伝い作成</Button>
      </Group>

      <div>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          {events.map((row) => (Makingcard(row)))}
        </nav>
      </div>
    </div>
  );
}
