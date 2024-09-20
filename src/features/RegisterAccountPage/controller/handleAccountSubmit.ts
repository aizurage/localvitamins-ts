import { RegisteredAccount } from "../../../states/RegisteredAccount"
import { supabase } from "../../../supabaseClient"


export const handleAccountSubmit = async (values: RegisteredAccount): Promise<void> => {
    const {error} = await supabase.auth.signUp(
      {
        email: values.email,
        password: values.password,
        data: {
          username: values.username,
          firstname: values.firstname,
          familyname: values.familyname,
        }
      }
    )

    if (error) throw new Error("Registering new account process in failed")
}