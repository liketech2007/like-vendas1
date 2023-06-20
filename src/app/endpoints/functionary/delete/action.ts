import { supabase } from "@/utils/supabase";

export async function actionFunctionayDelete(id:number) {
  const { data,statusText } = await supabase
  .from('functionary')
  .delete()
  .eq('id', id)

  return data == null ? statusText : data
}