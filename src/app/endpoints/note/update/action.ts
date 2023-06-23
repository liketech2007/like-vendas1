import { supabase } from "@/utils/supabase";

export async function actionNoteUpdate({ id,title,content}:any) {
  const { data,statusText,error } = await supabase
  .from('note')
  .update({
    title,
    content
  })
  .eq('id', id)



  return data
}