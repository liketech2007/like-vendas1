import { supabase } from "@/utils/supabase";

export async function authSignOut() {
  const { error } = await supabase.auth.signOut()
  return error 
}