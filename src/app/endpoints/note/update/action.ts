import { IUpdateUser } from "@/types/updateUser";
import { supabase } from "@/utils/supabase";

export async function actionNoteUpdate({ id,title,content}:any) {
  const { data,statusText,error } = await supabase
  .from('product')
  .update({
    title,
    content
  })
  .eq('id', id)

  console.log(data,error)

  return data == null ? statusText : data
}