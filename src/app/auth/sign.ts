import { supabase } from "@/utils/supabase";
import { actionStoreUpdate } from "../endpoints/addition_product/update/action";

export async function sign(id_auth: string) {

  const { data } = await supabase
  .from('store')
  .select()
  .eq('id_auth', id_auth)
  
  if(data !== null) {
    if(data?.length == 0) {
      return "Nenhum usuário com estás informações"
    }else if(data[0].auth === null) {
      return "Usuário não está autenticado"
    }else {
      actionStoreUpdate({id: data[0].id,camp: "auth", value: true})
      return data[0].id_auth
    }
  }
}