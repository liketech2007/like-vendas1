import { supabase } from "@/utils/supabase";

export async function actionNoteDelete(id:number) {
  const { data,statusText } = await supabase
  .from('note')
  .delete()
  .eq('id', id)

  return data == null ? statusText : data
}