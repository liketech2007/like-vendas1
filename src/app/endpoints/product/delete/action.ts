import { supabase } from "@/utils/supabase";

export async function actionProductDelete(id:number) {
  const { data,statusText } = await supabase
  .from('product')
  .delete()
  .eq('id', id)

  return data == null ? statusText : data
}