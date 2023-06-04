import { supabase } from "@/utils/supabase";

export async function filterProcductCatg(catg:string,id_store:number) {

  const { data, statusText } = await supabase
  .from('product')
  .select()
  .eq('id_store', id_store)
  .eq('category', catg)
  .order('name', { ascending: true })
  return data == null ? statusText : data
  
}