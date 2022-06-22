import { Input, Center, TextInput, Button, Group, Space, LoadingOverlay } from '@mantine/core';
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Calendar, TimeInput } from '@mantine/dates';
import { At, Clock } from 'tabler-icons-react';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';

export default function Eventmaker(){
  const [date, setDate] = useState(null);
  const [numOfevents, setNumOfevents] = useState(0);

  useEffect(() => {
    const getData = async () => {
      let { data, error } = await supabase.from('EventTable').select()
      setNumOfevents(data.length)
    }
    getData()
  }, []);

  const form = useForm({
    initialValues: {
      page_id: '',
      title: '',
      region: '',
      date: null,
      time: null,
      catchcopy: '',
      content: '',
      target: '',
      site: '',
      reward: '',
      inquiry: '',
      picture: '',
    }
  });

  const [loading, setLoading] = useState(false)
  const submit = async (values) => {
    try {
      setLoading(true)
      const jsdate = dayjs(date);
      const { data, error } = await supabase.from("EventTable").insert([{
        page_id: numOfevents+1000,
        title: values.title,
        region: "会津若松市　永和地区",
        date: jsdate.format('YYYY-MM-DD'),
        time: jsdate.format('HH:mm:ss'),
        catchcopy: values.catchcopy,
        content: values.content,
        target: values.target,
        site: values.site,
        reward: values.reward,
        inquiry: values.inquiry,
        picture: "https://prtimes.jp/i/11000/54/resize/d11000-54-428998-1.jpg",
      }])
      navigate('/eventlist');
      if (error) throw error
      alert('Please go back and visit again!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const navigate = useNavigate();
  return(
    <Center>
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(submit)}>
        <h2>企画作成、編集</h2>
        <Space h="l" />
        <p>企画名</p>
        <Input required style={{width: 500}} placeholder="企画名を入力してください。" {...form.getInputProps('title')}/>
        <p>開催場所</p>
        <Input required placeholder="開催場所を入力してください。" {...form.getInputProps('site')}/>
        <p>キャッチコピー</p>
        <Input required placeholder="キャッチコピーを入力してください。" {...form.getInputProps('catchcopy')}/>
        <p>ターゲット</p>
        <Input required placeholder="ターゲットを入力してください。" {...form.getInputProps('target')}/>
        <p>日時</p>
        <Calendar required value={date} onChange={setDate} firstDayOfWeek="sunday" locale="ja"/>
        <Space h="xl" />
        <TimeInput
          required
          label="開始時刻"
          placeholder="開始時刻を入力"
          onChange={setDate}
          icon={<Clock size={20} />}
          defaultValue={date}
        />
        <p>お手伝い内容</p>
        <TextInput required placeholder="企画内容" {...form.getInputProps('content')}/>
        <p>お礼</p>
        <Input required placeholder="お礼" {...form.getInputProps('reward')}/>
        <p>メールアドレス</p>
        <Input required icon={<At />} placeholder="Your mail address" {...form.getInputProps('inquiry')}/>
        <Space h="xl" />
        <Group position="center" mt="md">
          <Button
            type="submit"
            color="green"
          >提出</Button>
        </Group>
      </form>
    </Center>
  );
}
