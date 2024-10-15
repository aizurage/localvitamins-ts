import { FC } from "react"
import styles from "./index.module.css"

export const WariningPanel: FC = () => {
  return (
    <>
      <h2 className={styles.redChar}>注意！</h2>
      <p>
        入力したメールアドレスの、メールボックスを確認してください。
        <br /> もしメールが来ていない場合は、次の項目を確認してみてください。
      </p>
      <ul>
        <li>
          登録したメールアドレスとは異なるメールアドレスを入力していないか。
        </li>
        <li>スペルミスをしていないか。</li>
      </ul>
      <p className={styles.redChar}>
        確認していただき、それでも解決しない場合は運営チーム
        (miraikuru0512@gmail.com) にお問い合わせください。
      </p>
    </>
  )
}
