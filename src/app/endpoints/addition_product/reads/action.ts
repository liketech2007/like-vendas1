import { supabase } from "@/utils/supabase";

export async function actionStoreReads() {
  
  const { data,statusText } = await supabase
  .from('addition_product')
  .select()

  return data == null ? statusText : data
}