import { LoginData } from "../../../states"
import { supabase } from "../../../supabaseClient"

export const handleLoginDataSubmit = async (values: LoginData) => {
  const { data, error } = await supabase.auth.signInWithPassword(values)
  if(error) throw new Error("Login process in failed")
  return data
}
