import { supabase } from "@/utils/supabase"

export async function filterAdditionStore(id_store:string) {
  const { data, statusText } = await supabase
  .from('addition_product')
  .select()
  .eq('id_store', id_store)

  return data == null ? statusText : data
}