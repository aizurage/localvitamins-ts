import { Button, Chip, Chips, Container, Group, Input, LoadingOverlay, Paper, Space, TextInput } from '@mantine/core';
import { supabase } from './supabaseClient';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Calendar } from '@mantine/dates';
import { At } from 'tabler-icons-react';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import VisuallyHidden from '@reach/visually-hidden';

export default function Eventmaker(){
  const [date, setDate] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState("農作業");

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
      picture: '',
      planner_uniqueID: '',
      belongings: '',
      clothes: '',
    }
  });

  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");

  const [loading, setLoading] = useState(false)
  const submit = async (values) => {
    try {
      setLoading(true)
      const jsdate = dayjs(date);
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

  const navigate = useNavigate();
  return(
    <Container>
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(submit)}>
        <h1>お手伝い新規作成</h1>
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
                <Input required value={startHour} onChange={(e) => setStartHour(e.target.value)}/>
                <p>時</p>
                <Input required value={startMinute} onChange={(e) => setStartMinute(e.target.value)}/>
                <p>分</p>
            </Group>
          </div>
          {"   "}
          <div>
            <h3>終了時刻</h3>
            <Group>
                <Input required value={endHour} onChange={(e) => setEndHour(e.target.value)}/>
                <p>時</p>
                <Input required value={endMinute} onChange={(e) => setEndMinute(e.target.value)}/>
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
        <Chips multiple={false} value={tags} onChange={(e) => {setTags(e);}}>
          <Chip size="lg" value="農作業">農作業</Chip>
          <Chip size="lg" value="雪作業">雪作業</Chip>
          <Chip size="lg" value="ゴミ拾い">ゴミ拾い</Chip>
          <Chip size="lg" value="お祭り">お祭り</Chip>
          <Chip size="lg" value="年中行事">年中行事</Chip>
          <Chip size="lg" value="その他">その他</Chip>
        </Chips>
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
            style={{height:50, width: 100}}
          >提出</Button>
        </Group>
      </form>
    </Container>
  );
}
