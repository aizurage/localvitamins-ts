import {
  Avatar,
  Button,
  Center,
  Group,
  Image,
  Space,
  Text,
  TextInput,
} from '@mantine/core'
import { supabase } from './supabaseClient'
import { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
import { Calendar } from '@mantine/dates'
import { At } from 'tabler-icons-react'
import 'dayjs/locale/ja'
import dayjs from 'dayjs'
import { useParams, useNavigate } from 'react-router-dom'
import './eventedit.css'

export default function Eventedit() {
  const params = useParams()
  const [event, setEvent] = useState([])
  const [eventPictureObjectURL, setEventPictureObjectURL] = useState(null)
  const [recruiterPictureObjectURL, setRecruiterPictureObjectURL] =
    useState(null)
  const [newEventPictureURL, setNewEventPictureURL] = useState(null)
  const [newRecruiterPictureURL, setNewRecruiterPictureURL] = useState(null)
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      id: params.eventNumber,
    },
  })

  useEffect(() => {
    const downloadEventData = async () => {
      const { data } = await supabase
        .from('EventTable')
        .select()
        .eq('id', params.eventNumber)
      setEvent(data[0])
      form.setValues(data[0])
      downloadOldEventImage(data[0].event_picture)
      downloadOldRecruiterImage(data[0].recruiter_picture)
    }
    downloadEventData()
    // eslint-disable-next-line
  }, [params.eventNumber])

  async function downloadOldEventImage(imageUrl) {
    try {
      await supabase.storage
        .from('event-images')
        .download(imageUrl)
        .then(
          (result) =>
            setEventPictureObjectURL(URL.createObjectURL(result.data)),
          (error) => {
            throw error
          },
        )
    } catch (error) {
      console.log('Error downloading image')
      console.log(error.error_description || error.message)
      alert(
        'イベントイメージ写真のダウンロードに失敗しました。運営チーム（eiwachiku.c@gmail.com）にお問い合わせください。',
      )
    }
  }

  const deleteNewEventImage = async () => {
    try {
      console.log('Delete new Event image')
      const { error } = await supabase.storage
        .from('event-images')
        .remove(newEventPictureURL)
      if (error) throw error
    } catch (error) {
      console.log('Error deleting event image')
      console.log(error.error_description || error.message)
      alert(
        'お手伝いイメージ写真の削除に失敗しました。運営チーム（eiwachiku.c@gmail.com）にお問い合わせください。',
      )
    }
  }

  const uploadNewEventImage = async (picture) => {
    try {
      if (!picture.target.files || picture.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const file = picture.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filename = `${Math.random()}.${fileExt}`
      const filepath = `${filename}`
      const { error } = await supabase.storage
        .from('event-images')
        .upload(filepath, file)
      if (error) throw error
      // 古い写真のオブジェクトURLはいらないので削除（明示的なメモリ解放が必要なため）
      URL.revokeObjectURL(eventPictureObjectURL)
      setEventPictureObjectURL(URL.createObjectURL(file))
      setNewEventPictureURL(filepath)
    } catch (error) {
      console.log('Error uploading event image')
      console.log(error.error_description || error.message)
      alert('イベントイメージ写真のアップロードに失敗しました。')
    }
  }

  const downloadOldRecruiterImage = async (imageUrl) => {
    try {
      await supabase.storage
        .from('recruiter-images')
        .download(imageUrl)
        .then(
          (result) =>
            setRecruiterPictureObjectURL(URL.createObjectURL(result.data)),
          (error) => {
            throw error
          },
        )
    } catch (error) {
      console.log('Error downloading image')
      console.log(error.error_description || error.message)
      alert(
        'お手伝い募集者の写真ダウンロードに失敗しました。運営チーム（eiwachiku.c@gmail.com）にお問い合わせください。',
      )
    }
  }

  const deleteNewRecruiterImage = async () => {
    try {
      console.log('Delete new Recruiter image')
      const { error } = await supabase.storage
        .from('recruiter-images')
        .remove(newRecruiterPictureURL)
      if (error) throw error
    } catch (error) {
      console.log('Error deleting recruiter image')
      console.log(error.error_description || error.message)
      alert(
        'お手伝い募集者写真の削除に失敗しました。運営チーム（eiwachiku.c@gmail.com）にお問い合わせください。',
      )
    }
  }

  const uploadNewRecruiterImage = async (picture) => {
    try {
      if (!picture.target.files || picture.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const file = picture.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filename = `${Math.random()}.${fileExt}`
      const filepath = `${filename}`
      const { error } = await supabase.storage
        .from('recruiter-images')
        .upload(filepath, file)
      if (error) throw error
      // 古い写真のオブジェクトURLはいらないので削除（明示的なメモリ解放が必要なため）
      URL.revokeObjectURL(recruiterPictureObjectURL)
      setRecruiterPictureObjectURL(URL.createObjectURL(file))
      setNewRecruiterPictureURL(filepath)
    } catch (error) {
      console.log('Error uploading recruiter image')
      console.log(error.error_description || error.message)
      alert('お手伝い募集者の写真アップロードに失敗しました。')
    }
  }

  const [date, setDate] = useState(event.date)
  const [startHour, setStartHour] = useState('')
  const [startMinute, setStartMinute] = useState('')
  const [endHour, setEndHour] = useState('')
  const [endMinute, setEndMinute] = useState('')

  const submit = async () => {
    try {
      // 開始or終了時刻に変更が合った場合、更新
      if (startHour !== '' && startMinute !== '')
        form.values.start_time = startHour + ':' + startMinute + ':00'
      if (endHour !== '' && endMinute !== '')
        form.values.end_time = endHour + ':' + endMinute + ':00'

      // 写真の更新があった場合、古い写真は消して、新しい写真のURLをテーブルに書き込む
      if (newEventPictureURL !== null) {
        console.log('Old event picture was deleted in submission.')
        const { error: DeleteOldEventPictureError } = await supabase.storage
          .from('event-images')
          .remove(event.event_picture)
        if (DeleteOldEventPictureError) throw DeleteOldEventPictureError
        form.values.event_picture = newEventPictureURL
      }

      if (newRecruiterPictureURL !== null) {
        console.log('Old Recruiter picture was deleted in submission.')
        const { error: DeleteOldRecruiterPictureError } = await supabase.storage
          .from('recruiter-images')
          .remove(event.recruiter_picture)
        if (DeleteOldRecruiterPictureError)
          throw DeleteOldRecruiterPictureError
        form.values.recruiter_picture = newRecruiterPictureURL
      }

      const { error } = await supabase.from('EventTable').upsert(form.values)
      if (error) throw error

      navigate('/home')
    } catch (error) {
      console.log('Error event update')
      console.log(error.error_description || error.message)
      alert(
        'イベントを更新できませんでした。解決できない場合には、お問い合わせ先のメールアドレスにご連絡ください。お手伝い一覧画面のメニューにあります。',
      )
    }
  }

  return (
    <Center>
      <form className="editform" onSubmit={form.onSubmit(submit)}>
        <div className="form_body">
          <h1>お手伝い編集</h1>
          <h3 className="warning" color="red">
            （重要）訂正したい項目だけを入力してください。
          </h3>
          <h2>写真</h2>
          <Image src={eventPictureObjectURL} alt={event.title} />
          <Group>
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadNewEventImage}
            />
            <Button
              color="gray"
              onClick={() => {
                deleteNewEventImage()
                setNewEventPictureURL(null)
                setEventPictureObjectURL(
                  window.URL.revokeObjectURL(eventPictureObjectURL),
                )
                downloadOldEventImage(event.event_picture)
              }}
            >
              キャンセル
            </Button>
          </Group>
          <h2>タイトル</h2>
          <Text weight={700} size="lg">
            {event.title}
          </Text>
          <Group>
            <TextInput
              style={{ width: 500 }}
              placeholder="お手伝いのタイトル（訂正後）"
              {...form.getInputProps('title')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('title', event.title)
              }}
            >
              キャンセル
            </Button>
          </Group>

          <h2>開催場所</h2>
          <Text weight={700} size="lg">
            {event.region}
          </Text>
          <Group>
            <TextInput
              style={{ width: 500 }}
              placeholder="開催場所の住所（訂正後）"
              {...form.getInputProps('region')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('region', event.region)
              }}
            >
              キャンセル
            </Button>
          </Group>

          <h2>開催日時</h2>
          <h3>日付</h3>
          <Text weight={700} size="lg">
            {event.date}
          </Text>
          <Group spacing="xl">
            <Calendar
              value={date}
              onChange={(_date) => {
                setDate(_date)
                form.setFieldValue('date', dayjs(_date))
              }}
              firstDayOfWeek="sunday"
              locale="ja"
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('date', event.date)
              }}
            >
              キャンセル
            </Button>
          </Group>

          <Group>
            <div>
              <h3>開始時刻</h3>
              <Text weight={700} size="lg">
                {event.start_time}
              </Text>
              <p>訂正する場合、半角で「時」と「分」両方入力してください。</p>
              <Group>
                <TextInput
                  value={startHour}
                  placeholder="開始時刻(時)（訂正後）"
                  onChange={(e) => {
                    setStartHour(e.target.value)
                  }}
                />
                <p>時</p>
                <TextInput
                  value={startMinute}
                  placeholder="開始時刻(分)（訂正後）"
                  onChange={(e) => {
                    setStartMinute(e.target.value)
                  }}
                />
                <p>分</p>
                <Button
                  color="gray"
                  onClick={() => {
                    setStartHour('')
                    setStartMinute('')
                  }}
                >
                  キャンセル
                </Button>
              </Group>
            </div>

            <div>
              <h3>終了時刻</h3>
              <Text weight={700} size="lg">
                {event.end_time}
              </Text>
              <p>訂正する場合、半角で「時」と「分」両方入力してください。</p>
              <Group>
                <TextInput
                  value={endHour}
                  placeholder="終了時刻(時)（訂正後）"
                  onChange={(e) => {
                    setEndHour(e.target.value)
                  }}
                />
                <p>時</p>
                <TextInput
                  value={endMinute}
                  placeholder="終了時刻(分)（訂正後）"
                  onChange={(e) => {
                    setEndMinute(e.target.value)
                  }}
                />
                <p>分</p>
                <Button
                  color="gray"
                  onClick={() => {
                    setEndHour('')
                    setEndMinute('')
                  }}
                >
                  キャンセル
                </Button>
              </Group>
            </div>
          </Group>

          <h2>参加して欲しい人</h2>
          <Text weight={700} size="lg">
            {event.target}
          </Text>
          <Group>
            <TextInput
              style={{ width: 500 }}
              placeholder="参加して欲しい人（訂正後）"
              {...form.getInputProps('target')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('target', event.target)
              }}
            >
              キャンセル
            </Button>
          </Group>

          <h2>お手伝い内容</h2>
          <Text weight={700} size="lg">
            {event.content}
          </Text>
          <Group>
            <TextInput
              style={{ width: 500 }}
              placeholder="お手伝いの内容（訂正後）"
              {...form.getInputProps('content')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('content', event.content)
              }}
            >
              キャンセル
            </Button>
          </Group>

          <h2>持ち物</h2>
          <Text weight={700} size="lg">
            {event.belongings}
          </Text>
          <Group>
            <TextInput
              style={{ width: 500 }}
              placeholder="持ち物（訂正後）"
              {...form.getInputProps('belongings')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('belongings', event.belongings)
              }}
            >
              キャンセル
            </Button>
          </Group>

          <h2>服装</h2>
          <Text weight={700} size="lg">
            {event.clothes}
          </Text>
          <Group>
            <TextInput
              style={{ width: 500 }}
              placeholder="服装（訂正後）"
              {...form.getInputProps('clothes')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('clothes', event.clothes)
              }}
            >
              キャンセル
            </Button>
          </Group>

          <h2>お礼</h2>
          <Text weight={700} size="lg">
            {event.reward}
          </Text>
          <Group>
            <TextInput
              style={{ width: 500 }}
              placeholder="お礼（訂正後）"
              {...form.getInputProps('reward')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('reward', event.reward)
              }}
            >
              キャンセル
            </Button>
          </Group>

          <h2>集合場所</h2>
          <Text weight={700} size="lg">
            {event.site}
          </Text>
          <Group>
            <TextInput
              style={{ width: 500 }}
              placeholder="集合場所（訂正後）"
              {...form.getInputProps('site')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('site', event.site)
              }}
            >
              キャンセル
            </Button>
          </Group>

          <h2>お問い合わせ先</h2>
          <Text weight={700} size="lg">
            {event.inquiry}
          </Text>
          <Group>
            <TextInput
              style={{ width: 500 }}
              placeholder="お問い合わせ先（訂正後）"
              icon={<At />}
              {...form.getInputProps('inquiry')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('inquiry', event.inquiry)
              }}
            >
              キャンセル
            </Button>
          </Group>
        </div>

        <div className="recruiter_space">
          <div className="recruiter">
            <h1>お手伝い募集者</h1>
            <Avatar src={recruiterPictureObjectURL} radius="xl" size={200} />
            <Group>
              <input
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadNewRecruiterImage}
              />
              <Button
                color="gray"
                onClick={() => {
                  deleteNewRecruiterImage()
                  setNewRecruiterPictureURL(null)
                  setRecruiterPictureObjectURL(
                    window.URL.revokeObjectURL(recruiterPictureObjectURL),
                  )
                  downloadOldRecruiterImage(event.recruiter_picture)
                }}
              >
                キャンセル
              </Button>
            </Group>
            <h3>募集者の名前</h3>
            <Text weight={700} size="lg">
              {event.recruiter_name}
            </Text>
            <TextInput
              placeholder="募集者の名前（訂正後）"
              {...form.getInputProps('recruiter_name')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue('recruiter_name', event.recruiter_name)
              }}
            >
              キャンセル
            </Button>
            <br />
            <h3>自己紹介文</h3>
            <Text weight={700} size="lg">
              {event.recruiter_introduction}
            </Text>
            <TextInput
              placeholder="募集者の自己紹介文（訂正後）"
              {...form.getInputProps('recruiter_introduction')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue(
                  'recruiter_introduction',
                  event.recruiter_introduction,
                )
              }}
            >
              キャンセル
            </Button>
            <br />
            <h3>一言コメント</h3>
            <Text weight={700} size="lg">
              {event.recruiter_comment}
            </Text>
            <TextInput
              placeholder="募集者の一言コメント（訂正後）"
              {...form.getInputProps('recruiter_comment')}
            />
            <Button
              color="gray"
              onClick={() => {
                form.setFieldValue(
                  'recruiter_comment',
                  event.recruiter_comment,
                )
              }}
            >
              キャンセル
            </Button>
          </div>
        </div>

        <div className="right_side">
          <div className="tracking_option">
            <Space h="xl" />
            <p>編集内容を提出します</p>
            <Button
              className="submit"
              type="submit"
              color="green"
              style={{ height: 50 }}
            >
              提出
            </Button>
            <p>全項目を編集前に戻します。</p>
            <Button
              className="reset"
              color="gray"
              style={{ height: 50 }}
              onClick={() => {
                form.setValues(event)
                form.setFieldValue('date', event.date)
                setStartHour('')
                setStartMinute('')
                setEndHour('')
                setEndMinute('')
              }}
            >
              リセット
            </Button>
          </div>
        </div>
      </form>
    </Center>
  )
}
