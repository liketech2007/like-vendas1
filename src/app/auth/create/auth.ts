import { supabase } from "@/utils/supabase";

interface IAuth {
  email: string;
  password: string;
}

export async function authCreate({ email,password}:IAuth) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return data == null ? error : data
}