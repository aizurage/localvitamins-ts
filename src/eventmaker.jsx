import { Input, Center, TextInput, Button, Group, Space, LoadingOverlay, Paper } from '@mantine/core';
import { supabase } from './supabaseClient';
import { useState, useRef } from 'react';
import { useForm } from '@mantine/form';
import { Calendar } from '@mantine/dates';
import { At, Clock } from 'tabler-icons-react';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import VisuallyHidden from '@reach/visually-hidden';

export default function Eventmaker(){
  const [date, setDate] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState([]);

  const inputRef = useRef();

  const form = useForm({
    initialValues: {
      title: '',
      region: '',
      date: null,
      start_time: null,
      catchcopy: '',
      content: '',
      target: '',
      site: '',
      reward: '',
      inquiry: '',
      search_tags:'',
      picture: '',
      planner_uniqueID: '',
      belongings: '',
      clothes: '',
    }
  });

  let start  = {
    hour: '',
    minute: '',
  };

  let end = {
    hour: '',
    minute:'',
  };

  const [loading, setLoading] = useState(false)
  const submit = async (values) => {
    try {
      setLoading(true)
      const jsdate = dayjs(date);
      const { error } = await supabase.from("EventTable").insert([{
        title: values.title,
        region: values.region,
        date: jsdate.format('YYYY-MM-DD'),
        start_time: start.hour + ":" + start.minute + ":00",
        end_time: end.hour + ":" + end.minute + ":00",
        catchcopy: values.catchcopy,
        content: values.content,
        target: values.target,
        site: values.site,
        reward: values.reward,
        inquiry: values.inquiry,
        search_tags: tags,
        picture: pictureUrl,
        planner_uniqueID: supabase.auth.user().id,
        belongings: values.belongings,
        clothes: values.clothes,
      }])
      navigate('/home');
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

 
  const clear_inputtag = () => {
    inputRef.current.value = '';
  }

  const navigate = useNavigate();
  return(
    <Center>
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(submit)}>
        <h1>お手伝い作成、編集</h1>
        <Space h="l" />
        <h3>お手伝い、イベントの名前</h3>
        <Input required style={{width: 500}} placeholder="お手伝いの名前" {...form.getInputProps('title')}/>
        <h3>開催場所</h3>
        <Input required placeholder="開催場所の住所" {...form.getInputProps('region')}/>
        <h3>キャッチコピー</h3>
        <Input required placeholder="キャッチコピー" {...form.getInputProps('catchcopy')}/>
        <h3>参加して欲しい人</h3>
        <Input required placeholder="例：農業に興味のある人" {...form.getInputProps('target')}/>
        <h3>日時</h3>
        <Calendar required value={date} onChange={setDate} firstDayOfWeek="sunday" locale="ja"/>
        <Space h="xl" />
        <h3>開始時刻</h3>
        <Group>
          <Input 
            value={start.hour} 
            icon={<Clock/>}
            onChange={(e) => {start.hour = e.target.value;}}
          />
          <p>時</p>
          <Input
            value={start.minute}
            icon={<Clock/>}
            onChange={(e) => {start.minute = e.target.value;}}
          />
          <p>分</p>
        </Group>
        <h3>終了時刻</h3>
        <Group>
          <Input 
            value={end.hour} 
            icon={<Clock/>}
            onChange={(e) => {end.hour = e.target.value;}}
          />
          <p>時</p>
          <Input
            value={end.minute}
            icon={<Clock/>}
            onChange={(e) => {end.minute = e.target.value;}}
          />
          <p>分</p>
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
        <Group>
          <Input ref={inputRef} onBlur={ (e) => setTags([...tags, e.target.value])} placeholder='タグ名'/>
          <Button
            color='pink'
            onClick={ 
              () => {clear_inputtag()} 
            }>
            タグ追加
          </Button>
        </Group>
        
        <p>追加されたタグ</p>
        <ul>
          {
            tags.map((tag) => (
              <li>{tag}</li>
            ))
          }
        </ul>
        <h3>イメージ画像の選択</h3>
        <div style={{height: 100}}>
          {uploading ? "アップロードしています..." : (
            <>
              <>
                <Paper shadow="xl" radius="xl" p="xl" withBorder>
                  <label className="button primary block" htmlFor="single">
                    {pictureUrl == null ? "ここをクリックして、画像をアップロードしてください。" : "画像アップロードが完了しました。"}
                  </label>
                </Paper>
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
