import { supabase } from "../../../supabaseClient"

export const downloadEventData = async (id: number) => {
  const { data, error } = await supabase
    .from('EventTable')
    .select()
    .eq('id', id)
  if (error) throw error
}
