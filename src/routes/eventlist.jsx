import { Input, Text, Button, Group, Modal, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm }  from '@mantine/form';
import { supabase }  from '../supabaseClient';
import { Makingcard } from './makingcard';


export default function Eventlist()
{
  const [events, setEvents] = useState([]);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [event, setEvent] = useState('');
  const [userInfo, setUserInfo] = useState('');
 


  const search_keywords_form = useForm({
    initialValues: {
      keywords: '',
    }
  });


  
  const join_event = async () => {
    try {
      const { error } = await supabase.from("Participants").insert([{
        eventID: event.eventID,
        eventTitle: event.eventTitle,
        firstname: userInfo.user_metadata.firstname,
        familyname: userInfo.user_metadata.familyname,
        email: userInfo.email,
      }])
      if (error) {
        alert('Information cannot be registered!')
        throw error
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } 
  }



  const merge_event = (array1, array2) => {
    for(let i = 0; i < array1.length; i++){
      for (let j = 0; j < array2.length; j++) {
        if (array1[i].id === array2[j].id) {
          array2.splice(j,1);
        }
      }
    }

    return [...array1, array2].flat(2);
  }


  
  const search_event = async ({keywords}) => {
    if(keywords.length === 0) {
      let { data } = await supabase.from('EventTable').select()
      setEvents(data);
      return;
    }
    
    //キーワードを配列に格納する。（主に複数の場合）
    //全角スペースで区切った場合
    keywords = keywords.split('　');

    let searching_events = [];
    for (let i = 0; i < keywords.length; i++) {
      keywords[i] = '%' + keywords[i] + '%';
      const {data} = await supabase.from("EventTable").select().like("search_tags", keywords[i]);
      if(i) searching_events = merge_event(searching_events, data);
      else searching_events = [...searching_events, data].flat(2);
    }

    setEvents(searching_events);
  }



  const show_myEvent = async () => {
    const { data }  = await supabase.from("EventTable").select().eq("planner_uniqueID", userInfo.id);
    if(data == null) return;
    setEvents(data);
  }



  useEffect(() => {
    const getData = async () => {
      let { data } = await supabase.from('EventTable').select()
      setEvents(data);
    }
    getData()
    setUserInfo(supabase.auth.user());
  }, []);



  const open = (eventID, eventTitle) => {
    setOpened(true)
    setEvent({eventID, eventTitle})
  }



  return(
    <>
      <h2>企画タイトル検索</h2>
      <Text>キーワードは最大３つまで入力できます。</Text>
      <Text>複数のキーワードで検索をかけるときは、スペースで区切ってください。</Text>
        <Group position="left">
          <form onSubmit={search_keywords_form.onSubmit(search_event)}>
            <Group position="left">
              <Input
                placeholder="キーワードを入力して検索"
                style={{width: 500}}
                {...search_keywords_form.getInputProps('keywords')}
              />
              <Button
                style={{width: 100}}
                color="red"
                type="submit"
                onClick={console.log(userInfo)}
              >
                検索</Button>
            </Group>
          </form>
          <Button
            style={{width: 200}}
            color="pink"
            component={Link}
            to={`/eventmaker`}
          >
          お手伝い作成</Button>
          <Button 
            variant="gradient" 
            gradient={{ from: 'teal', to: 'lime', deg: 105 }} 
            onClick={show_myEvent} 
            style={{width:200, height:50}}
          >
          自分のイベントを表示</Button>
        </Group>
      <div>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          {events.map((row) => <Makingcard row={row} theme={theme} open={open} key={row.id} setEvents={setEvents}/>)}
        </nav>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={event.eventTitle}
        >
        <p>以下の情報を主催者に送信して、参加申請をします。</p>
        <h3>メールアドレス</h3>
        <p>{userInfo.email}</p>
        <h3>名前</h3>
        <p>{userInfo.user_metadata.familyname + " " + userInfo.user_metadata.firstname}</p>
        <Button
          type="submit"
          color="red"
          margin="center"
          style={{top:20}}
          onClick={() => {join_event(); setOpened(false)}}
        >送信
        </Button>
      </Modal>
    </>
  );
}
