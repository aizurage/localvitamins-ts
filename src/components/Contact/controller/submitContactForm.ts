import emailjs from "@emailjs/browser"
import { ContactForm } from "../../../states"
import { supabase } from "../../../supabaseClient"

export const submitContactForm = async (values: ContactForm): Promise<void> => {
  await emailjs.send(
    process.env.REACT_APP_SERVICE_ID as string,
    process.env.REACT_APP_TEMPLATE_ID as string,
    {
      title: values.title,
      main: values.main,
      email: supabase.auth.getUser().email,
      username: supabase.auth.getUser().user_metadata.username,
    },
    process.env.REACT_APP_PUBLIC_KEY
  )
}
