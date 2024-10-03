import { EventApplicationForm } from "../../../../../states"
import { supabase } from "../../../../../supabaseClient"

export const sendEventApplication = async (
  values: EventApplicationForm
): Promise<void> => {
  const { error } = await supabase.from('Participants').insert([
    {
      eventID: values.eventId,
      eventTitle: values.eventTitle,
      firstname: values.firstName,
      familyname: values.familyName,
      email: values.email,
      question: values.question
    }
  ])

  if (error) throw new Error("Sending event application in failed")
}
