import { supabase } from "@/utils/supabase";

export async function actionFeedbackCreate({content,id_store}:any) {
  const { data,statusText,error } = await supabase
  .from("feedback")
  .insert({
   content,
   id_store
  })
  .select()
  return data == null ? statusText : data
}