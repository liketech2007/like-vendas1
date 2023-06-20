import { IUpdateUser } from "@/types/updateUser";
import { supabase } from "@/utils/supabase";


export async function actionChiefUpdate({ id,value}:any) {
  const { data,statusText } = await supabase
  .from('chief')
  .update({ name: value })
  .eq('id', id)

  return data == null ? statusText : data
}