import { supabase } from "@/utils/supabase";

export async function actionStoreDelete(id:number) {
  const { data,statusText } = await supabase
  .from('sale_product')
  .delete()
  .eq('id', id)

  return data == null ? statusText : data
}