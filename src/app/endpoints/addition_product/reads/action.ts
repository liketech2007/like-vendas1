import { supabase } from "@/utils/supabase";
interface IRange {
  from: number;
  to: number;
}

export async function actionStoreReads({ from, to}:IRange) {
  
  const { data,statusText } = await supabase
  .from('addition_product')
  .select()
  .order('name', { ascending: true })
  .range(from,to)
  
  return data == null ? statusText : data
}