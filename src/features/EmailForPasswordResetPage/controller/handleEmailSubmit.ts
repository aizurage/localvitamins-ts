import { supabase } from "../../../supabaseClient"

export const handleEmailSubmit = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://localvitamins-ts.vercel.app/resetpassword",
  })
  if (error) throw new Error("Sending email for reset password in failed")
}
