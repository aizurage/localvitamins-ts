import {
  Input,
  Text,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Popover,
  useMantineTheme,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
import { supabase } from './supabaseClient'
import { At } from 'tabler-icons-react'
import { Makingcard } from './makingcard'

import './eventlist.css'

export default function Eventlist() {
  const [events, setEvents] = useState([])
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [popoverOpened, setPopoverOpened] = useState(false)
  const [event, setEvent] = useState('')
  const [isOnlyMyEvent, setIsOnlyMyEvent] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const join_event_form = useForm({
    initialValues: {
      eventID: '',
      eventTitle: '',
      email: '',
      firstname: '',
      familyname: '',
      question: '',
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
      setLoading(true)
      await supabase.from('Participants').insert([
        {
          eventID: event.eventID,
          eventTitle: event.eventTitle,
          firstname: values.firstname,
          familyname: values.familyname,
          email: values.email,
          question: values.question
        },
      ]).then(
        () => {
          alert('参加申請が完了しました。このタブを閉じてください。')
        },
        (error) => {
          throw error
        },
      )
    } catch (error) {
      console.log('Error joining event process')
      console.log(error.error_description || error.message)
      alert(
        '参加申請処理に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
      )
    } finally {
      setLoading(false)
      // フォーム情報が送信し終わったら、モーダルを閉じる。（非同期処理だけど大丈夫かな？）
      setOpened(false)
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
    // const today = new Date()
    if (keywords.length === 0) {
      const { data } = await supabase.from('EventTable').select()// .gt('date', dayjs(today))
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
        // .gt('date', dayjs(today))
      if (i) searching_events = merge_eventarrays(searching_events, data)
      else searching_events = [...searching_events, data].flat(2)
    }

    setEvents(searching_events)
  }

  const downloadMyEventData = async () => {
    // const today = new Date()
    const { data } = await supabase
      .from('EventTable')
      .select()
      .eq('planner_uniqueID', supabase.auth.user().id)
      // .gt('date', dayjs(today))
    if (data == null) return
    setEvents(data)
  }

  const downloadEventData = async () => {
    // const today = new Date()
    const { data } = await supabase
      .from('EventTable')
      .select()
      // .gt('date', dayjs(today))
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
      <LoadingOverlay visible={loading} />
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
            <Button style={{ width: 100 }} className="search_button" type="submit">
              検索
            </Button>
          </Group>
        </form>
        <Popover
          opened={popoverOpened}
          onClose={() => setPopoverOpened(false)}
          target={
            <Button
              style={{ width: 200 }}
              className='make_event'
              onClick={() => {supabase.auth.user() === null ? setPopoverOpened(true) : navigate('/eventmaker')}}
            >
              お手伝い作成
            </Button>
          }
          width={400}
          position="bottom"
          withArrow
        >
          アカウントを登録し、ログインすることで、あなた自身で「お手伝い」を作ることが出来ます。
          お手伝い作成、募集を行いたい場合は、ログイン、または新規登録をお願いします。
        </Popover>
        
        <div>
          {
            supabase.auth.user() === null ? '':
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
      >
        <form onSubmit={join_event_form.onSubmit(join_event)}>
          <h3>{event.eventTitle}</h3>
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
          <h3>備考</h3>
          <label htmlFor="question">備考（質問・特記事項などございましたら、ご記入ください↓）</label>
          <Textarea
            id='question'
            style={{ top: 20 }}
            autosize={true}
            {...join_event_form.getInputProps('question')}
          />
          <Button
            type="submit"
            color="red"
            margin="center"
            style={{ top: 20 }}
          >
            送信
          </Button>
        </form>
      </Modal>
    </>
  )
}
