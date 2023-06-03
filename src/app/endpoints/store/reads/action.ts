import { supabase } from "@/utils/supabase";

export async function actionStoreReads() {
  
  const { data,statusText } = await supabase
  .from('store')
  .select()

  return data == null ? statusText : data
}