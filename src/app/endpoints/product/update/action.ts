import { IUpdateUser } from "@/types/updateUser";
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

  console.log(data,error)

  return data == null ? statusText : data
}