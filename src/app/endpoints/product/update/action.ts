
import { supabase } from "@/utils/supabase";

export async function actionProductUpdate({ id,name,price,category,quantity,minimum_stock_level,description}:any) {
  const { data,statusText,error } = await supabase
  .from('product')
  .update({
    name,
    price,
    category,
    quantity,
    minimum_stock_level,
    description,
  })
  .eq('id', id)



  return data 
}