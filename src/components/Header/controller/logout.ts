import { supabase } from "../../../supabaseClient"

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error("Logout process in failed")
}
