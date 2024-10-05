import { supabase } from "../../../../../supabaseClient"

export const fetchEvent = async (eventId: number, columns: string) => {
  const { data, error } = await supabase
    .from('EventTable')
    .select(columns)
    .match({ id: eventId })
  if (error) throw error
  return data
}
