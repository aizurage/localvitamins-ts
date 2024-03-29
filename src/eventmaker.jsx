import { Button, Chip, Chips, Container, Group, Image, Input, LoadingOverlay, Paper, Select, Space, Stepper, Text, TextInput, Title } from '@mantine/core'
import { supabase } from './supabaseClient'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { Calendar } from '@mantine/dates'
import { At } from 'tabler-icons-react'
import 'dayjs/locale/ja'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import './eventmaker.css'

export default function Eventmaker(){
  const [date, setDate] = useState(null)
  const [tags, setTags] = useState("農作業")

  const hourSelections = Array.from({ length: 23 }, (_, index) => ({
    value: String(index + 1),
    label: String(index + 1)
  }))
  
  const minuteSelections = Array.from({ length: 6 }, (_, index) => ({
    value: String(index * 10),
    label: String(index * 10)
  }))

  const form = useForm({
    initialValues: {
      title: '',
      region: '',
      date: null,
      start_time: null,
      end_time: null,
      content: '',
      target: '',
      site: '',
      reward: '',
      inquiry: '',
      search_tags: '',
      event_picture: '',
      planner_uniqueID: '',
      belongings: '',
      clothes: '',
      recruiter_name: '',
      recruiter_introduction: '',
      recruiter_comment: '',
      recruiter_picture: '',
    }
  })

  const [startHour, setStartHour] = useState("")
  const [startMinute, setStartMinute] = useState("")
  const [endHour, setEndHour] = useState("")
  const [endMinute, setEndMinute] = useState("")

  const [eventPictureURL, setEventPictureURL] = useState(null)
  const [recruiterPictureURL, setRecruiterPictureURL] = useState(null)
  const [event_image_uploading, setEvent_image_uploading] = useState(false)
  const [recruiter_image_uploading, setRecruiter_image_uploading] = useState(false)
  const [eventPictureObjectURL, setEventPictureObjectURL] = useState(null)
  const [recruiterPictureObjectURL, setRecruiterPictureObjectURL] = useState(null)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const submit = async (values) => {
    try {
      setLoading(true)
      const jsdate = dayjs(date)

      // 入力項目の登録処理
      const { error } = await supabase.from("EventTable").insert([{
        title: values.title,
        region: values.region,
        date: jsdate.format('YYYY-MM-DD'),
        start_time: startHour + ":" + startMinute + ":00",
        end_time: endHour + ":" + endMinute + ":00",
        content: values.content,
        target: values.target,
        site: values.site,
        reward: values.reward,
        inquiry: values.inquiry,
        search_tags: tags,
        event_picture: eventPictureURL,
        planner_uniqueID: supabase.auth.user().id,
        belongings: values.belongings,
        clothes: values.clothes,
        recruiter_name: values.recruiter_name,
        recruiter_introduction: values.recruiter_introduction,
        recruiter_comment: values.recruiter_comment,
        recruiter_picture: recruiterPictureURL,
      }])
      navigate('/')
      if (error) throw error
    } catch (error) {
      console.log("Error event registration")
      console.log(error.error_description || error.message)
      alert("お手伝いを投稿できませんでした。入力不足がないかどうかご確認ください。それでも解決できない場合には、お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。")
    } finally {
      setLoading(false)
    }
  }

  const uploadEventImage = async (picture) => {
    try {
      setEvent_image_uploading(true)
      if (!picture.target.files || picture.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }
      const file = picture.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filename = `${Math.random()}.${fileExt}`
      const filepath = `${filename}`
      const {error} = await supabase.storage.from("event-images").upload(filepath, file)
      if (error) throw error
      setEventPictureObjectURL(URL.createObjectURL(file))
      setEventPictureURL(filepath)
    } catch (error) {
      console.log("Error uploading event image")
      console.log(error.error_description || error.message)
      alert("イベントイメージ写真のアップロードに失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。")
    } finally {
      setEvent_image_uploading(false)
    }
  }

  const deleteEventImage = async () => {
    try {
      const {error} = await supabase.storage.from("event-images").remove(eventPictureURL)
      if(error) throw error
    } catch (error) {
      console.log("Error deleting event image")
      console.log(error.error_description || error.message)
      alert("お手伝いイメージ写真の削除に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。")
    }
  }

  const uploadRecruiterImage = async (picture) => {
    try {
      setRecruiter_image_uploading(true)
      if (!picture.target.files || picture.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }
      const file = picture.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filename = `${Math.random()}.${fileExt}`
      const filepath = `${filename}`
      const {error} = await supabase.storage.from("recruiter-images").upload(filepath, file)
      if (error) throw error
      setRecruiterPictureObjectURL(URL.createObjectURL(file))
      setRecruiterPictureURL(filepath)
    } catch (error) {
      console.log("Error uploading recruiter image")
      console.log(error.error_description || error.message)
      alert("お手伝い募集者の写真アップロードに失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。")
    } finally {
      setRecruiter_image_uploading(false)
    }
  }

  const deleteRecruiterImage = async () => {
    try {
      const {error} = await supabase.storage.from("recruiter-images").remove(recruiterPictureURL)
      if(error) throw error
    } catch (error) {
      console.log("Error deleting recruiter image")
      console.log(error.error_description || error.message)
      alert("お手伝い募集者写真の削除に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。")
    }
  }

  const [active, setActive] = useState(0)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))
  return(
    <Container>
      <LoadingOverlay visible={loading} />
      <h1>お手伝い新規作成</h1>
      <form onSubmit={form.onSubmit(submit)}>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>戻る</Button>
          <Button color="yellow" onClick={nextStep}>次へ</Button>
        </Group>
        <Space h='xl'/>
        <Stepper color="orange" active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="お手伝い情報入力" description="お手伝いの基本情報を入力してください。">
          <h1>お手伝い基本情報入力</h1>
            <Space h="l" />
            <h3>お手伝い、イベントの名前</h3>
            <Input required style={{width: 500}} placeholder="お手伝いの名前" {...form.getInputProps('title')}/>
            <h3>開催場所</h3>
            <Input required placeholder="開催場所の住所" {...form.getInputProps('region')}/>
            <h3>参加して欲しい人</h3>
            <Input required placeholder="例：農業に興味のある人" {...form.getInputProps('target')}/>
            <h3>日時</h3>
            <Calendar required value={date} onChange={setDate} firstDayOfWeek="sunday" locale="ja"/>
            <Space h="xl" />
            <Group>
              <div>
                <h3>開始時刻</h3>
                <Group>
                    <Select value={startHour} onChange={setStartHour} data={hourSelections} clearable/>
                    <p>時</p>
                    <Select value={startMinute} onChange={setStartMinute} data={minuteSelections} clearable/>
                    <p>分</p>
                </Group>
              </div>
              {"   "}
              <div>
                <h3>終了時刻</h3>
                <Group>
                    <Select value={endHour} onChange={setEndHour} data={hourSelections} clearable/>
                    <p>時</p>
                    <Select value={endMinute} onChange={setEndMinute} data={minuteSelections} clearable/>
                    <p>分</p>
                </Group>
              </div>
            </Group>
            <h3>お手伝い内容</h3>
            <TextInput required placeholder="企画内容" {...form.getInputProps('content')}/>
            <h3>持ち物</h3>
            <Input required placeholder="持ち物" {...form.getInputProps('belongings')}/>
            <h3>服装</h3>
            <Input required placeholder="服装" {...form.getInputProps('clothes')}/>
            <h3>お礼</h3>
            <Input required placeholder="お礼" {...form.getInputProps('reward')}/>
            <h3>集合場所</h3>
            <Input required placeholder="集合場所" {...form.getInputProps('site')}/>
            <h3>お問い合わせ先（メールアドレス）</h3>
            <Input required icon={<At />} placeholder="Your mail address" {...form.getInputProps('inquiry')}/>
            <h3>タグの設定</h3>
            <Chips multiple={false} value={tags} onChange={(e) => {setTags(e)}}>
              <Chip size="lg" value="農作業">農作業</Chip>
              <Chip size="lg" value="雪作業">雪作業</Chip>
              <Chip size="lg" value="ゴミ拾い">ゴミ拾い</Chip>
              <Chip size="lg" value="お祭り">お祭り</Chip>
              <Chip size="lg" value="年中行事">年中行事</Chip>
              <Chip size="lg" value="その他">その他</Chip>
            </Chips>
            <h3>イメージ画像の選択</h3>
            <div style={{height: 100}}>
              {event_image_uploading ? "アップロードしています..." : (
                <>
                  <>
                    <Paper shadow="xl" radius="xl" p="xl" withBorder>
                      <label className="button primary block" htmlFor="single">
                        {eventPictureURL == null ? "ここをクリックして、画像をアップロードしてください。" : "画像アップロードが完了しました。"}
                      </label>
                    </Paper>
                  </>
                  <div style={{display: 'none'}}>
                    <input 
                        required
                        type="file" 
                        id="single"
                        accept="image/*"
                        onChange={uploadEventImage}
                        disabled={event_image_uploading}/>
                  </div>
                </>
              )}
            </div>
            <Space h='xs'/>
            <Button
              color="gray"
              onClick={() => {deleteEventImage(); setEventPictureURL(null); setEventPictureObjectURL(window.URL.revokeObjectURL(eventPictureObjectURL))}}
            >
              アップロードを取り消す
            </Button>
          </Stepper.Step>
          <Stepper.Step label="お手伝い募集者情報入力" description="お手伝いをお願いした人の情報を入力してください。">
            <h1>お手伝い募集者情報入力</h1>
            <h3>募集者の名前</h3>
            <Input required style={{width: 500}} placeholder="お手伝い募集者の名前" {...form.getInputProps('recruiter_name')}/>
            <h3>自己紹介文</h3>
            <TextInput required placeholder="募集者の自己紹介文" {...form.getInputProps('recruiter_introduction')}/>
            <h3>一言コメント</h3>
            <TextInput required placeholder="募集者の一言コメント" {...form.getInputProps('recruiter_comment')}/>
            <h3>画像の登録</h3>
            <div style={{height: 100}}>
              {recruiter_image_uploading ? "アップロードしています..." : (
                <>
                  <>
                    <Paper shadow="xl" radius="xl" p="xl" withBorder>
                      <label className="button primary block" htmlFor="single">
                        {recruiterPictureURL == null ? "ここをクリックして、画像をアップロードしてください。" : "画像アップロードが完了しました。"}
                      </label>
                    </Paper>
                  </>
                  <div style={{display: 'none'}}>
                    <input 
                        required
                        type="file" 
                        id="single"
                        accept="image/*"
                        onChange={uploadRecruiterImage}
                        disabled={recruiter_image_uploading}/>
                  </div>
                </>
              )}
            </div>
            <Space h='xs'/>
            <Button
              color="gray"
              onClick={() => {deleteRecruiterImage(); setRecruiterPictureURL(null); setRecruiterPictureObjectURL(window.URL.revokeObjectURL(recruiterPictureObjectURL))}}
            >
              アップロードを取り消す
            </Button>
          </Stepper.Step>
          <Stepper.Step label="入力情報確認" description="入力した情報を確認してください。">
            <h1>入力情報確認</h1>
            <h3>入力した情報が表示されます。訂正がない場合は「次へ」ボタンを押してください。訂正事項がある場合は、お手伝い基本情報入力画面（ステップ１、ステップ２）に戻って訂正してください。</h3>
            <div className='input_content'>
              <div className='input_result'>
                <Image src={eventPictureObjectURL} width={400}/>
                <Title order={1}>{form.values.title}</Title>
                <h2>開催場所</h2>
                <Text size="lg">{form.values.region}</Text>
                <h2>開催日時</h2>
                <Text size="lg">{dayjs(date).format('YYYY-MM-DD')}</Text>
                <ul>
                  <li>開示時刻:{startHour + ":" + startMinute + ":00"}</li>
                  <li>終了時刻:{endHour + ":" + endMinute + ":00"}</li>
                </ul>
                <h2>参加して欲しい人</h2>
                <Text size="lg">{form.values.target}</Text>
                <h2>お手伝い内容</h2>
                <Text size="lg">{form.values.content}</Text>
                <h2>持ち物</h2>
                <Text size="lg">{form.values.belongings}</Text>
                <h2>服装</h2>
                <Text size="lg">{form.values.clothes}</Text>
                <h2>お礼</h2>
                <Text size="lg">{form.values.reward}</Text>
                <h2>集合場所</h2>
                <Text size="lg">{form.values.site}</Text>
                <h2>お問い合わせ先</h2>
                <Text size="lg">{form.values.inquiry}</Text>
              </div>
              <div className='recruiter_info'>
                  <h1>お願いした人</h1>
                  <Image src={recruiterPictureObjectURL} width={200}/>
                  <h3>お名前</h3>
                  <Text size="lg">{form.values.recruiter_name}さん</Text>
                  <h3>自己紹介</h3>
                  <Text size="lg">{form.values.recruiter_introduction}</Text>
                  <h3>一言コメント</h3>
                  <Text size="lg">{form.values.recruiter_comment}</Text>
              </div>
            </div>  
          </Stepper.Step>
          <Stepper.Completed>
            <h1>入力完了しました！</h1>
            <h3>登録ボタンを押すことで、作成したお手伝いが登録、公開されます。</h3>
            <Button
              type="submit"
              color="green"
              style={{height:50, width: 100}}
            >登録する</Button>
          </Stepper.Completed>
        </Stepper>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>戻る</Button>
          <Button color="yellow" onClick={nextStep}>次へ</Button>
        </Group>
      </form>
    </Container>
  )
}
