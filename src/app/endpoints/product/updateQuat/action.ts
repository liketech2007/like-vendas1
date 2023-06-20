import { supabase } from "@/utils/supabase"

export async function updateQuatProduct(id:any,quat:any) {
const { data,statusText } = await supabase
  .from('product')
  .update({ quantity: quat })
  .eq('id', id)

  return data == null ? statusText : data
}