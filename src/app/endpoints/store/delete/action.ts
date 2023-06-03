import { supabase } from "@/utils/supabase";

export async function actionStoreDelete(id:number) {
  const { data,statusText } = await supabase
  .from('store')
  .delete()
  .eq('id', id)

  return data == null ? statusText : data
}