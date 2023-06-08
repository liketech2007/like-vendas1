import { supabase } from "@/utils/supabase";

export async function resetPassword(email: string) {

  const { data } = await supabase
  .from('store')
  .select()
  .eq('email', email)
  
  if(data?.length == 0) {
    return "Nenhum usuário com estás informações"
  }else {
    return data[0].password
  }
}