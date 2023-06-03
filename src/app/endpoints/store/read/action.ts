import { supabase } from "@/utils/supabase";

export async function actionStoreRead(id:number) {

  const { data, statusText } = await supabase
  .from('store')
  .select()
  .eq('id', id)

  return data == null ? statusText : data
}