import { Button } from "@mantine/core";
import { Link } from 'react-router-dom';
import "./serviceTerms.css";

export function ServiceTerms(props)
{
  const agree_confirmation = () => {
    return(
      <>
        <p>以上の個人情報の使用条件について同意いただける場合は、「同意する」ボタンを押してください。アカウント登録画面が表示されます。</p>
        <Button
          color="red"
          component={Link}
          to="/register"
        >同意する</Button>
      </>
    );
  }

  return(
    <>
      <h1>利用規約</h1>
      <ul>
        <li>収集する個人情報について</li>
        <li className="mark-list">ユーザーの氏名、及びメールアドレスを収集します。</li>
        <li>個人情報使用範囲について</li>
        <li className="mark-list">イベント企画者が、イベント参加者の情報を確認する際に使用されます。それ以外の用途では使用しません。</li>
        <li>個人情報の閲覧が可能な人について</li>
        <li className="mark-list">氏名及びメールアドレスについて、アプリ内のイベント企画者と、アプリの開発・運営チーム"localvitamins"が見ることができます。</li>
        <li>個人情報の消し方について</li>
        <li className="mark-list">アカウントを消すことで24時間以内に情報が削除されます。</li>
        <li>利用規約変更時の対応について</li>
        <li className="mark-list">利用規約に変更を加える場合、規約を実際に変更する１ヶ月前に、登録されたメールアドレス宛にメールで通知します。今後の利用規約変更に同意いただけない場合は、退会してください。</li>
        <li>お問い合わせ先について</li>
        <li className="mark-list">個人情報の取扱で質問がある場合は、運営チームlocalvitaminsにメールでお問い合わせください。<br/>メールアドレス:localvitamins@gmail.com</li>
      </ul>
      <div>
        {props.agree ? agree_confirmation():""}
      </div>
    </>
  );
}