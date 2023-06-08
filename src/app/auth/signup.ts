import { supabase } from "@/utils/supabase";

export async function signup(email: string, password: string,type:string) {
  const { data } = await supabase
  .from(`${type}`)
  .select()
  .eq('email', email)
  .eq('password', password)
  console.log(data,type)
  if(data?.length == 0) {
    return "Nenhum usuário com estás informações"
  }else if(data[0].auth === null) {
    return "Usuário não está autenticado"
  }else {
    return data[0].id_auth
  }
}