import { supabase } from "@/utils/supabase";

interface IAuth {
  email: string;
  password: string;
}

export async function authSign({ email,password}:IAuth) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return data == null ? error : data
}