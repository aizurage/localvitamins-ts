import { Button } from "@mantine/core"
import { FieldValues, useForm } from "react-hook-form"
import { ContactForm } from "../../states"
import { FormBaseInput } from "../Inputs/FormBaseInput"
import { FormBaseTextarea } from "../Inputs/FormBaseTextarea"
import { submitContactForm } from "./controller/submitContactForm"
import styles from "./index.module.css"

export default function Contact() {
  const {register, handleSubmit} = useForm()
  
  const submit = async (values: FieldValues) => {
    const contactFormValues: ContactForm = {
      title: values.title,
      main: values.main
    }
    await submitContactForm(contactFormValues)
      .then(() => {
        alert("フォームの送信に成功しました。このタブを閉じてください。")
      }).catch (() => {
        alert(
          "フォームの送信に失敗しました。運営チーム (miraikuru0512@gmail.com) に直接メールにてお問い合わせください。"
        )
    })
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h3>お問い合わせフォーム</h3>
      <FormBaseInput 
        required
        label="タイトル"
        placeholder="お問い合わせ件名"
        fieldname="title"
        register={register}
      />
      <FormBaseTextarea
        required
        label="本文"
        placeholder="本文"
        minRows={5}
        fieldname="main"
        register={register}
      />
      <Button className={styles.formSubmit} type="submit">
        送信
      </Button>
    </form>
  )
}
