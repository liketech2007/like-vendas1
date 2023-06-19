import { decrypto } from "@/utils/decrypto";
import { supabase } from "@/utils/supabase";

export async function signup(email: string, password: string,type:string) {
  const { data } = await supabase
  .from(`${type}`)
  .select()
  .eq('email', email)
 if(data !== null) {
  const passwordUser = decrypto(`${data[0].password}`)
  if(data?.length == 0) {
    return "Nenhum usuário com estás informações"
  }else if(data[0].auth === null) {
    return "Usuário não está autenticado"
  }else if (passwordUser == password) {
    return data[0]
  }
 }
}