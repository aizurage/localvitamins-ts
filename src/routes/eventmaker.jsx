import { Input } from '@mantine/core';

function eventmaker(){
  return(
    <div>
      <h2>企画作成、編集</h2>
      <br>
      <p>企画名</p>
      <Input placeholder="企画名を入力してください。"/>
      <p>企画場所</p>
      <Input placeholder="企画場所を入力してください。"/>
      <p>企画者名</p>
      <Input placeholder="企画者名を入力してください。"/>
      <p>日時</p>
      <Input placeholder="○○○○/○○/○○"/>
      <p>内容、メモ</p>
      <Input placeholder="企画内容、メモ、議事録"/>
      <p>電話番号</p>
      <Input placeholder="○○○-○○○-○○○"/>
      <p>メールアドレス</p>
      <Input icon={<At />} placeholder="Your mail address"/>
    </div>
  );
}

export default Eventmaker;
