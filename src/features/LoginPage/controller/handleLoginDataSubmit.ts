import { LoginData } from "../../../states"
import { supabase } from "../../../supabaseClient"

export const handleLoginDataSubmit = async (values: LoginData): Promise<void> => {
  const {error} = await supabase.auth.signInWithPassword(values)
  if(error) throw new Error("Login process in failed")
}