import { IUpdateUser } from "@/types/updateUser";
import { supabase } from "@/utils/supabase";

export async function actionFunctionaryUpdate({ id,value}:any) {
  const { data,statusText,error } = await supabase
  .from('functionary')
  .update({ name: value })
  .eq('id', id)

  return data 
}