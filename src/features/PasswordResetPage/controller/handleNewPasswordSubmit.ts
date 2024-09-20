import { supabase } from "../../../supabaseClient"

export const handleNewPasswordSubmit = async(password: string): Promise<void> => {
    const { error } = await supabase.auth.updateUser({
        password: password,
    })
    if (error) throw new Error("Password reset process in failed")
}