import { supabase } from "@/utils/supabase"

export async function filterProcducsStore(id_store:string) {
  
const { data, statusText } = await supabase
.from('product')
.select()
.eq('id_store', id_store)

  return data == null ? statusText : data
}