import { supabase } from "@/utils/supabase";

export async function filterProcductQuat(id_store:number) {

  const { data, statusText } = await supabase
  .from('product')
  .select()
  .eq('id_store', id_store)
  .order('quantity', { ascending: true })
  return data == null ? statusText : data
  
}