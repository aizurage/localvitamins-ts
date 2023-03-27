import {
  Input,
  Text,
  Button,
  Group,
  Modal,
  useMantineTheme,
  TextInput,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
import { supabase } from './supabaseClient'
import { At } from 'tabler-icons-react'
import { Makingcard } from './makingcard'

export default function Eventlist() {
  const [events, setEvents] = useState([])
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [event, setEvent] = useState('')
  const [isOnlyMyEvent, setIsOnlyMyEvent] = useState(false)

  const join_event_form = useForm({
    initialValues: {
      eventID: '',
      eventTitle: '',
      email: '',
      firstname: '',
      familyname: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const search_keywords_form = useForm({
    initialValues: {
      keywords: '',
    },
  }) 

  const join_event = async (values) => {
    try {
      const { error } = await supabase.from('Participants').insert([
        {
          eventID: event.eventID,
          eventTitle: event.eventTitle,
          firstname: values.firstname,
          familyname: values.familyname,
          email: values.email,
        },
      ])
      if (error) throw error
    } catch (error) {
      console.log('Error joining event process')
      console.log(error.error_description || error.message)
      alert(
        '参加申請処理に失敗しました。運営チーム（eiwachiku.c@gmail.com）にお問い合わせください。',
      )
    }
  }

  const merge_eventarrays = (array1, array2) => {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i].id === array2[j].id) {
          array2.splice(j, 1)
        }
      }
    }
    return [...array1, array2].flat(2)
  }

  const search_event = async ({ keywords }) => {
    if (keywords.length === 0) {
      const { data } = await supabase.from('EventTable').select()
      setEvents(data)
      return
    }

    // キーワードを配列に格納する。（主に複数の場合）
    // 全角スペースで区切った場合
    keywords = keywords.split('　')

    let searching_events = []
    for (let i = 0; i < keywords.length; i++) {
      keywords[i] = '%' + keywords[i] + '%'
      const { data } = await supabase
        .from('EventTable')
        .select()
        .like('search_tags', keywords[i])
      if (i) searching_events = merge_eventarrays(searching_events, data)
      else searching_events = [...searching_events, data].flat(2)
    }

    setEvents(searching_events)
  }

  const downloadMyEventData = async () => {
    const { data } = await supabase
      .from('EventTable')
      .select()
      .eq('planner_uniqueID', supabase.auth.user().id)
    if (data == null) return
    setEvents(data)
  }

  const downloadEventData = async () => {
    const { data } = await supabase.from('EventTable').select()
    setEvents(data)
  }

  useEffect(() => {
    downloadEventData()
  }, [])

  const open = (eventID, eventTitle) => {
    setOpened(true)
    setEvent({ eventID, eventTitle })
  }

  return (
    <>
      <h1>お手伝い一覧</h1>
      <Text>キーワードは最大３つまで入力できます。</Text>
      <Text>
        複数のキーワードで検索をかけるときは、全角スペースで区切ってください。
      </Text>
      <Group position="left">
        <form onSubmit={search_keywords_form.onSubmit(search_event)}>
          <Group position="left">
            <Input
              placeholder="キーワードを入力してお手伝いを検索"
              style={{ width: 500 }}
              {...search_keywords_form.getInputProps('keywords')}
            />
            <Button style={{ width: 100 }} color="red" type="submit">
              検索
            </Button>
          </Group>
        </form>
        <Button
          style={{ width: 200 }}
          color="pink"
          component={Link}
          to={`/home/eventmaker`}
        >
          お手伝い作成
        </Button>
        <div>
          {!isOnlyMyEvent ? 
            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              onClick={() => {downloadMyEventData(); setIsOnlyMyEvent(true)}}
            >
              自分のイベントを表示
            </Button> 
            :
            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              onClick={() => {downloadEventData(); setIsOnlyMyEvent(false)}}
            >
              全イベントを表示
            </Button> 
          }
        </div>
        
      </Group>
      <div>
        <nav
          style={{
            borderRight: 'solid 1px',
            padding: '1rem',
          }}
        >
          {events.map((row) => (
            <Makingcard
              row={row}
              theme={theme}
              open={open}
              key={row.id}
              setEvents={setEvents}
            />
          ))}
        </nav>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={event.eventTitle}
      >
        <form onSubmit={join_event_form.onSubmit(join_event)}>
          <p>以下の情報を主催者に送信して、参加申請をします。</p>
          <h3>名前</h3>
          <Group>
            <TextInput
              style={{ width: 170 }}
              label="姓"
              required
              {...join_event_form.getInputProps('familyname')}
            />
            <TextInput
              style={{ width: 170 }}
              label="名"
              required
              {...join_event_form.getInputProps('firstname')}
            />
          </Group>
          <h3>メールアドレス</h3>
          <TextInput
            icon={<At />}
            style={{ top: 20 }}
            label="メールアドレス"
            required
            {...join_event_form.getInputProps('email')}
          />
          <Button
            type="submit"
            color="red"
            margin="center"
            style={{ top: 20 }}
            onClick={() => {
              setOpened(false)
            }}
          >
            送信
          </Button>
        </form>
      </Modal>
    </>
  )
}