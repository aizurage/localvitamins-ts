import { Avatar, Button, Center, Group, Image, Space, Text, TextInput } from '@mantine/core';
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Calendar } from '@mantine/dates';
import { At } from 'tabler-icons-react';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';
import "./eventedit.css";

export default function Eventedit(){
    let params = useParams();
    const [ event, setEvent ] = useState([]);
    const [eventPictureUrl, setEventPictureUrl] = useState('');
    const [recruiterPictureUrl, setRecruiterPictureUrl] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
      const getData = async () => {
        let { data } = await supabase.from('EventTable').select().eq("id", params.eventNumber)
        setEvent(data[0])
        getEventImage(data[0].picture)
        getRecruiterImage(data[0].recruiter_picture)
      }
      getData()
    }, []);

    const form = useForm({
      initialValues: {
        id: params.eventNumber,
      }
    });

    const getEventImage = async (imageUrl) => {
      try {
        await supabase.storage.from("event-images").download(imageUrl).then(result => setEventPictureUrl(URL.createObjectURL(result.data)), error => {throw error});
      } catch (error) {
        console.log('Error downloading image')
        console.log(error.error_description || error.message)
        alert("イベントイメージ写真のダウンロードに失敗しました。")
      }
    }
  
    const getRecruiterImage = async (imageUrl) => {
      try {
        await supabase.storage.from("recruiter-images").download(imageUrl).then(result => setRecruiterPictureUrl(URL.createObjectURL(result.data)), error => {throw error});
      } catch (error) {
        console.log('Error downloading image')
        console.log(error.error_description || error.message)
        alert("お手伝い募集者の写真ダウンロードに失敗しました。")
      }
    }


    const [date, setDate] = useState(event.date);
    const [startHour, setStartHour] = useState("");
    const [startMinute, setStartMinute] = useState("");
    const [endHour, setEndHour] = useState("");
    const [endMinute, setEndMinute] = useState("");

    const submit = async () => {
      try {
        
        if (startHour !== "" && startMinute !== "") {
          form.values.start_time = startHour + ":" + startMinute + ":00";
        }
        
        if (endHour !== "" && endMinute !== "") {
          form.values.end_time = endHour + ":" + endMinute + ":00";
        }
      
        const { error } = await supabase.from("EventTable").upsert(form.values);
        navigate('/home');
        
        if (error) throw error
      } catch (error) {
        console.log('Error event update')
        console.log(error.error_description || error.message)
        alert("イベントを更新できませんでした。解決できない場合には、お問い合わせ先のメールアドレスにご連絡ください。お手伝い一覧画面のメニューにあります。")
      }
    }

    return(  
      <Center>
        <form className="editform" onSubmit={form.onSubmit(submit)}>
            <div className='form_body' onLoad={() => {form.setValues(event)}}>
              <h1>お手伝い編集</h1>
              <h3 className="warning" color='red'>（重要）訂正したい項目だけを入力してください。</h3>
              <h2>写真</h2>
              <Image src={eventPictureUrl} alt={event.title} />

              <h2>タイトル</h2>
              <Text weight={700} size="lg">{event.title}</Text>
              <Group>
                <TextInput style={{width: 500}} placeholder="お手伝いのタイトル（訂正後）" {...form.getInputProps('title')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('title', event.title)}}
                >
                  キャンセル
                </Button>
              </Group>
              
              <h2>開催場所</h2>
              <Text weight={700} size="lg">{event.region}</Text>
              <Group>
                <TextInput style={{width: 500}} placeholder="開催場所の住所（訂正後）" {...form.getInputProps('region')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('region', event.region)}}
                >
                  キャンセル
                </Button>
              </Group>
                
              <h2>開催日時</h2>
              <Text weight={700} size="lg">{event.date}</Text>
              <Group spacing="xl">
                <Calendar value={date} onChange={(_date) => {setDate(_date); form.setFieldValue('date', dayjs(_date));}} firstDayOfWeek="sunday" locale="ja" />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('date', event.date)}}
                >
                  キャンセル
                </Button>
              </Group>
              
              <ul>
                  <li>開始時刻:{event.start_time}</li>
                  <li>終了時刻:{event.end_time}</li>
              </ul>
              <Group>
                <div>
                  <h3>開始時刻</h3>
                  <p>訂正する場合、「時」と「分」両方入力してください。</p>
                  <Group>
                      <TextInput  value={startHour} placeholder="開始時刻(時)（訂正後）" onChange={(e) => {setStartHour(e.target.value)}}/>
                      <p>時</p>
                      <TextInput  value={startMinute} placeholder="開始時刻(分)（訂正後）" onChange={(e) => {setStartMinute(e.target.value)}}/>
                      <p>分</p>
                      <Button
                        color="gray"
                        onClick={() => {setStartHour(""); setStartMinute("");}}
                      >
                        キャンセル
                      </Button>
                  </Group>
                </div>
                
                <div>
                  <h3>終了時刻</h3>
                  <p>訂正する場合、「時」と「分」両方入力してください。</p>
                  <Group>
                      <TextInput  value={endHour} placeholder="終了時刻(時)（訂正後）" onChange={(e) => {setEndHour(e.target.value)}}/>
                      <p>時</p>
                      <TextInput  value={endMinute} placeholder="終了時刻(分)（訂正後）" onChange={(e) => {setEndMinute(e.target.value)}}/>
                      <p>分</p>
                      <Button
                        color="gray"
                        onClick={() => {setEndHour(""); setEndMinute("");}}
                      >
                        キャンセル
                      </Button>
                  </Group>
                </div>
              </Group>
                
              <h2>参加して欲しい人</h2>
              <Text weight={700} size="lg">{event.target}</Text>
              <Group>
                <TextInput style={{width: 500}} placeholder="参加して欲しい人（訂正後）" {...form.getInputProps('target')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('target', event.target)}}
                >
                  キャンセル
                </Button>
              </Group>
              
              <h2>お手伝い内容</h2>
              <Text weight={700} size="lg">{event.content}</Text>
              <Group>
                <TextInput style={{width: 500}} placeholder="お手伝いの内容（訂正後）" {...form.getInputProps('content')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('content', event.content)}}
                >
                  キャンセル
                </Button>
              </Group>

              <h2>持ち物</h2>
              <Text weight={700} size="lg">{event.belongings}</Text>
              <Group>
                <TextInput style={{width: 500}} placeholder="持ち物（訂正後）" {...form.getInputProps('belongings')}/>
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('belongings', event.belongings)}}
                >
                  キャンセル
                </Button>
              </Group>
              
              <h2>服装</h2>
              <Text weight={700} size="lg">{event.clothes}</Text>
              <Group>
                <TextInput style={{width: 500}} placeholder="服装（訂正後）" {...form.getInputProps('clothes')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('clothes', event.clothes)}}
                >
                  キャンセル
                </Button>
              </Group>
              
              <h2>お礼</h2>
              <Text weight={700} size="lg">{event.reward}</Text>
              <Group>
                <TextInput style={{width: 500}} placeholder="お礼（訂正後）" {...form.getInputProps('reward')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('reward', event.reward)}}
                >
                  キャンセル
                </Button>
              </Group>
                
              <h2>集合場所</h2>
              <Text weight={700} size="lg">{event.site}</Text>
              <Group>
                <TextInput style={{width: 500}} placeholder="集合場所（訂正後）" {...form.getInputProps('site')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('site', event.site)}}
                >
                  キャンセル
                </Button>
              </Group>
              
              <h2>お問い合わせ先</h2>
              <Text weight={700} size="lg">{event.inquiry}</Text>
              <Group>
                <TextInput style={{width: 500}} placeholder="お問い合わせ先（訂正後）" icon={<At/>} {...form.getInputProps('inquiry')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('inquiry', event.inquiry)}}
                >
                  キャンセル
                </Button>
              </Group>
            </div>

            <div className='recruiter_space'>
              <div className='recruiter'>
                <h1>お手伝い募集者</h1>
                <Avatar src={recruiterPictureUrl} radius="xl" size={200}/>
                <h3>募集者の名前</h3>
                <Text weight={700} size="lg">{event.recruiter_name}</Text>
                <TextInput placeholder="募集者の名前（訂正後）" {...form.getInputProps('recruiter_name')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('recruiter_name', event.recruiter_name)}}
                >
                  キャンセル
                </Button>
                <br />
                <h3>自己紹介文</h3>
                <Text weight={700} size="lg">{event.recruiter_introduction}</Text>
                <TextInput style={{height: 100}} laceholder="募集者の自己紹介文（訂正後）" {...form.getInputProps('recruiter_introduction')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('recruiter_introduction', event.recruiter_introduction)}}
                >
                  キャンセル
                </Button>
                <br />
                <h3>一言コメント</h3>
                <Text weight={700} size="lg">{event.recruiter_comment}</Text>
                <TextInput style={{height: 100}} laceholder="募集者の一言コメント（訂正後）" {...form.getInputProps('recruiter_comment')} />
                <Button
                  color="gray"
                  onClick={() => {form.setFieldValue('recruiter_comment', event.recruiter_comment)}}
                >
                  キャンセル
                </Button>
              </div>
            </div>
            
            <div className='right_side'>
              <div className='tracking_option'>
                <Space h="xl"/>
                <p>編集内容を提出します</p>
                <Button
                  className='submit'
                  type="submit"
                  color="green"
                  style={{height:50}}
                  >提出</Button>
                <p>全項目を編集前に戻します。</p>
                <Button
                  className='reset'
                  color="gray"
                  style={{height:50}}
                  onClick={() => {form.setValues(event); form.setFieldValue('date', event.date); setStartHour(""); setStartMinute(""); setEndHour(""); setEndMinute("");}}
                  >リセット</Button>
              </div>
            </div>  
        </form>
      </Center>
    );
}
