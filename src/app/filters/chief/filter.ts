import { supabase } from "@/utils/supabase"

export async function filterSaleStore(id_store:string) {
  const { data, statusText } = await supabase
.from('chief')
.select()
.eq('id_store', id_store)

  return data == null ? statusText : data
}