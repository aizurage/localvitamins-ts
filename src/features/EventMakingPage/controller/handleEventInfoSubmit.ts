import { supabase } from "../../../supabaseClient"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleEventInfoSubmit = async (values: any) => {
  const { error } = await supabase.from("EventTable").insert([values])
  if (error) throw new Error("Inserting event data in failed")
}