import { Input, Center, TextInput, Button, Group, Space, LoadingOverlay, ThemeIcon } from '@mantine/core';
import { supabase } from '../supabaseClient';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Calendar } from '@mantine/dates';
import { At, Clock, Photo } from 'tabler-icons-react';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import VisuallyHidden from '@reach/visually-hidden';

export default function Eventmaker(){
  const [date, setDate] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const form = useForm({
    initialValues: {
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
      const { error } = await supabase.from("EventTable").insert([{
        title: values.title,
        region: "会津若松市　永和地区",
        date: jsdate.format('YYYY-MM-DD'),
        time: hour + ":" + minute + ":00",
        catchcopy: values.catchcopy,
        content: values.content,
        target: values.target,
        site: values.site,
        reward: values.reward,
        inquiry: values.inquiry,
        picture: pictureUrl,
      }])
      navigate('/eventlist');
      if (error) {
        alert('Please go back and visit again!')
        throw error
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (picture) => {
    try {
      setUploading(true);

      if (!picture.target.files || picture.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = picture.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filename = `${Math.random()}.${fileExt}`;
      const filepath = `${filename}`;

      let {data, error: uploadError} = await supabase.storage.from("event-images").upload(filepath, file);

      setPictureUrl(data["key"]);

      if (uploadError) {
        throw uploadError;
      }

      setPictureUrl(filepath);
      
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
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
        <p>開始時刻</p>
        <Group>
          <Input 
            value={hour} 
            icon={<Clock/>}
            onChange={(e) => setHour(e.target.value)}
          />
          <p>時</p>
          <Input
            value={minute}
            icon={<Clock/>}
            onChange={(e) => setMinute(e.target.value)}
          />
          <p>分</p>
        </Group>
        <p>お手伝い内容</p>
        <TextInput required placeholder="企画内容" {...form.getInputProps('content')}/>
        <p>お礼</p>
        <Input required placeholder="お礼" {...form.getInputProps('reward')}/>
        <p>メールアドレス</p>
        <Input required icon={<At />} placeholder="Your mail address" {...form.getInputProps('inquiry')}/>
        <p>イメージ画像の選択</p>
        <div style={{height: 100}}>
          {uploading ? "Uploading..." : (
            <>
              <>
                <ThemeIcon color="lime">
                  <Photo />
                </ThemeIcon>
                <label className="button primary block" htmlFor="single">
                  ここをクリックして、写真をアップロードしてください。
                </label>
              </>
              <VisuallyHidden>
                <input 
                  type="file" 
                  id="single"
                  accept="image/*"
                  onChange={uploadImage}
                  disabled={uploading}/>
              </VisuallyHidden>
            </>
          )}
        </div>
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
