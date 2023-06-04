import { supabase } from "@/utils/supabase";

interface IAuth {
  email: string;
  newPassword: string;
}

export async function authResetPassword({ email,newPassword}:IAuth) {
  await supabase.auth.resetPasswordForEmail(email)
  const { data, error } = await supabase.auth.updateUser({ password: newPassword })
  return data == null ? error : data
}