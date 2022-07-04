import { Input, Card, Image, Text, TextInput, Button, Group, Spoiler, Modal, Center, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { At } from 'tabler-icons-react';
import { supabase } from '../supabaseClient';


function Makingcard(row, theme, open){

  return (
    <div style={{ width: 340, margin: 'auto', padding: 10, display: "inline-block",}} key={row.id}>
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
          to={`/eventdetail/${row.id}`}
          >
          詳細を見る
        </Button>

        <Button
          variant="light"
          color="indigo"
          fullWidth style={{ marginTop: 14 }}
          onClick={ () => open(row.id, row.title) }
          >参加する
        </Button>
      </Card>
    </div>
  );
}

export default function Eventlist()
{
  const [events, setEvents] = useState([]);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [event, setEvent] = useState('');
  

  const join_event_form = useForm({
    initialValues: {
      email: '',
      firstname: '',
      familyname: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const search_keywords_form = useForm({
    initialValues: {
      keywords: '',
    }
  });

  
  const join_event = async (values) => {
    try {
      const { error } = await supabase.from("Participants").insert([{
        eventID: event.eventID,
        eventTitle: event.eventTitle,
        firstname: values.firstname,
        familyname: values.familyname,
        email: values.email,
      }])
      if (error) {
        alert('Information cannot be registered!')
        throw error
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } 
  }

  //const deleteDuplicateEvent = ([...array]) => {
    //return array.filter( (value, index, self) => self.indexOf(value.id) === index);
  //}

  
  const search_event = async ({keywords}) => {
    if(keywords.length == 0) {
      let { data } = await supabase.from('EventTable').select()
      console.log(data);
      setEvents(data);
      return;
    }
    
    //キーワードを配列に格納する。（主に複数の場合）
    //全角スペースで区切った場合
    keywords = keywords.split('　');
    //半角スペースで区切った場合
    if(keywords.length === 1) keywords.split(' ');
    
    for(let i = 0; i < keywords.length; i++) {
      keywords[i] = '%' + keywords[i] + '%';
    } 

    let searching_events = [];
    for (let i = 0; i < keywords.length; i++) {
      const { data } = await supabase.from("EventTable").select().like("title", keywords[i])
      console.log(data);
      searching_events = [...searching_events, data];
    }

    //console.log(deleteDuplicateEvent(searching_events.flat(2)));
    setEvents(searching_events.flat(2));
  }

  useEffect(() => {
    const getData = async () => {
      let { data, error } = await supabase.from('EventTable').select()
      setEvents(data);
    }
    getData()
  }, []);

  const open = (eventID, eventTitle) => {
    setOpened(true)
    setEvent({eventID, eventTitle})
  }

  return(
    <>
      <h2>企画タイトル検索</h2>
      <Text>キーワードは最大３つまで入力できます。</Text>
      <Text>複数のキーワードで検索をかけるときは、スペースで区切ってください。</Text>
        <Group position="left">
          <form onSubmit={search_keywords_form.onSubmit(search_event)}>
            <Group position="left">
              <Input
                placeholder="キーワードを入力して検索"
                style={{width: 500}}
                {...search_keywords_form.getInputProps('keywords')}
              />
              <Button
                style={{width: 100}}
                color="red"
                type="submit" 
              >
                検索</Button>
            </Group>
          </form>
          <Button
            style={{width: 200}}
            color="pink"
            component={Link}
            to={`/eventmaker`}
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
          {events.map((row) => (Makingcard(row, theme, open)))}
        </nav>
      </div>
      <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={event.eventTitle}
          >
        <form onSubmit={join_event_form.onSubmit(join_event)}>
          <p>以下の情報を主催者に送信して、参加申請をします。</p>
          <Group>
            <TextInput style={{width:170}} label="姓" required {...join_event_form.getInputProps('familyname')}/>
            <TextInput style={{width:170}} label="名" required {...join_event_form.getInputProps('firstname')}/>
          </Group>
          <TextInput
            icon={<At />}
            style={{top: 20}}
            label="メールアドレス"
            required
            {...join_event_form.getInputProps('email')}
          />
          <Center>
            <Button
              type="submit"
              color="red"
              style={{top:20}}
              onClick={() => {console.log(event.eventTitle); setOpened(false)}}
            >送信
            </Button>
          </Center>
        </form>
      </Modal>
    </>
  );
}
