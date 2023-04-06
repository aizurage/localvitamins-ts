import { Avatar, Image, Text, Title, Container } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

import './eventdetail.css'

export default function Eventdetail(){
  const params = useParams()
  const [event, setEvent] = useState([])
  const [eventPictureObjectURL, setEventPictureObjectURL] = useState('')
  const [recruiterPictureObjectURL, setRecruiterPictureObjectURL] = useState('')

  useEffect(() => {
    const downloadEventData = async () => {
      const { data } = await supabase.from('EventTable').select().eq("id", params.eventNumber)
      setEvent(data[0])
      downloadEventImage(data[0].event_picture)
      downloadRecruiterImage(data[0].recruiter_picture)
    }
    downloadEventData()
  }, [params.eventNumber])

  const downloadEventImage = async (imageUrl) => {
    try {
      await supabase.storage.from("event-images").download(imageUrl).then(result => setEventPictureObjectURL(URL.createObjectURL(result.data)), error => {throw error})
    } catch (error) {
      console.log('Error downloading image') 
      console.log(error.error_description || error.message)
      alert("イベントイメージ写真のダウンロードに失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。")
    }
  }

  const downloadRecruiterImage = async (imageUrl) => {
    try {
      await supabase.storage.from("recruiter-images").download(imageUrl).then(result => setRecruiterPictureObjectURL(URL.createObjectURL(result.data)), error => {throw error})
    } catch (error) {
      console.log('Error downloading image')
      console.log(error.error_description || error.message)
      alert("お手伝い募集者の写真ダウンロードに失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。")
    }
  }

  return (
    <Container className='eventdetail'>
      <div className='detail'>
        <Image src={eventPictureObjectURL} width={400} alt={event.title} />
        <Title order={1}>{event.title}</Title>
        <h2>開催場所</h2>
        <Text size="lg">{event.region}</Text>
        <h2>開催日時</h2>
        <Text size="lg">{event.date}</Text>
        <ul>
          <li>開示時刻:{event.start_time}</li>
          <li>終了時刻:{event.end_time}</li>
        </ul>
        <h2>参加して欲しい人</h2>
        <Text size="lg">{event.target}</Text>
        <h2>お手伝い内容</h2>
        <Text size="lg">{event.content}</Text>
        <h2>持ち物</h2>
        <Text size="lg">{event.belongings}</Text>
        <h2>服装</h2>
        <Text size="lg">{event.clothes}</Text>
        <h2>お礼</h2>
        <Text size="lg">{event.reward}</Text>
        <h2>集合場所</h2>
        <Text size="lg">{event.site}</Text>
        <h2>お問い合わせ先</h2>
        <Text size="lg">{event.inquiry}</Text>
      </div>
      <div className='detail_recruiter'>
        <h1>お願いした人</h1>
        <Avatar src={recruiterPictureObjectURL} radius="xl" size={200}/>
        <Text size="lg">{event.recruiter_name}さん</Text>
        <h3>自己紹介</h3>
        <Text size="lg">{event.recruiter_introduction}</Text>
        <h3>一言コメント</h3>
        <Text size="lg">{event.recruiter_comment}</Text>
      </div>
    </Container>
  )
}
