import { supabase } from "@/utils/supabase";

export async function filterProcductPrice(id_store:number) {

  const { data, statusText } = await supabase
  .from('product')
  .select()
  .eq('id_store', id_store)
  .order('price', { ascending: false })
  return data == null ? statusText : data
  
}