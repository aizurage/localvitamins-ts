import { Input, Card, Image, Text, TextInput, Button, Group, Spoiler, Modal, Center, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { At } from 'tabler-icons-react';
import { supabase } from '../supabaseClient';


function Makingcard(row, theme, open){
  
  const secondaryColor = theme.colorScheme === 'light'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

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

  const form = useForm({
    initialValues: {
      email: '',
      firstname: '',
      familyname: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  
  const submit = async (values) => {
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
    <div>
      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          サインアウト
        </button>
      </div>
      <h2>企画検索</h2>
      <Group position="left">
        <Input
          placeholder="キーワードを入力して検索"
          style={{width: 500}}
        />
        <Button
          style={{width: 100}}
          color="red"
          //onClicked={Search}
          >
          検索</Button>
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
        <form onSubmit={form.onSubmit(submit)}>
          <p>以下の情報を主催者に送信して、参加申請をします。</p>
          <Group>
            <TextInput style={{width:170}} label="姓" required {...form.getInputProps('familyname')}/>
            <TextInput style={{width:170}} label="名" required {...form.getInputProps('firstname')}/>
          </Group>
          <TextInput
            icon={<At />}
            style={{top: 20}}
            label="メールアドレス"
            required
            {...form.getInputProps('email')}
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
    </div>
  );
}
