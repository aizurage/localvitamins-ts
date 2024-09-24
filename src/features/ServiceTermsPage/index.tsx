import { FC } from "react"
import { AgreementConfirmationPanel } from "./AgreementConfirmationPanel"
import styles from "./index.module.css"

interface Props {
  isAgreementNecessary: boolean
}

export const ServiceTermsPage: FC<Props> = ({isAgreementNecessary}) => {
  return(
    <>
      <h1>利用規約</h1>
      <ul>
        <li>収集する個人情報について</li>
        <li className={styles.martList}>ユーザーの氏名、及びメールアドレスを収集します。</li>
        <li>個人情報使用範囲について</li>
        <li className={styles.martList}>イベント企画者が、イベント参加者の情報を確認する際に使用されます。それ以外の用途では使用しません。</li>
        <li>個人情報の閲覧が可能な人について</li>
        <li className={styles.martList}>氏名及びメールアドレスについて、アプリ内のイベント企画者と、アプリの開発・運営チームが見ることができます。</li>
        <li>個人情報の消し方について</li>
        <li className={styles.martList}>アカウントを消すことで24時間以内に情報が削除されます。</li>
        <li>利用規約変更時の対応について</li>
        <li className={styles.martList}>利用規約に変更を加える場合、規約を実際に変更する１ヶ月前に、登録されたメールアドレス宛にメールで通知します。今後の利用規約変更に同意いただけない場合は、退会してください。</li>
        <li>お問い合わせ先について</li>
        <li className={styles.martList}>個人情報の取扱で質問がある場合は、運営チームにメールでお問い合わせください。<br/>メールアドレス:miraikuru0512@gmail.com</li>
      </ul>
      {isAgreementNecessary && <AgreementConfirmationPanel />}
    </>
  )
}