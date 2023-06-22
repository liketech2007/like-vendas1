import { IUpdateUser } from "@/types/updateUser";
import { supabase } from "@/utils/supabase";


export async function actionStoreUpdate({ id,number,name,logo,address,time_open,time_close}:any) {

  const { data,statusText,error } = await supabase
  .from('store')
  .update({ 
    name,
    number,
    logo,
    address,
    time_open,
    time_close
   })
  .eq('id', id)

  return data == null ? statusText : data
}