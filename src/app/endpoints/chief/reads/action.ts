import { supabase } from "@/utils/supabase";

export async function actionStoreReads() {
  
  const { data,statusText } = await supabase
  .from('chief')
  .select()

  return data == null ? statusText : data
}