import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Spoiler,
  Space,
  Modal,
} from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './makingcard.css'

export function Makingcard(props) {
  const [eventPictureObjectURL, setEventPictureObjectURL] = useState('')
  const [opened, setOpened] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    downloadEventImage(props.row.event_picture)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const downloadEventImage = async (imageUrl) => {
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
      // 写真が用意できないケースが考えられるため、一覧を表示するたびに「ダウンロードに失敗した」と表示するのはしつこい。
      // ストレスになる懸念があるので、アラートはなし。
      // alert(
      //  '写真のダウンロードに失敗した、もしくは写真がないお手伝いがありました。アプリの動作に影響は無いので、タブを閉じてください。',
      // )
    }
  }

  async function deleteEventParticipants() {
    try {
      const { data, error } = await supabase
        .from('Participants')
        .delete()
        .eq('eventID', props.row.id)
      // イベント参加者がいて、かつその参加者データを削除できなかった場合、エラーを投げる
      if (data.length > 0 && error) throw error
    } catch (error) {
      console.log('Event participants deletion failed')
      console.log(error.error_description || error.message)
      alert(
        'イベント参加者のデータ消去に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
      )
    }
  }

  const deleteEventImage = async () => {
    try {
      const { error } = await supabase.storage
        .from('event-images')
        .remove(props.row.event_picture)
      if (error) throw error
    } catch (error) {
      console.log('Event image picture deletion failed')
      console.log(error.error_description || error.message)
      alert(
        'イベント写真のデータ消去に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
      )
    }
  }

  const deleteRecruiterImage = async () => {
    try {
      const { error } = await supabase.storage
        .from('recruiter-images')
        .remove(props.row.recruiter_picture)
      if (error) throw error
    } catch (error) {
      console.log('Event recruiter picture deletion failed')
      console.log(error.error_description || error.message)
      alert(
        'イベント募集者写真のデータ消去に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
      )
    }
  }

  const deleteEvent = async () => {
    try {
      deleteEventImage()
      deleteRecruiterImage()
      deleteEventParticipants()
      const { error } = await supabase
        .from('EventTable')
        .delete()
        .match({ uniqueID: props.row.uniqueID })
      if (error) throw error
      const { data } = await supabase.from('EventTable').select()
      props.setEvents(data)
      navigate('/')
    } catch (error) {
      console.log('Event deletion failed')
      console.log(error.error_description || error.message)
      alert(
        'イベントのデータ消去に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
      )
    }
  }

  const ownerOption = () => {
    return (
      <div className="ownerOption">
        <Button
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
          component={Link}
          to={`/eventmemberslist/${props.row.id}`}
        >
          参加者リスト表示
        </Button>{' '}
        <Button
          color="dark"
          radius={'xl'}
          className="deleteevent"
          onClick={() => setOpened(true)}
        >
          消去
        </Button>
        <Button
          radius={'xl'}
          className="eventedit"
          component={Link}
          to={`/eventedit/${props.row.id}`}
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
                <Button
                  color="red"
                  onClick={() => {
                    deleteEvent()
                    setOpened(false)
                  }}
                >
                  消去する
                </Button>
                <Button color="teal" onClick={() => setOpened(false)}>
                  キャンセル
                </Button>
              </Group>
            </>
          }
        </Modal>
      </div>
    )
  }

  return (
    <div
      className="card"
      style={{
        width: 340,
        margin: 'auto',
        padding: 10,
        display: 'inline-block',
      }}
      key={props.row.id}
    >
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image
            src={eventPictureObjectURL}
            height={160}
            alt={props.row.title}
          />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: props.theme.spacing.sm }}
        >
          <Text weight={500}>{props.row.title}</Text>
        </Group>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          日付：{props.row.date}
        </Text>

        <Spoiler maxHeight={50} showLabel="もっと表示" hideLabel="部分表示">
          {props.row.content}
        </Spoiler>

        {/* Spoilerでお手伝い内容部分を全表示しても、文章がボタンとかぶらないように、
        ボタンがすべて入る空白を、Spoilerの下にあえて作る */}
        <div style={{height:160}}></div>

        <div className="buttons">
          <Button
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
            component={Link}
            to={`/eventdetail/${props.row.id}`}
          >
            詳細を見る
          </Button>

          <Button
            variant="light"
            color="indigo"
            fullWidth
            style={{ marginTop: 14 }}
            onClick={() => props.open(props.row.id, props.row.title)}
          >
            参加する
          </Button>
          <Space h="md" />
          <div>
            {supabase.auth.user() === null ? (
              ''
            ) : (
              <div className="ownerOption">
                {supabase.auth.user().id === props.row.planner_uniqueID
                  ? ownerOption()
                  : ''}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
